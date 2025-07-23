import { View, Text, StyleSheet } from "react-native";

const ReviewList = () => {
    return(
        <View style={styles.container}>
            <Text>리뷰 페이지</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default ReviewList;