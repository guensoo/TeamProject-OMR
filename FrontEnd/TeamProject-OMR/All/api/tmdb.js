import axios from 'axios';

const API_KEY = '46ae6607955da617463546b9cd029255'; // TMDB API 키 입력
const BASE_URL = 'https://api.themoviedb.org/3';
const REGION = 'KR';

// OTT별 provider_id 매핑
export const OTT_PROVIDERS = {
    netflix: 8,
    disney: 337,
    wavve: 356,
    watcha: 97,
    prime: 119,
};

//영화 인기작 가져오기
export const getOTTPopularMovie = async (
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
            // with_original_language: 'ko',
            page: page,
        },
    });
    return res.data.results.slice(0, 20);
};

//TV프로그램 인기작 가져오기
export const getOTTPopularTV = async (
    providerId,
    page = 1,
    sortBy = 'popularity.desc'
) => {
    const res = await axios.get(`${BASE_URL}/discover/tv`, {
        params: {
            api_key: API_KEY,
            language: 'ko-KR',
            sort_by: sortBy,
            watch_region: REGION,
            with_watch_providers: providerId,
            // with_original_language: 'ko',
            page: page,
        },
    });
    return res.data.results.slice(0, 20);
};

// 영화 + TV프로그램 인기작 가져오기 ( 15개(수정가능) )
export const getAllOTTPopular = async () => {
    try {
        const entries = Object.entries(OTT_PROVIDERS);

        const responses = await Promise.all(
            entries.map(async ([key, providerId]) => {
                try {
                    const movies = await getOTTPopularMovie(providerId);
                    const tvs = await getOTTPopularTV(providerId);

                    const combined = [...movies.slice(0, 5), ...tvs.slice(0, 5)]
                        .map(item => ({ ...item, title: item.title || item.name, provider: key, }))

                    return [key, combined];
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

//getOTTPopularMovie를 이용하여 모든 OTT 인기작 + 예고편 key 함께 가져오기
export const getAllOTTPopularWithTrailer = async () => {
    const results = {};

    for (const [key, providerId] of Object.entries(OTT_PROVIDERS)) {
        try {
            // OTT별 인기작 가져오기
            const movies = await getOTTPopularMovie(providerId);
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

// 전세계
export const getAllPopularGlobal = async (count = 20, type = 'all') => {
    try {
        // 인기 영화
        const resMovie = await axios.get(`${BASE_URL}/movie/popular`, {
            params: {
                api_key: API_KEY,
                language: 'ko-KR',
                page: 1,
            },
        });
        const movies = resMovie.data.results || [];

        // 인기 드라마(TV)
        const resTv = await axios.get(`${BASE_URL}/tv/popular`, {
            params: {
                api_key: API_KEY,
                language: 'ko-KR',
                page: 1,
            },
        });
        const tvs = resTv.data.results || [];

        let merged;
        if (type === 'movie') merged = movies;
        else if (type === 'tv') merged = tvs;
        else merged = [...movies, ...tvs].sort((a, b) => (b.popularity || 0) - (a.popularity || 0));

        return merged.slice(0, count);
    } catch (err) {
        console.error('Error fetching global popular movies/tv:', err.message);
        return [];
    }
};