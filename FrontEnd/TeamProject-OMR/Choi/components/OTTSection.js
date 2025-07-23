import { memo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import OTTCard from './card/OTTCard';

function OTTSection({ title, data, activeCard, onToggle, providerKey }) {
    const navigation = useNavigation();
    return (
        <View style={styles.section}>
            <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate('OTTListScreen', { providerKey })
                    }
                >
                    <Text style={styles.seeAll}>전체보기</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                horizontal
                data={data}
                keyExtractor={(item) => item.id.toString()}
                extraData={activeCard}
                renderItem={({ item, index }) => (
                    <OTTCard
                        rank={index + 1}
                        image={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                        title={item.title || item.name}
                        isActive={activeCard === item.id} // ✅ 현재 활성화된 카드
                        onToggle={() => onToggle(item.id)} // ✅ 클릭 시 토글
                        onReviewPress={() => console.log(`${item.title} 리뷰보기 클릭`)}
                        onDetailPress={() => console.log(`${item.title} 상세정보 클릭`)}
                    />
                )}
            />
        </View>
    );
}

export default memo(OTTSection);

const styles = StyleSheet.create({
    section: { marginBottom: 20 },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: { fontSize: 18, fontWeight: 'bold' },
    seeAll: { color: '#007BFF', fontSize: 14 },
});
