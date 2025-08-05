import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const AccountSettings = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('EditProfile')}>
                <Text style={styles.label}>프로필 수정</Text>
                <Ionicons name="chevron-forward" size={20} color="#888" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('ChangeEmail')}>
                <Text style={styles.label}>이메일 변경</Text>
                <Ionicons name="chevron-forward" size={20} color="#888" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('ChangePassword')}>
                <Text style={styles.label}>비밀번호 변경</Text>
                <Ionicons name="chevron-forward" size={20} color="#888" />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.item, { borderBottomWidth: 0 }]} onPress={() => navigation.navigate('DeleteAccount')}>
                <Text style={[styles.label, { color: 'red' }]}>회원 탈퇴</Text>
                <Ionicons name="chevron-forward" size={20} color="red" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        flex: 1,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    label: {
        fontSize: 16,
    },
});

export default AccountSettings;