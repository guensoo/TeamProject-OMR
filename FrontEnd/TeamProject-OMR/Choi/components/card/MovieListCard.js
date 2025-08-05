import { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import MovieCard from './MovieCard';

function MovieListCard({
  rank,
  image,
  title,
  isActive,
  onReviewPress,
  onDetailPress,
  onToggle,
}) {
  return (
    <View style={styles.cardWrapper}>
      <MovieCard
        rank={rank}
        image={image}
        title={title}
        isActive={isActive}
        onReviewPress={onReviewPress}
        onDetailPress={onDetailPress}
        onToggle={onToggle}
      />
    </View>
  );
}

export default memo(MovieListCard);

const styles = StyleSheet.create({
  cardWrapper: { flex: 1, alignItems: 'center', marginBottom: 10 },
});
