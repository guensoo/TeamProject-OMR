import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Header = () => {

    const navigation = useNavigation();

    return(
        <>
            <View style={styles.header}>
                <Text style={styles.headerText}>OMR</Text>
                {/* <TouchableOpacity onPress={() => {console.log("영화")}}>
                    <Text style={styles.menuItem}>영화</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {console.log("OTT")}}>
                    <Text style={styles.menuItem}>OTT</Text>
                </TouchableOpacity> */}
                {/* <Text style={styles.headerSubText}>OMR MOVIE REVIEW</Text> */}
            </View>
            {/* <View style={styles.menuContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('ReviewList')}>
                    <Text style={styles.menuItem}>리뷰</Text>
                </TouchableOpacity>
                <Text style={styles.divider}>|</Text>
                <TouchableOpacity onPress={() => navigation.navigate('OTTScreen')}>
                    <Text style={styles.menuItem}>OTT</Text>
                </TouchableOpacity>
                <Text style={styles.divider}>|</Text>
                <TouchableOpacity onPress={() => navigation.navigate('MovieScreen')}>
                    <Text style={styles.menuItem}>영화</Text>
                </TouchableOpacity>
                <Text style={styles.divider}>|</Text>
                <TouchableOpacity onPress={() => navigation.navigate('FindTheater')}>
                    <Text style={styles.menuItem}>영화관찾기</Text>
                </TouchableOpacity>
                <Text style={styles.divider}>|</Text>
                <TouchableOpacity onPress={() => navigation.navigate('AIRecommend')}>
                    <Text style={styles.menuItem}>AI추천영상</Text>
                </TouchableOpacity>
            </View> */}
        </>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 60,
        marginLeft: 10,
        // paddingTop: 15,
        backgroundColor: '#fff', //변경할 것
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    headerText: {
        color: '#000',
        fontSize: 24,
        fontWeight: 'bold',
    },
    headerSubText: {
        color: '#4A90E2',
        fontSize: 14,
    },
    menuContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
    },
    menuItem: {
        textAlign: 'center',
        fontSize: 16,
        marginHorizontal: 5,
    },
    divider: {
        fontSize: 16,
        color: '#999',
    }
})

export default Header;