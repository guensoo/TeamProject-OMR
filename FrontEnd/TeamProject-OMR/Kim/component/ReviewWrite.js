import { useRef, useState } from "react";
import {
    View,
    Text,
    ScrollView,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    Alert
} from "react-native";
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor';
import * as ImagePicker from 'expo-image-picker';
import styles from './ReviewWriteStyles';

export const ReviewWrite = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [rating, setRating] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const richText = useRef();

    const handleRatingPress = (selectedRating) => {
        setRating(selectedRating);
    };

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

    

    const handleSubmit = async () => {
        console.log("selectedMovie ::", selectedMovie);
        if (!title.trim()) {
            Alert.alert('알림', '제목을 입력해주세요.');
            return;
        }
        if (!content.trim() || content === '<p></p>') {
            Alert.alert('알림', '내용을 입력해주세요.');
            return;
        }
        if (rating === 0) {
            Alert.alert('알림', '별점을 선택해주세요.');
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch('http://10.0.2.2:8888/api/review', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: title, // 제목
                    content: content, // 내용
                    rating: rating, // 별점

                    selectMovie: selectedMovie, // 작품 통합 데이터
                    movieId: selectedMovie ? selectedMovie.id : null, // 작품의 CODE(ID)

                    createAt: new Date().toISOString(), // 작성일
                    updateAt: new Date().toISOString(), // 수정일
                    isUpdate: false, // 수정 여부

                    views: 0, // 조회 수
                    liked: 0, // 좋아요 수
                    commentCount: 0, // 댓글 수

                    userId: 1, // 유저 통합 데이터
                }),
            });

            if (!response.ok) {
                throw new Error('리뷰 생성 실패');
            }

            const result = await response.json();
            Alert.alert('완료', '리뷰가 성공적으로 작성되었습니다!', [
                { text: '확인', onPress: () => navigation.goBack() }
            ]);
        } catch (error) {
            console.log(error);
            Alert.alert('오류', '리뷰 작성에 실패했습니다.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSelectMovie = () => {
        navigation.navigate('SearchList', {
            onSelect: (movie) => {
                setSelectedMovie(movie);
            }
        });
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                style={styles.keyboardView}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.headerButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.headerButtonText}>취소</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>리뷰 작성</Text>
                </View>

                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.container}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.authorSection}>
                        <View style={styles.authorAvatar}>
                            <Text style={styles.authorAvatarText}>나</Text>
                        </View>
                        <View style={styles.authorInfo}>
                            <Text style={styles.author}>현재 사용자</Text>
                            <Text style={styles.authorSubtext}>리뷰를 작성해보세요</Text>
                        </View>
                    </View>

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
                                {rating > 0 ? `${rating * 1} / 5점` : '별점을 선택하세요'}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.inputSection}>
                        <Text style={styles.sectionTitle}>작품선택</Text>
                        <TouchableOpacity
                            style={styles.movieSelectButton}
                            onPress={handleSelectMovie}
                            activeOpacity={0.7}
                        >
                            <View style={styles.movieSelectContent}>
                                <Text style={[
                                    styles.movieSelectText,
                                    selectedMovie ? null : styles.moviePlaceholder
                                ]}>
                                    {selectedMovie
                                        ? `${selectedMovie.title || selectedMovie.name} (${(selectedMovie.release_date || selectedMovie.first_air_date || '').slice(0, 4)})`
                                        : '리뷰할 작품을 선택해주세요'}
                                </Text>
                                <Text style={styles.movieSelectArrow}>▶</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

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

                    <View style={styles.guideSection}>
                        <Text style={styles.guideTitle}>💡 좋은 리뷰 작성 팁</Text>
                        <Text style={styles.guideText}>• 스포일러가 포함된 내용은 피해주세요</Text>
                        <Text style={styles.guideText}>• 구체적인 감상평을 작성해주세요</Text>
                        <Text style={styles.guideText}>• 다른 사용자를 존중하는 표현을 사용해주세요</Text>
                    </View>
                </ScrollView>

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
                            {isSubmitting ? '작성 중...' : '리뷰 작성 완료'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};
