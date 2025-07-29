import { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    Alert,
    Image
} from "react-native";
import * as ImagePicker from 'expo-image-picker';

export const ReviewWrite = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [rating, setRating] = useState(0);
    const [selectedImages, setSelectedImages] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);

    // 별점 선택 핸들러
    const handleRatingPress = (selectedRating) => {
        setRating(selectedRating);
    };

    // 이미지 선택 핸들러
    const handleImagePicker = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [16, 9],
                quality: 0.8,
                allowsMultipleSelection: false,
            });

            if (!result.canceled && selectedImages.length < 5) {
                setSelectedImages([...selectedImages, result.assets[0]]);
            }
        } catch (error) {
            Alert.alert('오류', '이미지를 선택할 수 없습니다.');
        }
    };

    // 이미지 삭제 핸들러
    const handleRemoveImage = (index) => {
        const newImages = selectedImages.filter((_, i) => i !== index);
        setSelectedImages(newImages);
    };

    // 제출 핸들러
    const handleSubmit = async () => {
        if (!title.trim()) {
            Alert.alert('알림', '제목을 입력해주세요.');
            return;
        }
        if (!content.trim()) {
            Alert.alert('알림', '내용을 입력해주세요.');
            return;
        }
        if (rating === 0) {
            Alert.alert('알림', '별점을 선택해주세요.');
            return;
        }

        setIsSubmitting(true);

        try {
            // 실제로는 API 호출
            await new Promise(resolve => setTimeout(resolve, 1500));

            Alert.alert('완료', '리뷰가 성공적으로 작성되었습니다!', [
                { text: '확인', onPress: () => navigation.goBack() }
            ]);
        } catch (error) {
            Alert.alert('오류', '리뷰 작성에 실패했습니다.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // 임시저장 핸들러
    const handleSaveDraft = () => {
        Alert.alert('임시저장', '작성 중인 내용이 임시저장되었습니다.');
    };

    // 작품 선택 핸들러
    const handleSelectMovie = () => {
        navigation.navigate('SearchList', {
            onSelect: (movie) => {
                setSelectedMovie(movie);   // ← 선택한 정보 저장!
            }
        });
    };

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
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.headerButtonText}>취소</Text>
                    </TouchableOpacity>

                    <Text style={styles.headerTitle}>리뷰 작성</Text>

                    <TouchableOpacity
                        style={styles.headerButton}
                        onPress={handleSaveDraft}
                    >
                        <Text style={styles.headerButtonText}>임시저장</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.container}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* 작성자 정보 섹션 */}
                    <View style={styles.authorSection}>
                        <View style={styles.authorAvatar}>
                            <Text style={styles.authorAvatarText}>나</Text>
                        </View>
                        <View style={styles.authorInfo}>
                            <Text style={styles.author}>현재 사용자</Text>
                            <Text style={styles.authorSubtext}>리뷰를 작성해보세요</Text>
                        </View>
                    </View>

                    {/* 별점 선택 섹션 */}
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
                                {rating > 0 ? `${rating * 2}.0점` : '별점을 선택하세요'}
                            </Text>
                        </View>
                    </View>

                    {/* 영화 선택 섹션 - 수정된 부분 */}
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

                    {/* 제목 입력 섹션 */}
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

                    {/* 내용 입력 섹션 */}
                    <View style={styles.inputSection}>
                        <Text style={styles.sectionTitle}>내용</Text>
                        <TextInput
                            style={styles.contentInput}
                            placeholder="작품에 대한 솔직한 리뷰를 작성해주세요.&#10;&#10;다른 사용자들에게 도움이 되는 리뷰를 작성해보세요!"
                            placeholderTextColor="#999"
                            value={content}
                            onChangeText={setContent}
                            multiline
                            maxLength={2000}
                            textAlignVertical="top"
                        />
                        <Text style={styles.charCount}>{content.length}/2000</Text>
                    </View>

                    {/* 이미지 추가 섹션 */}
                    <View style={styles.inputSection}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>사진 추가</Text>
                            <Text style={styles.sectionSubtitle}>최대 5장</Text>
                        </View>

                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={styles.imageScrollView}
                        >
                            {/* 이미지 추가 버튼 */}
                            {selectedImages.length < 5 && (
                                <TouchableOpacity
                                    style={styles.imageAddButton}
                                    onPress={handleImagePicker}
                                >
                                    <Text style={styles.imageAddIcon}>📷</Text>
                                    <Text style={styles.imageAddText}>사진 추가</Text>
                                </TouchableOpacity>
                            )}

                            {/* 선택된 이미지들 */}
                            {selectedImages.map((image, index) => (
                                <View key={index} style={styles.imageContainer}>
                                    <Image
                                        source={{ uri: image.uri }}
                                        style={styles.selectedImage}
                                    />
                                    <TouchableOpacity
                                        style={styles.imageRemoveButton}
                                        onPress={() => handleRemoveImage(index)}
                                    >
                                        <Text style={styles.imageRemoveText}>✕</Text>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </ScrollView>
                    </View>

                    {/* 작성 가이드 */}
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
                            (title.trim() && content.trim() && rating > 0)
                                ? styles.submitButtonActive
                                : styles.submitButtonInactive
                        ]}
                        onPress={handleSubmit}
                        disabled={!title.trim() || !content.trim() || rating === 0 || isSubmitting}
                    >
                        <Text style={[
                            styles.submitButtonText,
                            (title.trim() && content.trim() && rating > 0)
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

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    keyboardView: {
        flex: 1,
    },

    // 헤더
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
        backgroundColor: '#FFFFFF',
    },
    headerButton: {
        paddingVertical: 8,
        paddingHorizontal: 4,
    },
    headerButtonText: {
        fontSize: 16,
        color: '#FF6B6B',
        fontWeight: '500',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1A1A1A',
    },

    scrollView: {
        flex: 1,
    },
    container: {
        paddingBottom: 100,
    },

    // 작성자 섹션
    authorSection: {
        flexDirection: "row",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#FFFFFF",
        borderBottomWidth: 1,
        borderBottomColor: "#F0F0F0",
    },
    authorAvatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "#6C5CE7",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    authorAvatarText: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "600",
    },
    authorInfo: {
        flex: 1,
    },
    author: {
        fontSize: 16,
        fontWeight: "600",
        color: "#1A1A1A",
        marginBottom: 4,
    },
    authorSubtext: {
        fontSize: 14,
        color: "#666",
    },

    // 별점 섹션
    ratingSection: {
        padding: 20,
        backgroundColor: "#FAFAFA",
        borderBottomWidth: 1,
        borderBottomColor: "#F0F0F0",
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#1A1A1A",
        marginBottom: 12,
    },
    ratingContainer: {
        alignItems: "center",
    },
    stars: {
        flexDirection: "row",
        marginBottom: 8,
    },
    starButton: {
        padding: 4,
    },
    star: {
        fontSize: 32,
        marginHorizontal: 4,
    },
    starFilled: {
        color: "#FFD700",
    },
    starEmpty: {
        color: "#E0E0E0",
    },
    ratingText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#FF6B6B",
    },

    // 입력 섹션
    inputSection: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#F0F0F0",
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    sectionSubtitle: {
        fontSize: 14,
        color: "#666",
    },
    titleInput: {
        fontSize: 18,
        color: "#333",
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: "#E0E0E0",
        borderRadius: 8,
        backgroundColor: "#FFFFFF",
        marginBottom: 8,
    },
    contentInput: {
        fontSize: 16,
        color: "#333",
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: "#E0E0E0",
        borderRadius: 8,
        backgroundColor: "#FFFFFF",
        minHeight: 200,
        marginBottom: 8,
    },
    charCount: {
        fontSize: 12,
        color: "#999",
        textAlign: "right",
    },

    // 이미지 섹션
    imageScrollView: {
        marginTop: 8,
    },
    imageAddButton: {
        width: 100,
        height: 100,
        borderWidth: 2,
        borderColor: "#E0E0E0",
        borderStyle: "dashed",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
        backgroundColor: "#FAFAFA",
    },
    imageAddIcon: {
        fontSize: 24,
        marginBottom: 4,
    },
    imageAddText: {
        fontSize: 12,
        color: "#666",
        textAlign: "center",
    },
    imageContainer: {
        position: "relative",
        marginRight: 12,
    },
    selectedImage: {
        width: 100,
        height: 100,
        borderRadius: 8,
        backgroundColor: "#F5F5F5",
    },
    imageRemoveButton: {
        position: "absolute",
        top: -8,
        right: -8,
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: "#FF6B6B",
        justifyContent: "center",
        alignItems: "center",
    },
    imageRemoveText: {
        color: "#FFFFFF",
        fontSize: 12,
        fontWeight: "600",
    },

    // 가이드 섹션
    guideSection: {
        margin: 20,
        padding: 16,
        backgroundColor: "#F8F9FA",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E9ECEF",
    },
    guideTitle: {
        fontSize: 14,
        fontWeight: "600",
        color: "#495057",
        marginBottom: 8,
    },
    guideText: {
        fontSize: 13,
        color: "#6C757D",
        lineHeight: 18,
        marginBottom: 2,
    },

    // 제출 버튼 섹션
    submitSection: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#FFFFFF",
        borderTopWidth: 1,
        borderTopColor: "#E9ECEF",
        paddingHorizontal: 20,
        paddingVertical: 16,
        elevation: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    submitButton: {
        paddingVertical: 16,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
    },
    submitButtonActive: {
        backgroundColor: "#FF6B6B",
    },
    submitButtonInactive: {
        backgroundColor: "#E9ECEF",
    },
    submitButtonText: {
        fontSize: 16,
        fontWeight: "600",
    },
    submitButtonTextActive: {
        color: "#FFFFFF",
    },
    submitButtonTextInactive: {
        color: "#ADB5BD",
    },
    movieSelectButton: {
        backgroundColor: "#FF6B6B",
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 20,
        marginBottom: 8,
        elevation: 2,
        shadowColor: "#FF6B6B",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    movieSelectContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    movieSelectText: {
        fontSize: 16,
        color: "#FFFFFF",
        fontWeight: "500",
        flex: 1,
    },
    moviePlaceholder: {
        opacity: 0.9,
    },
    movieSelectArrow: {
        fontSize: 14,
        color: "#FFFFFF",
        marginLeft: 8,
    },
    selectedMovieInfo: {
        marginTop: 8,
        color: '#ffd700',
        fontWeight: 'bold',
        fontSize: 15,
    },
});