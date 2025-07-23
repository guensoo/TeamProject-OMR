import axios from 'axios';

<<<<<<< HEAD
const API_KEY = '46ae6607955da617463546b9cd029255'; // 발급받은 TMDB API 키 입력
const BASE_URL = 'https://api.themoviedb.org/3';

// TMDB API에서 인기 콘텐츠 가져오기 + OTT별 분류
export const getTrendingWithProviders = async () => {
  try {
    const trendingRes = await axios.get(
      `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=ko-KR`
    );

    const results = trendingRes.data.results;
    const netflix = [];
    const disney = [];
    const coupang = [];

    for (const item of results) {
      try {
        const providersRes = await axios.get(
          `${BASE_URL}/${item.media_type}/${item.id}/watch/providers?api_key=${API_KEY}`
        );
        const providers = providersRes.data.results.KR?.flatrate || [];
        const providerNames = providers.map((p) => p.provider_name);

        if (providerNames.includes('Netflix')) netflix.push(item);
        if (providerNames.includes('Disney Plus')) disney.push(item);
        if (providerNames.includes('Coupang Play')) coupang.push(item);
      } catch (err) {
        console.log(`Provider Error (id: ${item.id}):`, err.message);
      }
    }

    return { netflix, disney, coupang };
  } catch (err) {
    console.error('TMDB API Error:', err.message);
    return { netflix: [], disney: [], coupang: [] };
  }
=======
const API_KEY = 'YOUR_API_KEY'; // TMDB API 키 입력
const BASE_URL = 'https://api.themoviedb.org/3';
const REGION = 'KR';

// OTT별 provider_id 매핑
const OTT_PROVIDERS = {
  netflix: 8,
  disney: 337,
  coupang: 356,
  wavve: 96,
  watcha: 97,
  appletv: 2,
  prime: 119,
};

// 특정 OTT 인기작 가져오기
export const getOTTPopular = async (providerId) => {
  const res = await axios.get(
    `${BASE_URL}/discover/movie`,
    {
      params: {
        api_key: API_KEY,
        language: 'ko-KR',
        sort_by: 'popularity.desc',
        watch_region: REGION,
        with_watch_providers: providerId,
      },
    }
  );
  return res.data.results;
};

// 모든 OTT 인기작 한 번에 가져오기
export const getAllOTTPopular = async () => {
  const results = {};
  for (const [key, providerId] of Object.entries(OTT_PROVIDERS)) {
    try {
      const data = await getOTTPopular(providerId);
      results[key] = data;
    } catch (err) {
      console.error(`Error fetching ${key}:`, err.message);
      results[key] = [];
    }
  }
  return results;
>>>>>>> 23bc1e739ec2db711514254c070b024c0f0dd21f
};
