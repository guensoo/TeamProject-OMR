import axios from 'axios';

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
};
