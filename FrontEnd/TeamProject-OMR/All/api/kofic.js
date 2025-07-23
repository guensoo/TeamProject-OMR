import axios from 'axios';

const KOFIC_KEY = 'ddffa88cc27b9e0d42017d1df6153a29';
const TMDB_KEY = '46ae6607955da617463546b9cd029255';
const KOFIC_BASE_URL = 'http://www.kobis.or.kr/kobisopenapi/webservice/rest';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

const cleanTitle = (title) => title.replace(/\s+/g, ' ').trim(); // 띄어쓰기 정규화

// ✅ "일간/주간" 선택형, 필터 파라미터 수용, TMDB 연동까지!
export const getBoxOfficeWithPosters = async (
    date,
    {
        type = 'daily', // 'daily', 'weekly'
        weekGb = '0',   // (주간 only) 0:주간, 1:주말, 2:주중
        multiMovieYn,   // "Y": 다양성(독립), "N": 상업, undefined: 전체
        repNationCd,    // "K": 한국, "F": 외국, undefined: 전체
    } = {}
) => {
    try {
        // 1. 요청 API URL/파라미터
        let url;
        let params = { key: KOFIC_KEY, targetDt: date };
        if (type === 'weekly') {
            url = `${KOFIC_BASE_URL}/boxoffice/searchWeeklyBoxOfficeList.json`;
            params.weekGb = weekGb;
        } else {
            url = `${KOFIC_BASE_URL}/boxoffice/searchDailyBoxOfficeList.json`;
        }
        if (multiMovieYn) params.multiMovieYn = multiMovieYn;
        if (repNationCd) params.repNationCd = repNationCd;

        // 2. 박스오피스 데이터 조회
        const res = await axios.get(url, { params });
        const boxOfficeList =
            (type === 'weekly'
                ? res.data.boxOfficeResult.weeklyBoxOfficeList
                : res.data.boxOfficeResult.dailyBoxOfficeList) || [];

        // 3. TMDB 포스터 매칭
        const results = await Promise.all(
            boxOfficeList.map(async (item) => {
                try {
                    const year = item.openDt ? item.openDt.split('-')[0] : '';
                    const query = cleanTitle(item.movieNm);

                    // ✅ 1차: 한국어 제목
                    let tmdbRes = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
                        params: {
                            api_key: TMDB_KEY,
                            language: 'ko-KR',
                            query: query,
                            year: year,
                        },
                    });

                    // ✅ 2차: 다국어 fallback
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
        console.error('kofic API Error:', err.message);
        return [];
    }
};
