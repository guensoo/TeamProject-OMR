import { View, Text, StyleSheet } from "react-native"; 

const Footer = () => {
    return(
        <View style={styles.footer}>
            <Text style={styles.footerText}>© 2025 OMR Team</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    footer: {
        height: 50,
        justifyContent: 'center',
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    footerText: {
        color: '#000',
        fontSize: 14,
    },
})

export default Footer;