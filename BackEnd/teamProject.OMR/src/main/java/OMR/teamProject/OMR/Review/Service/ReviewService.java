package OMR.teamProject.OMR.Review.Service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.ObjectMapper;

import OMR.teamProject.OMR.Review.DTO.ReviewRequestDto;
import OMR.teamProject.OMR.Review.DTO.ReviewResponseDto;
import OMR.teamProject.OMR.Review.DTO.SelectedMovieDto;
import OMR.teamProject.OMR.Review.Entity.ReviewEntity;
import OMR.teamProject.OMR.Review.Repository.ReviewRepository;
import OMR.teamProject.OMR.User.DTO.UserResponseDto;
import OMR.teamProject.OMR.User.Entity.UserEntity;
import OMR.teamProject.OMR.User.Repository.UserRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final ObjectMapper objectMapper; // Jackson

    @Transactional
    public ReviewResponseDto create(ReviewRequestDto dto) {
        // 1. UserEntity 조회
        UserEntity user = userRepository.findById(dto.getUserId())
            .orElseThrow(() -> new RuntimeException("User not found"));

        // 2. selectMovie를 JSON String으로 변환
        String selectMovieJson = null;
        if (dto.getSelectMovie() != null) {
            try {
                selectMovieJson = objectMapper.writeValueAsString(dto.getSelectMovie());
            } catch (Exception e) {
                throw new RuntimeException("영화 정보 변환 실패", e);
            }
        }

        // 3. DTO -> Entity 변환
        ReviewEntity review = ReviewEntity.builder()
                .title(dto.getTitle())
                .content(dto.getContent())
                .rating(dto.getRating())
                .movieId(dto.getMovieId())
                .selectMovie(selectMovieJson)
                .createAt(LocalDateTime.now())
                .updateAt(LocalDateTime.now())
                .isUpdate(false)
                .views(0)
                .liked(0)
                .commentCount(0)
                .user(user)
                .build();

        // 4. DB 저장
        ReviewEntity saved = reviewRepository.save(review);

        // 5. Entity -> Response DTO 변환
        return toDto(saved);
    }

    private ReviewResponseDto toDto(ReviewEntity review) {
        ReviewResponseDto dto = new ReviewResponseDto();
        dto.setReviewId(review.getReviewId());
        dto.setTitle(review.getTitle());
        dto.setContent(review.getContent());
        dto.setMovieId(review.getMovieId());
        dto.setRating(review.getRating());

        // user 정보 DTO로 변환
        if (review.getUser() != null) {
            UserEntity user = review.getUser();
            UserResponseDto userDto = new UserResponseDto();
            userDto.setId(user.getId());
            userDto.setUsername(user.getUsername());
            userDto.setNickname(user.getNickname());
            userDto.setEmail(user.getEmail());
            userDto.setRole(user.getRole());
            dto.setUserData(userDto);
        }

        // selectMovie 정보 복원(필요하면)
        if (review.getSelectMovie() != null) {
            try {
                SelectedMovieDto movieDto = objectMapper.readValue(
                    review.getSelectMovie(), SelectedMovieDto.class);
                dto.setSelectMovie(movieDto);
            } catch (Exception e) {
                dto.setSelectMovie(null);
            }
        }

        dto.setCreatedAt(review.getCreateAt() != null ? review.getCreateAt().toString() : null);
        dto.setUpdateAt(review.getUpdateAt() != null ? review.getUpdateAt().toString() : null);
        dto.setIsUpdate(review.getIsUpdate());
        dto.setViews(review.getViews());
        dto.setLiked(review.getLiked());
        dto.setCommentCount(review.getCommentCount());

        return dto;
    }
}
