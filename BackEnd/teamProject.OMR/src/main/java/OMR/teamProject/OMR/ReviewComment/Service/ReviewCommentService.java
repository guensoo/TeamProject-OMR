package OMR.teamProject.OMR.ReviewComment.Service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import OMR.teamProject.OMR.ReviewComment.DTO.ReviewCommentRequestDto;
import OMR.teamProject.OMR.ReviewComment.DTO.ReviewCommentResponseDto;
import OMR.teamProject.OMR.ReviewComment.Entity.ReviewCommentEntity;
import OMR.teamProject.OMR.ReviewComment.Repository.ReviewCommentRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReviewCommentService {
    private final ReviewCommentRepository reviewCommentRepository;

    public ReviewCommentResponseDto create(ReviewCommentRequestDto dto) {
    	ReviewCommentEntity comment = ReviewCommentEntity.builder()
            .reviewId(dto.getReviewId())
            .userId(dto.getUserId())
            .content(dto.getContent())
            .createdAt(LocalDateTime.now())
            .build();
        reviewCommentRepository.save(comment);
        return toDto(comment);
    }

    private ReviewCommentResponseDto toDto(ReviewCommentEntity comment) {
        ReviewCommentResponseDto dto = new ReviewCommentResponseDto();
        dto.setId(comment.getId());
        dto.setReviewId(comment.getReviewId());
        dto.setUserId(comment.getUserId());
        dto.setContent(comment.getContent());
        dto.setCreatedAt(comment.getCreatedAt());
        return dto;
    }
}
