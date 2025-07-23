import { View, Text, StyleSheet } from "react-native";

const MovieScreen = () => {
    return(
        <View style={styles.container}>
            <Text>영화 페이지</Text>
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

export default MovieScreen;