package OMR.teamProject.OMR.Review.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import OMR.teamProject.OMR.Review.Entity.ReviewLikeLog;

public interface ReviewLikeLogRepository extends JpaRepository<ReviewLikeLog, Long> {

    Optional<ReviewLikeLog> findByReviewIdAndUserId(Long reviewId, String userId);

    boolean existsByReviewIdAndUserId(Long reviewId, String userId);

    void deleteByReviewIdAndUserId(Long reviewId, String userId);
}