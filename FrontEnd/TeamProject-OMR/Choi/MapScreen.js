import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function MapScreen({ route }) {
  const { region, district, latitude, longitude } = route.params;
  const [mapRegion, setMapRegion] = useState({
    latitude: latitude || 37.5665,
    longitude: longitude || 126.9780,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  useEffect(() => {
    if (latitude && longitude) {
      setMapRegion({
        latitude,
        longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    }
  }, [latitude, longitude]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={mapRegion}  // initialRegion -> region 으로 변경
        onRegionChangeComplete={setMapRegion}
      >
        <Marker
          coordinate={{ latitude: mapRegion.latitude, longitude: mapRegion.longitude }}
          title={`${region} ${district}`}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});