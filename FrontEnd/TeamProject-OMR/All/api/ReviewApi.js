import { API } from './API';

const REVIEW_URL = `${API}/api/review`;

// 1. 리뷰 목록 조회 (GET /api/review)
export async function fetchReviews() {
    try {
        const res = await fetch(REVIEW_URL, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        if (!res.ok) throw new Error('리뷰 목록 불러오기 실패');
        return await res.json();
    } catch (error) {
        console.error('[fetchReviews]', error);
        throw error;
    }
}

// 2. 리뷰 상세 조회 (GET /api/review/{id})
export async function fetchReviewById(reviewId) {
    try {
        const res = await fetch(`${REVIEW_URL}/${reviewId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        if (!res.ok) throw new Error('리뷰 상세 불러오기 실패');
        return await res.json();
    } catch (error) {
        console.error('[fetchReviewById]', error);
        throw error;
    }
}

// 3. 리뷰 등록(생성) (POST /api/review)
export async function createReview(data) {
    try {
        const res = await fetch(REVIEW_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error('리뷰 등록 실패');
        return await res.json();
    } catch (error) {
        console.error('[createReview]', error);
        throw error;
    }
}

// 4. 리뷰 수정 (PUT /api/review/{id})
export async function updateReview(reviewId, data) {
    try {
        const res = await fetch(`${REVIEW_URL}/${reviewId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error('리뷰 수정 실패');
        return await res.json();
    } catch (error) {
        console.error('[updateReview]', error);
        throw error;
    }
}

// 5. 리뷰 삭제 (DELETE /api/review/{id})
export async function deleteReview(reviewId, token) {
    try {
        const res = await fetch(`${REVIEW_URL}/${reviewId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (!res.ok) throw new Error('리뷰 삭제 실패');
        return true;
    } catch (error) {
        console.error('[deleteReview]', error);
        throw error;
    }
}