import { ScrollView, TouchableOpacity, Text, StyleSheet } from "react-native";
import ProviderInfo from "./ProviderInfo";

const OTTSelector = ({ selectedProvider, onSelectProvider }) => {
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
            {Object.keys(ProviderInfo).map((provider) => {
                const info = ProviderInfo[provider];
                return (
                    <TouchableOpacity
                        key={provider}
                        style={[styles.button, selectedProvider === provider && { backgroundColor: info.color }]}
                        onPress={() => onSelectProvider(provider)}
                    >
                        {info.icon}
                        <Text style={[styles.text, selectedProvider === provider && { color: 'white' }]}>
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
        backgroundColor: '#f0f0f0',
        marginRight: 8,
    },
    text: {
        marginLeft: 6,
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
});

export default OTTSelector;