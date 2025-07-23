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

