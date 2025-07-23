import axios from 'axios';

const API_KEY = '46ae6607955da617463546b9cd029255'; // TMDB API 키 입력
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

//예고편 유튜브 key 가져오기
export const getMovieTrailer = async (movieId) => {
    try {
        const res = await axios.get(`${BASE_URL}/movie/${movieId}/videos`, {
            params: {
                api_key: API_KEY,
                language: 'ko-KR',
            }
        })

        const koreanTrailer = res.data.results.find(
            video => video.site === 'YouTube' && video.type === 'Trailer' && video.iso_639_1 === 'ko'
        );
        if (koreanTrailer) {
            return koreanTrailer.key;
        }

        const trailer = res.data.results.find((video) => video.site === 'YouTube' && video.type === 'Trailer')

        return trailer ? trailer.key : null;
    } catch (error) {
        console.error(`예고편 가져오기 실패: ${movieId}`, error.message);
        return null;
    }
}

//getOTTPopular를 이용하여 인기작 + 예고편 key 함께 가져오기
export const getMoviePopularWithTrailer = async (providerId) => {
    try {
        const movies = await getOTTPopular(providerId);
        const limitOtt = movies.slice(0, 8);

        const results = [];

        for (const movie of limitOtt) {
            const trailerKey = await getMovieTrailer(movie.id)

            if (trailerKey) {
                results.push({
                    id: movie.id,
                    title: movie.title,
                    overview: movie.overview,
                    poster_path: movie.poster_path,
                    backdrop_path: movie.backdrop_path,
                    trailerKey: trailerKey,
                })
            }
        }

        return results;
    } catch (error) {
        console.error('getOTTPopularWithTrailer 실패:', error.message);
        return [];
    }
}

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