import { View, Text, StyleSheet } from "react-native";

const AIRecommend = () => {
    return(
        <View style={styles.container}>
            <Text style={styles.content}>개발 예정...</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        color: 'red',
        fontSize: 24
    }
})

export default AIRecommend;