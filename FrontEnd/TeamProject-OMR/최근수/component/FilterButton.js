import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function FilterButton({ label, selected, onPress }) {
    return (
        <TouchableOpacity
            style={[styles.button, selected && styles.selectedButton]}
            onPress={onPress}
        >
            <Text style={[styles.text, selected && styles.selectedText]}>{label}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        marginRight: 10,
    },
    selectedButton: {
        backgroundColor: '#ff4444',
        borderColor: '#ff4444',
    },
    text: {
        color: '#555',
        fontSize: 14,
    },
    selectedText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
