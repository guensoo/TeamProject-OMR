import axios from 'axios';

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
};
