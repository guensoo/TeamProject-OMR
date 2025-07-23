import { View, Text, StyleSheet } from "react-native";

const Header = () => {
    return(
        <>
            <View style={styles.header}>
                <Text style={styles.headerText}>OMR</Text>
                <Text style={styles.headerSubText}>OMR MOVIE REVIEW</Text>
            </View>
            <Text style={styles.headerMenu}>리뷰 | OTT | 영화 | 영화관찾기 | AI추천영상</Text>
        </>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 60,
        paddingTop: 15,
        backgroundColor: '#4A90E2',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    headerSubText: {
        color: '#fff',
        fontSize: 14,
    },
    headerMenu: {
        textAlign: 'center'
    }
})

export default Header;