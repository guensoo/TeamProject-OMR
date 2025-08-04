import { useState, useEffect, useContext, useRef } from "react";
import {
    View, Text, ScrollView, TextInput, TouchableOpacity,
    SafeAreaView, KeyboardAvoidingView, Platform, Alert,
    ActivityIndicator
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../All/context/UserContext';
import { updateReview } from '../All/api/ReviewApi';
import * as ImagePicker from 'expo-image-picker';
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor';
import styles from './ReviewEditStyle';

const ReviewEdit = ({ route, navigation }) => {
    const { user } = useContext(UserContext);
    const { review, mode } = route.params || {};
    const richText = useRef();

    // 상태 관리
    const [title, setTitle] = useState(review?.title || '');
    const [content, setContent] = useState('');
    const [rating, setRating] = useState(review?.rating || 5);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const fetchToken = async () => {
            const savedToken = await AsyncStorage.getItem('authToken');
            setToken(savedToken);
        };
        fetchToken();
    }, []);

    // 기존 콘텐츠를 RichEditor에 설정
    useEffect(() => {
        if (review?.content && richText.current) {
            let htmlContent = review.content;

            // 배열이면 조인
            if (Array.isArray(htmlContent)) {
                htmlContent = htmlContent.join('<br>');
            }

            // HTML 태그가 있는 경우 그대로 사용, 없으면 줄바꿈을 <br>로 변환
            if (typeof htmlContent === 'string') {
                if (!htmlContent.includes('<')) {
                    htmlContent = htmlContent.replace(/\n/g, '<br>');
                }
                richText.current.setContentHTML(htmlContent);
                setContent(htmlContent);
            }
        }
    }, [review]);

    // 이미지 선택 및 에디터에 삽입
    const handleInsertImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [16, 9],
                quality: 0.8,
                allowsMultipleSelection: false,
            });

            if (!result.canceled) {
                const imageUrl = result.assets[0].uri;
                richText.current?.insertImage(imageUrl);
            }
        } catch (error) {
            Alert.alert('오류', '이미지를 선택할 수 없습니다.');
        }
    };

    // 별점 선택
    const handleRatingPress = (selectedRating) => {
        setRating(selectedRating);
    };

    // 리뷰 저장
    const handleSubmit = async () => {
        if (!title.trim()) {
            Alert.alert("입력 오류", "제목을 입력해주세요.");
            return;
        }

        if (!content.trim() || content.trim() === '<p></p>') {
            Alert.alert("입력 오류", "내용을 입력해주세요.");
            return;
        }

        if (rating === 0) {
            Alert.alert("입력 오류", "별점을 선택해주세요.");
            return;
        }

        setIsSubmitting(true);

        try {
            // reviewId는 params로 전달, 나머지는 body에 담음
            const updatedReview = {
                title: title.trim(),
                content: content.trim(),
                rating: rating
            };

            await updateReview(review.reviewId, updatedReview);

            Alert.alert(
                "수정 완료",
                "리뷰가 성공적으로 수정되었습니다.",
                [
                    {
                        text: "확인",
                        onPress: () => navigation.goBack()
                    }
                ]
            );
        } catch (error) {
            console.error('리뷰 수정 오류:', error);
            Alert.alert("수정 실패", "리뷰 수정 중 오류가 발생했습니다. 다시 시도해주세요.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // 취소 버튼
    const handleCancel = () => {
        Alert.alert(
            "수정 취소",
            "작성중인 내용이 저장되지 않습니다. 정말 취소하시겠습니까?",
            [
                {
                    text: "계속 수정",
                    style: "cancel"
                },
                {
                    text: "취소",
                    style: "destructive",
                    onPress: () => navigation.goBack()
                }
            ]
        );
    };

    if (!review) {
        return (
            <SafeAreaView style={styles.errorContainer}>
                <Text style={styles.errorText}>리뷰를 찾을 수 없습니다.</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                style={styles.keyboardView}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                {/* 헤더 */}
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.headerButton}
                        onPress={handleCancel}
                    >
                        <Text style={styles.headerButtonText}>취소</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>리뷰 수정</Text>
                </View>

                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.container}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* 작성자 섹션 */}
                    <View style={styles.authorSection}>
                        <View style={styles.authorAvatar}>
                            <Text style={styles.authorAvatarText}>
                                {(user?.nickname || review.userData?.nickname || '나').charAt(0)}
                            </Text>
                        </View>
                        <View style={styles.authorInfo}>
                            <Text style={styles.author}>
                                {user?.nickname || review.userData?.nickname || '나'}
                            </Text>
                            <Text style={styles.authorSubtext}>리뷰를 수정해보세요</Text>
                        </View>
                    </View>

                    {/* 별점 선택 */}
                    <View style={styles.ratingSection}>
                        <Text style={styles.sectionTitle}>이 작품을 평가해주세요</Text>
                        <View style={styles.ratingContainer}>
                            <View style={styles.stars}>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <TouchableOpacity
                                        key={star}
                                        onPress={() => handleRatingPress(star)}
                                        style={styles.starButton}
                                    >
                                        <Text
                                            style={[
                                                styles.star,
                                                star <= rating ? styles.starFilled : styles.starEmpty
                                            ]}
                                        >
                                            ★
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <Text style={styles.ratingText}>
                                {rating > 0 ? `${rating} / 5점` : '별점을 선택하세요'}
                            </Text>
                        </View>
                    </View>

                    {/* 제목 입력 */}
                    <View style={styles.inputSection}>
                        <Text style={styles.sectionTitle}>제목</Text>
                        <TextInput
                            style={styles.titleInput}
                            placeholder="리뷰 제목을 입력하세요"
                            placeholderTextColor="#999"
                            value={title}
                            onChangeText={setTitle}
                            maxLength={100}
                        />
                        <Text style={styles.charCount}>{title.length}/100</Text>
                    </View>

                    {/* 내용 입력 */}
                    <View style={styles.inputSection}>
                        <Text style={styles.sectionTitle}>내용</Text>
                        <RichEditor
                            ref={richText}
                            style={{
                                minHeight: 100,
                                borderColor: '#E0E0E0',
                                borderWidth: 1,
                                borderRadius: 8,
                                backgroundColor: "#fff",
                                marginBottom: 8
                            }}
                            placeholder="작품에 대한 솔직한 리뷰를 작성해주세요."
                            initialContentHTML={content}
                            onChange={setContent}
                            editorStyle={{
                                backgroundColor: "#fff",
                                color: "#333",
                                placeholderColor: "#999",
                                cssText: "font-size:16px; padding:16px;"
                            }}
                        />
                        <RichToolbar
                            editor={richText}
                            actions={[
                                actions.insertImage,
                                actions.setBold,
                                actions.setItalic,
                                actions.setUnderline,
                                actions.heading1,
                                actions.insertBulletsList,
                                actions.undo,
                                actions.redo,
                            ]}
                            iconMap={{
                                [actions.insertImage]: ({ tintColor }) => (
                                    <Text style={{ color: tintColor, fontSize: 22 }}>📷</Text>
                                )
                            }}
                            onPressAddImage={handleInsertImage}
                            style={{ borderTopWidth: 1, borderColor: '#eee' }}
                        />
                        <Text style={styles.charCount}>{content.replace(/<(.|\n)*?>/g, '').length}/2000</Text>
                    </View>

                    {/* 가이드 섹션 */}
                    <View style={styles.guideSection}>
                        <Text style={styles.guideTitle}>💡 좋은 리뷰 작성 팁</Text>
                        <Text style={styles.guideText}>• 스포일러가 포함된 내용은 피해주세요</Text>
                        <Text style={styles.guideText}>• 구체적인 감상평을 작성해주세요</Text>
                        <Text style={styles.guideText}>• 다른 사용자를 존중하는 표현을 사용해주세요</Text>
                    </View>
                </ScrollView>

                {/* 하단 제출 버튼 */}
                <View style={styles.submitSection}>
                    <TouchableOpacity
                        style={[
                            styles.submitButton,
                            (title.trim() && content.trim() && content !== '<p></p>' && rating > 0)
                                ? styles.submitButtonActive
                                : styles.submitButtonInactive
                        ]}
                        onPress={handleSubmit}
                        disabled={!title.trim() || !content.trim() || content === '<p></p>' || rating === 0 || isSubmitting}
                    >
                        <Text style={[
                            styles.submitButtonText,
                            (title.trim() && content.trim() && content !== '<p></p>' && rating > 0)
                                ? styles.submitButtonTextActive
                                : styles.submitButtonTextInactive
                        ]}>
                            {isSubmitting ? '수정 중...' : '리뷰 수정 완료'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default ReviewEdit;