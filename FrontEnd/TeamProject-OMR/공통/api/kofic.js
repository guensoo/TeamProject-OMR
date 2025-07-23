import axios from 'axios';

const KOFIC_KEY = 'ddffa88cc27b9e0d42017d1df6153a29';
const TMDB_KEY = '46ae6607955da617463546b9cd029255';
const KOFIC_BASE_URL = 'http://www.kobis.or.kr/kobisopenapi/webservice/rest';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

const cleanTitle = (title) => title.replace(/\s+/g, ' ').trim(); // 띄어쓰기 정규화

export const getBoxOfficeWithPosters = async (date) => {
  try {
    const res = await axios.get(`${KOFIC_BASE_URL}/boxoffice/searchDailyBoxOfficeList.json`, {
      params: { key: KOFIC_KEY, targetDt: date },
    });
    const list = res.data.boxOfficeResult.dailyBoxOfficeList || [];

    const results = await Promise.all(
      list.map(async (item) => {
        try {
          const year = item.openDt ? item.openDt.split('-')[0] : '';
          const query = cleanTitle(item.movieNm);

          // ✅ 1차: 한국어 제목 검색
          let tmdbRes = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
            params: {
              api_key: TMDB_KEY,
              language: 'ko-KR',
              query: query,
              year: year,
            },
          });

          // ✅ 2차: 한국어 실패 시, 다국어 검색으로 fallback
          if (!tmdbRes.data.results.length) {
            tmdbRes = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
              params: {
                api_key: TMDB_KEY,
                query: query,
                year: year,
              },
            });
          }

          const matched = tmdbRes.data.results[0];
          const poster = matched?.poster_path
            ? `https://image.tmdb.org/t/p/w500${matched.poster_path}`
            : 'https://via.placeholder.com/120x180?text=No+Image';

          return {
            id: item.movieCd,
            title: item.movieNm,
            poster_path: poster,
            rank: item.rank,
          };
        } catch {
          return {
            id: item.movieCd,
            title: item.movieNm,
            poster_path: 'https://via.placeholder.com/120x180?text=No+Image',
            rank: item.rank,
          };
        }
      })
    );

    return results;
  } catch (err) {
    console.error('KOFIC API Error:', err.message);
    return [];
  }
};
