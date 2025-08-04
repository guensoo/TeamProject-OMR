import { API } from './API';  // 환경별 API 주소
const REVIEW_URL = `${API}/api/review`;

// 1. 리뷰 목록 조회 (GET /api/review)
export async function fetchReviews() {
    const res = await fetch(REVIEW_URL);
    if (!res.ok) throw new Error('리뷰 목록 불러오기 실패');
    return await res.json();
}

// 2. 리뷰 상세 조회 (GET /api/review/{id})
export async function fetchReviewById(reviewId) {
    const res = await fetch(`${REVIEW_URL}/${reviewId}`);
    if (!res.ok) throw new Error('리뷰 상세 불러오기 실패');
    return await res.json();
}

// 3. 리뷰 등록 (POST /api/review)
export async function createReview(data) {
    const res = await fetch(REVIEW_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('리뷰 등록 실패');
    return await res.json();
}

// 4. 리뷰 수정 (PUT /api/review/{id})
export async function updateReview(reviewId, updatedReview) {
    const res = await fetch(`${REVIEW_URL}/${reviewId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedReview)
    });
    if (!res.ok) throw new Error('리뷰 수정 실패');
    return await res.json();
}

// 5. 리뷰 삭제 (DELETE /api/review/{id})
export async function deleteReview(reviewId) {
    const res = await fetch(`${REVIEW_URL}/${reviewId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    });
    if (!res.ok) throw new Error('리뷰 삭제 실패');
    return true;
}

// 6. 댓글 목록 조회 (GET /api/review/{reviewId}/comments)
export async function getComments(reviewId) {
    const res = await fetch(`${REVIEW_URL}/${reviewId}/comments`);
    if (!res.ok) throw new Error("댓글 불러오기 실패");
    return await res.json();
}

// 7. 댓글 등록 (POST /api/review/{reviewId}/comments)
export async function postComment(reviewId, text, writer) {
    const res = await fetch(`${REVIEW_URL}/${reviewId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, writer })
    });
    if (!res.ok) throw new Error("댓글 등록 실패");
    return await res.json();
}

// 8. 댓글 삭제 (DELETE /api/review/{reviewId}/comments/{commentId})
export async function deleteComment(reviewId, commentId) {
    const res = await fetch(`${REVIEW_URL}/${reviewId}/comments/${commentId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    });
    if (!res.ok) throw new Error("댓글 삭제 실패");
    return true;
}
// 6. 리뷰 좋아요 등록 (POST /api/review/like/{reviewId}/{userId})
export async function postReviewLike(reviewId, userId) {
    const res = await fetch(`${REVIEW_URL}/like/${reviewId}/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
    });
    if (!res.ok) throw new Error("리뷰 좋아요 등록 실패");
    return await res.text();  // json() 대신 text()로 변경
}

// 7. 리뷰 좋아요 취소 (DELETE /api/review/like/{reviewId}/{userId})
export async function deleteReviewLike(reviewId, userId) {
    const res = await fetch(`${REVIEW_URL}/like/${reviewId}/${userId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    });
    if (!res.ok) throw new Error("리뷰 좋아요 취소 실패");
    return true;
}

// 8. 리뷰 좋아요 여부 조회 (GET /api/review/like/{reviewId}/{userId})
export async function getReviewLikeStatus(reviewId, userId) {
    const res = await fetch(`${REVIEW_URL}/like/${reviewId}/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    if (!res.ok) throw new Error("리뷰 좋아요 상태 조회 실패");
    const data = await res.json(); // { liked: true }
    return data;
}
