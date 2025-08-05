package OMR.teamProject.OMR.ReviewComment.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import OMR.teamProject.OMR.ReviewComment.Entity.ReviewCommentEntity;

public interface ReviewCommentRepository extends JpaRepository<ReviewCommentEntity, Long> {
    List<ReviewCommentEntity> findByReviewId(Long reviewId);
}
