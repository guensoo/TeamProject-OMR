import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Header = () => {

    const navigation = useNavigation();

    return (
        <View style={styles.header}>
            <Text style={styles.headerText}>OMR</Text>
        </View>
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