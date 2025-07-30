import { View, Text, StyleSheet } from "react-native";

const FindPassword = () => {
    return(
        <View style={styles.container}>
            <Text style={styles.content}>비밀번호찾기</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    content: {
        fontSize: 16,
    }
})

export default FindPassword;