import { ScrollView, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ProviderInfo from "./ProviderInfo";

const OTTSelector = () => {
    const navigation = useNavigation();

    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
            {Object.keys(ProviderInfo).map((provider) => {
                const info = ProviderInfo[provider];
                return (
                    <TouchableOpacity
                        key={provider}
                        style={[styles.button, { backgroundColor: info.color }]}
                        onPress={() => navigation.navigate('OTTListScreen', {providerKey: provider})}
                    >
                        {info.icon}
                        <Text style={[styles.text, { color: 'white' }]}>
                            {provider.charAt(0).toUpperCase() + provider.slice(1)}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { 
        paddingVertical: 10, 
        paddingHorizontal: 10 
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight: 8,
    },
    text: {
        marginLeft: 2,
        fontSize: 14,
        fontWeight: '600',
    },
});

export default OTTSelector;