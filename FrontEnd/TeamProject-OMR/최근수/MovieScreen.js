import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    StyleSheet,
    Dimensions
} from 'react-native';
import { getBoxOfficeWithPosters } from '../공통/api/kofic';
import OTTCard from './components/OTTCard';

// ✅ 여기에 넣기 (함수 바깥)
const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 40) / 2;

export default function MovieScreen() {
    const [loading, setLoading] = useState(true);
    const [boxOfficeData, setBoxOfficeData] = useState([]);

    useEffect(() => {
        const today = new Date();
        today.setDate(today.getDate() - 1);
        const y = today.getFullYear();
        const m = String(today.getMonth() + 1).padStart(2, '0');
        const d = String(today.getDate()).padStart(2, '0');
        const targetDt = `${y}${m}${d}`;

        const fetchData = async () => {
            const data = await getBoxOfficeWithPosters(targetDt);
            setBoxOfficeData(data.slice(0, 10));
            setLoading(false);
        };
        fetchData();
    }, []);

    if (loading)
        return <ActivityIndicator size="large" color="#000" style={{ marginTop: 50 }} />;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>현재 인기 순위</Text>
            <FlatList
                data={boxOfficeData}
                numColumns={2}
                contentContainerStyle={styles.listContainer}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) => (
                    <View style={[styles.cardWrapper, { width: CARD_WIDTH }]}>
                        <OTTCard rank={index + 1} image={item.poster_path} title={item.title} />
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', padding: 10 },
    title: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
    listContainer: {
        justifyContent: 'center',
        paddingBottom: 20,
    },
    cardWrapper: {
        margin: 5,
        alignItems: 'center',
    },
});
