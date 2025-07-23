<<<<<<< HEAD
=======
import React from 'react';
>>>>>>> 23bc1e739ec2db711514254c070b024c0f0dd21f
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import OTTCard from './OTTCard';

export default function OTTSection({ title, data }) {
    return (
        <View style={styles.section}>
<<<<<<< HEAD
        <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity>
            <Text style={styles.seeAll}>전체보기</Text>
            </TouchableOpacity>
        </View>
        <FlatList
            horizontal
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => (
            <OTTCard
                rank={index + 1}
                image={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                title={item.title || item.name}
            />
            )}
        />
=======
            <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
                <TouchableOpacity>
                    <Text style={styles.seeAll}>전체보기</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                horizontal
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) => (
                    <OTTCard
                        rank={index + 1}
                        image={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                        title={item.title || item.name}
                    />
                )}
            />
>>>>>>> 23bc1e739ec2db711514254c070b024c0f0dd21f
        </View>
    );
}

const styles = StyleSheet.create({
    section: { marginBottom: 20 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    title: { fontSize: 18, fontWeight: 'bold' },
    seeAll: { color: '#007BFF', fontSize: 14 },
});
