<<<<<<< HEAD
import { useEffect, useState } from 'react';
import { ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import FilterButton from './component/FilterButton';
import OTTSection from './component/OTTSection';
import { getTrendingWithProviders } from '../공통/api/tmdb';

const ottList = ['전체', '넷플릭스', '디즈니', '쿠팡플레이'];

export default function OTTScreen() {
    const [loading, setLoading] = useState(true);
    const [selectedOTT, setSelectedOTT] = useState('전체');
    const [netflixData, setNetflixData] = useState([]);
    const [disneyData, setDisneyData] = useState([]);
    const [coupangData, setCoupangData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
        const { netflix, disney, coupang } = await getTrendingWithProviders();
        setNetflixData(netflix);
        setDisneyData(disney);
        setCoupangData(coupang);
        setLoading(false);
        };
        fetchData();
    }, []);

    if (loading) return <ActivityIndicator size="large" color="#000" style={{ marginTop: 50 }} />;

    return (
        <ScrollView style={styles.container}>
        {/* 필터 버튼 */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
            {ottList.map((ott) => (
            <FilterButton
                key={ott}
                label={ott}
                selected={selectedOTT === ott}
                onPress={() => setSelectedOTT(ott)}
            />
            ))}
        </ScrollView>

        {/* 섹션별 인기순 */}
        {(selectedOTT === '전체' || selectedOTT === '넷플릭스') && (
            <OTTSection title="넷플릭스 인기 순" data={netflixData} />
        )}
        {(selectedOTT === '전체' || selectedOTT === '디즈니') && (
            <OTTSection title="디즈니 인기 순" data={disneyData} />
        )}
        {(selectedOTT === '전체' || selectedOTT === '쿠팡플레이') && (
            <OTTSection title="쿠팡플레이 인기 순" data={coupangData} />
        )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', padding: 10 },
    filterContainer: { marginBottom: 15 },
=======
import React, { useEffect, useState } from 'react';
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
>>>>>>> 23bc1e739ec2db711514254c070b024c0f0dd21f
});
