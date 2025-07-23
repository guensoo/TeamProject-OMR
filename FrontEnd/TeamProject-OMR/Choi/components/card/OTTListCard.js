import { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import MovieCard from './MovieCard';

function OTTListCard({ rank, image, title, onReviewPress, onDetailPress }) {
  return (
    <View style={styles.cardWrapper}>
      <MovieCard
        rank={rank}
        image={image}
        title={title}
        onReviewPress={onReviewPress}
        onDetailPress={onDetailPress}
      />
    </View>
  );
}

// ✅ props가 바뀌지 않으면 리렌더링 안 하도록 memo 적용
export default memo(OTTListCard);

const styles = StyleSheet.create({
  cardWrapper: { flex: 1, alignItems: 'center', marginBottom: 10 },
});
