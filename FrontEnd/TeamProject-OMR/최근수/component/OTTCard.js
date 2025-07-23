import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function OTTCard({ rank, image, title }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.rank}>{rank}</Text>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>상세정보</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { width: 120, marginRight: 10, position: 'relative' },
  image: { width: 120, height: 180, borderRadius: 8 },
  rank: {
    position: 'absolute',
    top: 5,
    left: 5,
    color: '#fff',
    fontWeight: 'bold',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 5,
    borderRadius: 3,
  },
  title: { marginTop: 5, textAlign: 'center', fontSize: 12 },
  button: { backgroundColor: 'red', marginTop: 5, padding: 5, borderRadius: 5 },
  buttonText: { color: '#fff', textAlign: 'center', fontSize: 12 },
});
