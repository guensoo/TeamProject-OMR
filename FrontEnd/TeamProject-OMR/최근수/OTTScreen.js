import { useEffect, useState } from 'react';
import {
	View,
	Text,
	ActivityIndicator,
	Animated,
	StyleSheet,
	Modal,
	Image,
	TouchableOpacity,
	StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import OTTSection from './components/OTTSection';
import { getAllOTTPopular } from '../공통/api/tmdb';

export default function OTTScreen() {
	const [loading, setLoading] = useState(true);
	const [ottData, setOttData] = useState({});
	const [modalVisible, setModalVisible] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);

	const fadeAnim = useState(new Animated.Value(0))[0];
	const slideAnim = useState(new Animated.Value(30))[0];

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getAllOTTPopular();
				setOttData(data || {});
			} catch (err) {
				console.error('OTT API Error:', err.message);
				setOttData({});
			} finally {
				setLoading(false);
				Animated.parallel([
					Animated.timing(fadeAnim, {
						toValue: 1,
						duration: 800,
						useNativeDriver: true,
					}),
					Animated.timing(slideAnim, {
						toValue: 0,
						duration: 800,
						useNativeDriver: true,
					}),
				]).start();
			}
		};
		fetchData();
	}, []);

	const handleCardPress = (item) => {
		setSelectedItem(item);
		setModalVisible(true);
	};

	if (loading) {
		return (
			<LinearGradient
				colors={['#0f0f23', '#1a1a2e', '#16213e']}
				style={styles.loadingContainer}
			>
				<ActivityIndicator size="large" color="#ff6b6b" />
				<Text style={styles.loadingText}>OTT 콘텐츠 로딩중...</Text>
			</LinearGradient>
		);
	}

	const ottServices = [
		{ key: 'netflix', title: '넷플릭스 인기 순', color: '#e50914', icon: '🎬' },
		{ key: 'disney', title: '디즈니+ 인기 순', color: '#113ccf', icon: '✨' },
		{ key: 'coupang', title: '쿠팡플레이 인기 순', color: '#ff7b00', icon: '🎭' },
		{ key: 'wavve', title: '웨이브 인기 순', color: '#1f4788', icon: '🌊' },
		{ key: 'watcha', title: '왓챠 인기 순', color: '#ff0558', icon: '👁️' },
		{ key: 'appletv', title: 'Apple TV+ 인기 순', color: '#000000', icon: '🍎' },
		{ key: 'prime', title: 'Prime Video 인기 순', color: '#00a8e1', icon: '📺' },
	];

	return (
		<View style={styles.container}>
			<StatusBar barStyle="light-content" backgroundColor="#0f0f23" />

			{/* 기존 OTT 리스트 UI */}
			<Animated.ScrollView
				style={[styles.scrollContainer, { opacity: fadeAnim }]}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.scrollContent}
			>
				{ottServices.map((service, index) => (
					<Animated.View key={service.key} style={styles.sectionWrapper}>
						<View
							style={[styles.sectionHeader, { borderLeftColor: service.color }]}
						>
							<Text style={styles.sectionIcon}>{service.icon}</Text>
							<Text style={styles.sectionTitle}>{service.title}</Text>
						</View>
						<OTTSection
							title=""
							data={ottData[service.key] || []}
							onCardPress={handleCardPress} // ✅ 카드 클릭 핸들러 전달
						/>
					</Animated.View>
				))}
			</Animated.ScrollView>

			{/* ✅ 상세보기 모달 */}
			{selectedItem && (
				<Modal
					transparent={true}
					visible={modalVisible}
					animationType="slide"
					onRequestClose={() => setModalVisible(false)}
				>
					<View style={styles.modalContainer}>
						<View style={styles.modalContent}>
							<Image
								source={{ uri: selectedItem.poster_path }}
								style={styles.modalImage}
							/>
							<Text style={styles.modalTitle}>{selectedItem.title}</Text>
							<Text style={styles.modalText}>
								{selectedItem.overview || '상세 설명이 없습니다.'}
							</Text>
							<TouchableOpacity
								style={styles.closeButton}
								onPress={() => setModalVisible(false)}
							>
								<Text style={styles.closeButtonText}>닫기</Text>
							</TouchableOpacity>
						</View>
					</View>
				</Modal>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: '#0f0f23' },
	scrollContainer: { flex: 1 },
	scrollContent: { paddingHorizontal: 15 },
	sectionWrapper: {
		marginBottom: 30,
		backgroundColor: 'rgba(255, 255, 255, 0.03)',
		borderRadius: 20,
		padding: 15,
	},
	sectionHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 15,
		paddingLeft: 15,
		borderLeftWidth: 4,
		borderRadius: 8,
	},
	sectionIcon: { fontSize: 24, marginRight: 12 },
	sectionTitle: { fontSize: 20, fontWeight: '700', color: '#ffffff' },
	modalContainer: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.7)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalContent: {
		backgroundColor: '#fff',
		borderRadius: 10,
		padding: 20,
		width: '80%',
		alignItems: 'center',
	},
	modalImage: { width: 150, height: 220, borderRadius: 8, marginBottom: 10 },
	modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
	modalText: { fontSize: 14, textAlign: 'center', marginBottom: 20 },
	closeButton: {
		backgroundColor: '#e50914',
		paddingHorizontal: 15,
		paddingVertical: 8,
		borderRadius: 5,
	},
	closeButtonText: { color: '#fff', fontWeight: 'bold' },
});
