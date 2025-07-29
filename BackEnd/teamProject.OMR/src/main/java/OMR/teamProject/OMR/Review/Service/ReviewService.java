package OMR.teamProject.OMR.Review.Service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import OMR.teamProject.OMR.Review.DTO.ReviewRequestDto;
import OMR.teamProject.OMR.Review.DTO.ReviewResponseDto;
import OMR.teamProject.OMR.Review.Entity.ReviewEntity;
import OMR.teamProject.OMR.Review.Repository.ReviewRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReviewService {
    private final ReviewRepository reviewRepository;

    public ReviewResponseDto create(ReviewRequestDto dto) {
        ReviewEntity review = ReviewEntity.builder()
            .title(dto.getTitle())
            .content(dto.getContent())
            .userId(dto.getUserId())
            .movieId(dto.getMovieId())
            .rating(dto.getRating())
            .createdAt(LocalDateTime.now())
            .build();
        reviewRepository.save(review);
        return toDto(review);
    }

    private ReviewResponseDto toDto(ReviewEntity review) {
        ReviewResponseDto dto = new ReviewResponseDto();
        dto.setId(review.getId());
        dto.setTitle(review.getTitle());
        dto.setContent(review.getContent());
        dto.setUserId(review.getUserId());
        dto.setMovieId(review.getMovieId());
        dto.setRating(review.getRating());
        dto.setCreatedAt(review.getCreatedAt());
        return dto;
    }
}
