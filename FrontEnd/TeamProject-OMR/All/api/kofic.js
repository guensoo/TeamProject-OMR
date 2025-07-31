import axios from 'axios';
import { getMovieTrailer } from './tmdb';

const KOFIC_KEY = 'ddffa88cc27b9e0d42017d1df6153a29';
const TMDB_KEY = '46ae6607955da617463546b9cd029255';
const KOFIC_BASE_URL = 'http://www.kobis.or.kr/kobisopenapi/webservice/rest';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

const cleanTitle = (title) => title.replace(/\s+/g, ' ').trim();

// ⭐ TMDB 연령가(등급) fetch
async function getMovieCertification(tmdbId) {
    if (!tmdbId) return null;
    try {
        const res = await axios.get(`${TMDB_BASE_URL}/movie/${tmdbId}/release_dates`, {
            params: { api_key: TMDB_KEY },
        });
        // 한국 등급(KR) 우선
        const kr = res.data.results.find(r => r.iso_3166_1 === 'KR');
        if (kr && kr.release_dates.length > 0) {
            // certification(등급)이 공란일 수도 있음
            const cert = kr.release_dates[0].certification;
            return cert || null;
        }
        // 없으면 null
        return null;
    } catch {
        return null;
    }
}

// ✅ "일간/주간" + TMDB 포스터 + 등급 + 예고편 + TMDB ID까지!
export const getBoxOfficeWithPostersAndTrailer = async (
    date,
    {
        type = 'daily', // 'daily' | 'weekly'
        weekGb = '0',   // (주간 only) 0:주간, 1:주말, 2:주중
        multiMovieYn,   // "Y": 다양성(독립), "N": 상업, undefined: 전체
        repNationCd,    // "K": 한국, "F": 외국, undefined: 전체
    } = {}
) => {
    try {
        // 1. KOFIC API URL 및 파라미터 설정
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

        // 2. KOFIC 박스오피스 데이터 요청
        const res = await axios.get(url, { params });

        // 3. 박스오피스 리스트 선택
        const boxOfficeList =
            (type === 'weekly'
                ? res.data.boxOfficeResult.weeklyBoxOfficeList
                : res.data.boxOfficeResult.dailyBoxOfficeList) || [];

        // 4. TMDB 매핑
        const results = await Promise.all(
            boxOfficeList.map(async (item) => {
                try {
                    const year = item.openDt ? item.openDt.split('-')[0] : '';
                    const query = cleanTitle(item.movieNm);

                    // 1차: 한국어 제목
                    let tmdbRes = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
                        params: {
                            api_key: TMDB_KEY,
                            language: 'ko-KR',
                            query: query,
                            year: year,
                        },
                    });
                    // 2차: 다국어 fallback
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

                    // ⭐ 등급(연령가) 정보 가져오기
                    let certification = null;
                    if (matched?.id) {
                        certification = await getMovieCertification(matched.id);
                    }

                    // 예고편(유튜브 key)
                    const trailerKey = matched ? await getMovieTrailer(matched.id) : null;

                    return {
                        id: item.movieCd,
                        title: item.movieNm,
                        poster_path: poster,
                        rank: item.rank,
                        trailerKey,
                        tmdbId: matched?.id || null,
                        openDt: item.openDt,
                        certification, // ⭐ 추가
                    };
                } catch (error) {
                    return {
                        id: item.movieCd,
                        title: item.movieNm,
                        poster_path: 'https://via.placeholder.com/120x180?text=No+Image',
                        rank: item.rank,
                        trailerKey: null,
                        tmdbId: null,
                        openDt: item.openDt,
                        certification: null,
                    };
                }
            })
        );

        return results;
    } catch (error) {
        console.error('KOFIC API Error: ', error.message);
        return [];
    }
};
