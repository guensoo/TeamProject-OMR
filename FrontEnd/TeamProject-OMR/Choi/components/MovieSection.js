import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import MovieCard from './card/MovieCard';

export default function MovieSection({
    title, onPressAll, data, activeCard, onToggle, renderRankBadge
}) {
    return (
        <View style={styles.sectionContainer}>
            <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
                <TouchableOpacity onPress={onPressAll}>
                    <Text style={styles.allBtn}>전체보기</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <View style={{ marginRight: 10, position: 'relative' }}>
                        {renderRankBadge && renderRankBadge(index + 1)}
                        <MovieCard
                            rank={index + 1}
                            image={item.poster_path}
                            title={item.title}
                            isActive={activeCard === item.id}
                            onToggle={() => onToggle(item.id)}
                            // ... 등등
                        />
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    sectionContainer: { marginBottom: 32, paddingLeft: 10 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, marginRight: 20 },
    title: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
    allBtn: { fontSize: 14, color: '#ffd700', fontWeight: 'bold' },
});
