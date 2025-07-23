import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import cinemaData from '../Parse/cinema_grouped.json';

export default function MapScreen({ route }) {
    const { region, district, brand } = route.params;

    const [markers, setMarkers] = useState([]);
    const [mapRegion, setMapRegion] = useState({
        latitude: 37.5665,
        longitude: 126.9780,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
    });

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
    }, [region, district, brand]);

    return (
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    map: { flex: 1 },
});
