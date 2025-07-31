import { View, Text, StyleSheet } from "react-native";

const MyPage = () => {
    return(
        <View style={styles.container}>
            <Text style={styles.text}>마이페이지</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
    }
})

export default MyPage;