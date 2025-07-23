import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function MapScreen({ route }) {
  const { region, district, latitude, longitude } = route.params;

  // 초기 지도 위치만 설정 (initialRegion)
  const initialRegion = {
    latitude: latitude || 37.5665,
    longitude: longitude || 126.9780,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}  // initialRegion만 주고 region은 안 줌
      >
        <Marker
          coordinate={{ latitude: initialRegion.latitude, longitude: initialRegion.longitude }}
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
