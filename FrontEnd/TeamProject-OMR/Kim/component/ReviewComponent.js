import { useNavigation } from "@react-navigation/native"
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"

export const ReviewComponent = (items) => {
    const navigation = useNavigation();
    
    return(
        <TouchableOpacity 
            style={styles.container}
            onPress={() => navigation.navigate("ReviewDetail", { reviewId: items.id })}
            activeOpacity={0.8}
        >
            {/* 사진영역 */}
            <View style={styles.imageContainer}>
                <Image 
                    style={styles.img}
                    source={require('../../assets/review_sample.jpg')} 
                />
                <View style={styles.overlay} />
            </View>

            {/* 정보영역 */}
            <View style={styles.contentContainer}>
                <View style={styles.genreContainer}>
                    <Text style={styles.genreText}>{'액션'}</Text>
                </View>
                
                <Text style={styles.titleText} numberOfLines={1}>
                    {"영화 제목이 여기에 표시됩니다"}
                </Text>
                
                <Text style={styles.descriptionText} numberOfLines={3}>
                    {'이곳에는 영화에 대한 간단한 리뷰 내용이 표시됩니다. 최대 3줄까지 보여지며, 넘치는 내용은 말줄임표로 처리됩니다.'}
                </Text>
                
                <Text style={styles.dateText}>{'2024.07.24'}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '48%',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        overflow: 'hidden',
    },
    imageContainer: {
        position: 'relative',
        width: '100%',
        height: 120,
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
    contentContainer: {
        padding: 12,
        gap: 6,
    },
    genreContainer: {
        alignSelf: 'flex-start',
        backgroundColor: '#FF4757',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        marginBottom: 4,
    },
    genreText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '600',
    },
    titleText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2C3E50',
        marginBottom: 4,
    },
    descriptionText: {
        fontSize: 13,
        color: '#5A6C7D',
        lineHeight: 18,
        marginBottom: 8,
    },
    dateText: {
        fontSize: 11,
        color: '#95A5A6',
        fontWeight: '500',
    }
})