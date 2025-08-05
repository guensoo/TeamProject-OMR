import { useState } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";

const Notifications = () => {
    const [pushEnabled, setPushEnabled] = useState(true);
    const [commentEnabled, setCommentEnabled] = useState(true);

    return (
        <View style={styles.container}>
            <View style={styles.settingRow}>
                <Text style={styles.label}>푸시 알림</Text>
                <Switch
                    value={pushEnabled}
                    onValueChange={setPushEnabled}
                />
            </View>
            <View style={styles.settingRow}>
                <Text style={styles.label}>댓글 알림</Text>
                <Switch
                    value={commentEnabled}
                    onValueChange={setCommentEnabled}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        flex: 1,
    },
    settingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    label: {
        fontSize: 16,
    },
});

export default Notifications;