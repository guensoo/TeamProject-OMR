import { View, Text, StyleSheet } from "react-native"

const Home = () => {
    return(
        <View style={styles.container}>
            <Text>홈</Text>
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

export default Home;