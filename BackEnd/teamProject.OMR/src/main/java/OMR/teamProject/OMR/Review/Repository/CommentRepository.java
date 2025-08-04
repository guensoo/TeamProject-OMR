package OMR.teamProject.OMR.Review.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import OMR.teamProject.OMR.Review.Entity.CommentEntity;

public interface CommentRepository extends JpaRepository<CommentEntity, Long> {
    List<CommentEntity> findByReview_ReviewId(Long reviewId);
}
