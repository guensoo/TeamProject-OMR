import { View, Text, StyleSheet } from "react-native";

const FindTheater = () => {
    return(
        <View style={styles.container}>
            <Text>영화관찾기</Text>
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

export default FindTheater;