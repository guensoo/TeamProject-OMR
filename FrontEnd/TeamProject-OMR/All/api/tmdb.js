import axios from 'axios';

const API_KEY = '46ae6607955da617463546b9cd029255'; // TMDB API 키 입력
const BASE_URL = 'https://api.themoviedb.org/3';
const REGION = 'KR';

// OTT별 provider_id 매핑
export const OTT_PROVIDERS = {
    netflix: 8,
    disney: 337,
    coupang: 356,
    wavve: 96,
    watcha: 97,
    prime: 119,
};

export const getOTTPopular = async (
    providerId,
    page = 1,
    sortBy = 'popularity.desc'
) => {
    const res = await axios.get(`${BASE_URL}/discover/movie`, {
        params: {
            api_key: API_KEY,
            language: 'ko-KR',
            sort_by: sortBy,
            watch_region: REGION,
            with_watch_providers: providerId,
            page: page,
        },
    });
    return res.data.results.slice(0, 20); // ✅ 무조건 10개만
};

// 모든 OTT 인기작 한 번에 가져오기
// export const getAllOTTPopular = async () => {
//     const results = {};
//     for (const [key, providerId] of Object.entries(OTT_PROVIDERS)) {
//         try {
//             const data = await getOTTPopular(providerId);
//             results[key] = data;
//         } catch (err) {
//             console.error(`Error fetching ${key}:`, err.message);
//             results[key] = [];
//         }
//     }
//     return results;
// };

//예고편 유튜브 key 가져오기
export const getMovieTrailer = async (movieId) => {
    try {
        const res = await axios.get(`${BASE_URL}/movie/${movieId}/videos`, {
            params: {
                api_key: API_KEY,
            }
        })

        const trailer = res.data.results.find((video) => video.site === 'YouTube' && video.type === 'Trailer')

        return trailer ? trailer.key : null;
    } catch (error) {
        console.error(`예고편 가져오기 실패: ${movieId}`, error.message);
        return null;
    }
}

// 10개만 가져오기
export const getAllOTTPopular = async () => {
    try {
        const entries = Object.entries(OTT_PROVIDERS);

        const responses = await Promise.all(
            entries.map(async ([key, providerId]) => {
                try {
                    const data = await getOTTPopular(providerId);
                    return [key, data.slice(0, 10)]; // ✅ 상위 10개만 반환
                } catch (err) {
                    console.error(`Error fetching ${key}:`, err.message);
                    return [key, []];
                }
            })
        );

        return Object.fromEntries(responses);
    } catch (err) {
        console.error("Error fetching all OTT popular data:", err.message);
        return {};
    }
};

//getOTTPopular를 이용하여 모든 OTT 인기작 + 예고편 key 함께 가져오기
export const getAllOTTPopularWithTrailer = async () => {
    const results = {};

    for (const [key, providerId] of Object.entries(OTT_PROVIDERS)) {
        try {
            // OTT별 인기작 가져오기
            const movies = await getOTTPopular(providerId);
            const limitOtt = movies.slice(0, 8);

            const movieList = [];

            for (const movie of limitOtt) {
                const trailerKey = await getMovieTrailer(movie.id);
                if (trailerKey) {
                    movieList.push({
                        id: movie.id,
                        title: movie.title,
                        overview: movie.overview,
                        poster_path: movie.poster_path,
                        backdrop_path: movie.backdrop_path,
                        trailerKey: trailerKey,
                        provider: key,
                    });
                }
            }

            results[key] = movieList;
        } catch (error) {
            console.error(`getOTTPopularWithTrailer 실패 (${key}):`, error.message);
            results[key] = [];
        }
    }

    return results;
};
