import { Text, View, StyleSheet } from "react-native";

const Login = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.content}>로그인 만들기 귀찮다</Text>
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
        fontSize: 20,
    }
})

export default Login;