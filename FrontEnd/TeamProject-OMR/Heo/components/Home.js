import { View, Text, StyleSheet, ScrollView } from "react-native"
import Header from "./Header"
import Footer from "./Footer"

const Home = () => {
    return(
        <View style={styles.container}>
            <Header />
            <ScrollView contentContainerStyle={styles.content}>
                {Array.from({ length: 50 }, (_, i) => (
                    <Text key={i}>홈 - 테스트 스크롤 {i + 1}</Text>
                ))}
                <Footer />
            </ScrollView>      
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default Home;