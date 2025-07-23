import { useEffect, useState } from 'react';
import { ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import OTTSection from '../components/OTTSection';
import { getAllOTTPopular } from '../api/tmdb';

export default function OTTScreen() {
  const [loading, setLoading] = useState(true);
  const [ottData, setOttData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllOTTPopular();
      setOttData(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#000" style={{ marginTop: 50 }} />;

  return (
    <ScrollView style={styles.container}>
      <OTTSection title="넷플릭스 인기 순" data={ottData.netflix} />
      <OTTSection title="디즈니+ 인기 순" data={ottData.disney} />
      <OTTSection title="쿠팡플레이 인기 순" data={ottData.coupang} />
      <OTTSection title="웨이브 인기 순" data={ottData.wavve} />
      <OTTSection title="왓챠 인기 순" data={ottData.watcha} />
      <OTTSection title="Apple TV 인기 순" data={ottData.appletv} />
      <OTTSection title="Prime Video 인기 순" data={ottData.prime} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 10 },
});
