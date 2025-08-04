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
export async function updateReview(reviewId, updatedReview) {
    try {
        const res = await fetch(`${REVIEW_URL}/${reviewId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedReview)   // 수정할 값들을 body로 전달!
        });
        if (!res.ok) throw new Error('리뷰 수정 실패');
        return await res.json();
    } catch (error) {
        console.error('[updateReview]', error);
        throw error;
    }
}

// 5. 리뷰 삭제 (DELETE /api/review/{id})
export async function deleteReview(reviewId) {
    try {
        const res = await fetch(`${REVIEW_URL}/${reviewId}`, {
            method: 'DELETE',
            headers: {
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

// 댓글 목록 조회
export async function getComments(reviewId) {
    const res = await fetch(`${REVIEW_URL}/${reviewId}/comments`);
    if (!res.ok) throw new Error("댓글 불러오기 실패");
    return await res.json();
}

// 댓글 등록
export async function postComment(reviewId, text, writer) {
    const res = await fetch(`${REVIEW_URL}/${reviewId}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            reviewId,
            text,
            writer,
        }),
    });
    if (!res.ok) throw new Error("댓글 등록 실패");
    return await res.json();
}

// 6. 리뷰 좋아요 등록 (POST /api/review/{reviewId}/like/{userId})
export async function postReviewLike(reviewId, userId) {
    const res = await fetch(`${REVIEW_URL}/${reviewId}/like/${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!res.ok) throw new Error("리뷰 좋아요 등록 실패");
    return await res.json();
}

// 7. 리뷰 좋아요 취소 (DELETE /api/review/{reviewId}/like/{userId})
export async function deleteReviewLike(reviewId, userId) {
    const res = await fetch(`${REVIEW_URL}/${reviewId}/like/${userId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    if (!res.ok) throw new Error("리뷰 좋아요 취소 실패");
    return true;
}

// 8. 리뷰 좋아요 여부 조회 (GET /api/review/{reviewId}/like/{userId})
export async function getReviewLikeStatus(reviewId, userId) {
    const res = await fetch(`${REVIEW_URL}/${reviewId}/like/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    if (!res.ok) throw new Error("리뷰 좋아요 상태 조회 실패");
    const data = await res.json(); // { liked: true }
    return data;
}
