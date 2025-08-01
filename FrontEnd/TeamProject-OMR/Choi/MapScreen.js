import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Animated } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import cinemaData from '../Parse/cinema_grouped.json';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MapScreen({ route }) {
    const { region, district, brand } = route.params;
    const navigation = useNavigation();

    const [markers, setMarkers] = useState([]);
    const [mapRegion, setMapRegion] = useState({
        latitude: 37.5665,
        longitude: 126.9780,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
    });

    // 애니메이션 값들
    const fadeAnim = useState(new Animated.Value(0))[0];
    const slideAnim = useState(new Animated.Value(-50))[0];

    useEffect(() => {
        const filtered = cinemaData.filter(item =>
            item.city === region &&
            item.district === district &&
            (brand === "전체" || item.brand === brand)
        );

        const mapped = filtered.map((item, index) => ({
            id: index.toString(),
            latitude: item.latitude,
            longitude: item.longitude,
            name: item.name,
            address: item.address,
        }));

        setMarkers(mapped);

        if (mapped.length > 0) {
            setMapRegion({
                latitude: mapped[0].latitude,
                longitude: mapped[0].longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
            });
        }

        // 애니메이션 시작
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 600,
                useNativeDriver: true,
            }),
        ]).start();
    }, [region, district, brand]);

    const handleGoBack = () => {
        navigation.goBack();
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#181825' }} edges={['top', 'left', 'right']}>
            <View style={styles.container}>
                <MapView style={styles.map} initialRegion={mapRegion}>
                    {markers.map(marker => (
                        <Marker
                            key={marker.id}
                            coordinate={{
                                latitude: marker.latitude,
                                longitude: marker.longitude,
                            }}
                            title={marker.name}
                            description={marker.address}
                        />
                    ))}
                </MapView>

                {/* 뒤로가기 버튼 */}
                <Animated.View 
                    style={[
                        styles.backButtonContainer,
                        {
                            opacity: fadeAnim,
                            transform: [{ translateY: slideAnim }]
                        }
                    ]}
                >
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={handleGoBack}
                        activeOpacity={0.8}
                    >
                        <LinearGradient
                            colors={['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.05)']}
                            style={styles.backButtonGradient}
                        >
                            <Text style={styles.backButtonIcon}>←</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </Animated.View>

                {/* 헤더 정보 */}
                <Animated.View 
                    style={[
                        styles.headerContainer,
                        {
                            opacity: fadeAnim,
                            transform: [{ translateY: slideAnim }]
                        }
                    ]}
                >
                    <LinearGradient
                        colors={['rgba(24, 24, 37, 0.9)', 'rgba(24, 24, 37, 0.7)']}
                        style={styles.headerGradient}
                    >
                        <Text style={styles.headerTitle}>🎬 {region} {district}</Text>
                        <Text style={styles.headerSubtitle}>
                            {brand === "전체" ? "모든 영화관" : brand} • {markers.length}개 영화관
                        </Text>
                    </LinearGradient>
                </Animated.View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1 
    },
    map: { 
        flex: 1 
    },
    backButtonContainer: {
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 1000,
    },
    backButton: {
        borderRadius: 25,
        overflow: 'hidden',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    backButtonGradient: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    backButtonIcon: {
        fontSize: 24,
        color: '#ffffff',
        fontWeight: 'bold',
    },
    headerContainer: {
        position: 'absolute',
        top: 20,
        right: 20,
        left: 80, // 뒤로가기 버튼 공간 확보
        zIndex: 999,
    },
    headerGradient: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#ffffff',
        marginBottom: 2,
    },
    headerSubtitle: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.8)',
        fontWeight: '500',
    },
});