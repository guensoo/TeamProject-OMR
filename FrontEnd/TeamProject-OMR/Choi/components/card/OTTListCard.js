import { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import MovieCard from './MovieCard';

function OTTListCard({
  rank,
  image,
  title,
  isActive, // 추가
  onReviewPress,
  onDetailPress,
  onToggle, // 클릭 이벤트를 여기서 처리하고 싶으면
}) {
  return (
    <View style={styles.cardWrapper}>
      <MovieCard
        rank={rank}
        image={image}
        title={title}
        isActive={isActive}      // MovieCard로도 넘겨주기(애니메이션/확장)
        onReviewPress={onReviewPress}
        onDetailPress={onDetailPress}
        onToggle={onToggle}      // 혹시 MovieCard 클릭 처리까지 원하면
      />
    </View>
  );
}

// ✅ props가 바뀌지 않으면 리렌더링 안 하도록 memo 적용
export default memo(OTTListCard);

const styles = StyleSheet.create({
  cardWrapper: { flex: 1, alignItems: 'center', marginBottom: 10 },
});
