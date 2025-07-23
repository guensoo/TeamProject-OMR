import { useEffect, useState, useCallback } from 'react';
import { 
  View, 
  FlatList, 
  ActivityIndicator, 
  TouchableOpacity, 
  Text, 
  StyleSheet 
} from 'react-native';
import { getOTTPopular, OTT_PROVIDERS } from '../All/api/tmdb';
import OTTListCard from './components/card/OTTListCard';

export default function OTTListScreen({ route }) {
  const { providerKey } = route.params;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('popularity.desc');
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    fetchData(1, sortBy);
  }, [sortBy]);

  const fetchData = async (pageNum, sortOption) => {
    try {
      setLoading(true);
      const providerId = OTT_PROVIDERS[providerKey];
      const res = await getOTTPopular(providerId, pageNum, sortOption);

      if (!res || res.length === 0) {
        setIsEnd(true);
        return;
      }
      if (pageNum === 1) {
        setData(res);
      } else {
        setData((prev) => [...prev, ...res]);
      }
    } finally {
      setLoading(false);
    }
  };

  const loadMore = useCallback(() => {
    if (!loading && !isEnd) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchData(nextPage, sortBy);
    }
  }, [loading, page, sortBy, isEnd]);

  return (
    <View style={styles.container}>
      <View style={styles.sortContainer}>
        <TouchableOpacity onPress={() => setSortBy('popularity.desc')}>
          <Text style={[styles.sortButton, sortBy === 'popularity.desc' && styles.active]}>
            인기순
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSortBy('release_date.desc')}>
          <Text style={[styles.sortButton, sortBy === 'release_date.desc' && styles.active]}>
            최신순
          </Text>
        </TouchableOpacity>
      </View>

      {loading && page === 1 ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={data}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          renderItem={({ item, index }) => (
            <OTTListCard
              rank={index + 1}
              image={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              title={item.title || item.name}
              onReviewPress={() => console.log('리뷰', item.title)}
              onDetailPress={() => console.log('상세', item.title)}
            />
          )}
          ListFooterComponent={
            loading ? (
              <ActivityIndicator size="small" style={{ marginVertical: 10 }} />
            ) : null
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f23', padding: 10 },
  sortContainer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 10 },
  sortButton: { color: '#aaa', fontSize: 16, marginHorizontal: 10 },
  active: { color: '#fff', fontWeight: 'bold' },
});
