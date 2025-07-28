import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal'
import { Ionicons } from '@expo/vector-icons'

const BottomAllMenuButton = ({ isVisible, onClose, navigation }) => {
    const tabScreens = ['ReviewList', 'OTTScreen', 'MovieScreen'];

    const handleNavigate = (screenName) => {
        if (tabScreens.includes(screenName)) {
            navigation.navigate('BottomTabMenu', { screen: screenName });
        } else {
            navigation.navigate(screenName);
        }
        onClose(); // 모달 닫기
    };

    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={onClose}
            animationIn="slideInRight"
            animationOut="slideOutRight"
            style={styles.modal}
            useNativeDriver
        >
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={onClose}
                    style={styles.closeButton}
                    hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }} // ✅ 터치 영역 확대
                >
                    <Ionicons name="close" size={24} color="#333" />
                </TouchableOpacity>

                <Text style={styles.title}>메뉴</Text>

                <View style={styles.menuList}>
                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => handleNavigate('Login')}
                    >
                        <Ionicons name="person-outline" size={24} color="#333" />
                        <Text style={styles.menuText}>로그인</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => handleNavigate('ReviewList')}
                    >
                        <Ionicons name="chatbubble-ellipses-outline" size={24} color="#333" />
                        <Text style={styles.menuText}>리뷰</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => handleNavigate('OTTScreen')}
                    >
                        <Ionicons name="tv-outline" size={24} color="#333" />
                        <Text style={styles.menuText}>OTT</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => handleNavigate('MovieScreen')}
                    >
                        <Ionicons name="film-outline" size={24} color="#333" />
                        <Text style={styles.menuText}>영화</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => handleNavigate('FindTheater')}
                    >
                        <Ionicons name="location-outline" size={24} color="#333" />
                        <Text style={styles.menuText}>영화관 찾기</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => handleNavigate('AIRecommend')}
                    >
                        <Ionicons name="cloud-outline" size={24} color="#333" />
                        <Text style={styles.menuText}>AI 추천</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => handleNavigate('')}
                    >
                        <Ionicons name="call-outline" size={24} color="#333" />
                        <Text style={styles.menuText}>고객센터</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        margin: 0,
        marginTop: 45,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    container: {
        width: '70%',
        height: '100%',
        backgroundColor: '#fff',
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 10,
        zIndex: 100,
    },
    menuList: {
        marginTop: 10,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
    },
    menuText: {
        fontSize: 16,
        marginLeft: 12,
        color: '#333',
    },
});

export default BottomAllMenuButton;