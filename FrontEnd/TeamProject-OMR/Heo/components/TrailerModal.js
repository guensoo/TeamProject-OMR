import { Modal, View, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { Ionicons } from '@expo/vector-icons';

const TrailerModal = ({ visible, onClose, videoId, playerWidth, playerHeight }) => {
    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <YoutubePlayer
                    height={playerHeight}
                    width={playerWidth}
                    play={true}
                    videoId={videoId}
                    onChangeState={event => {
                        if (event === 'ended') {
                            onClose();
                        }
                    }}
                    forceAndroidAutoplay={true}
                    playerParams={{
                        controls: 1,
                        modestbranding: 1,
                        rel: 0,
                        fs: 1,
                    }}
                />
                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={onClose}
                >
                    <Ionicons name="close-circle" size={48} color="white" />
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.9)',
        paddingHorizontal: 20,
    },
    closeButton: {
        position: 'absolute',
        top: 50,
        right: 30,
    },
})

export default TrailerModal;