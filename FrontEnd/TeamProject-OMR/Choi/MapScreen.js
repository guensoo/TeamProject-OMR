import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import cinemaData from '../Parse/cinema_grouped.json';

export default function MapScreen({ route }) {
    const { region, district } = route.params;

    const [markers, setMarkers] = useState([]);
    const [mapRegion, setMapRegion] = useState({
        latitude: 37.5665,
        longitude: 126.9780,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
    });

    // ✅ 1. cinemaData에서 markers 세팅
    useEffect(() => {
        if (!cinemaData) return;

        const filtered = cinemaData
            .filter(item =>
                item.region === region &&
                item.district === district
            )
            .map((item, index) => ({
                id: index.toString(),
                latitude: parseFloat(item.latitude),
                longitude: parseFloat(item.longitude),
                name: item.name,
                address: item.address,
            }));

        setMarkers(filtered);

        // ✅ 2. 첫 번째 마커 중심으로 지도 이동
        if (filtered.length > 0) {
            setMapRegion(prev => ({
                ...prev,
                latitude: filtered[0].latitude,
                longitude: filtered[0].longitude,
            }));
        }
    }, [region, district]);

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={mapRegion} // ✅ region → initialRegion (무한 루프 방지)
            >
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    map: { flex: 1 },
});
