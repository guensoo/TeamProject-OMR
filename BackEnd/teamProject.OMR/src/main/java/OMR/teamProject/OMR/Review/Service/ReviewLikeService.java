package OMR.teamProject.OMR.Review.Service;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import OMR.teamProject.OMR.Review.Entity.ReviewLikeLog;
import OMR.teamProject.OMR.Review.Repository.ReviewLikeLogRepository;
import OMR.teamProject.OMR.Review.Repository.ReviewRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class ReviewLikeService {

    private final ReviewLikeLogRepository likeLogRepository;
    private final ReviewRepository reviewRepository;

    // 좋아요 등록
    public boolean likeReview(Long reviewId, String userId) {
        if (likeLogRepository.existsByReviewIdAndUserId(reviewId, userId)) {
            // 이미 좋아요 누른 상태면 false 반환(중복 방지)
            return false;
        }
        ReviewLikeLog likeLog = ReviewLikeLog.builder()
                .reviewId(reviewId)
                .userId(userId)
                .build();
        likeLogRepository.save(likeLog);

        // 좋아요 수 증가
        reviewRepository.findById(reviewId).ifPresent(review -> {
            review.setLiked((review.getLiked() == null ? 0 : review.getLiked()) + 1);
            reviewRepository.save(review);
        });
        return true;
    }

    // 좋아요 취소
    public boolean unlikeReview(Long reviewId, String userId) {
        Optional<ReviewLikeLog> likeLogOpt = likeLogRepository.findByReviewIdAndUserId(reviewId, userId);
        if (likeLogOpt.isEmpty()) {
            return false;
        }
        likeLogRepository.delete(likeLogOpt.get());

        // 좋아요 수 감소
        reviewRepository.findById(reviewId).ifPresent(review -> {
            int likedCount = review.getLiked() == null ? 0 : review.getLiked();
            review.setLiked(likedCount > 0 ? likedCount - 1 : 0);
            reviewRepository.save(review);
        });
        return true;
    }

    // 사용자가 해당 리뷰에 좋아요 눌렀는지 체크
    @Transactional(readOnly = true)
    public boolean isLikedByUser(Long reviewId, String userId) {
        return likeLogRepository.existsByReviewIdAndUserId(reviewId, userId);
    }
}