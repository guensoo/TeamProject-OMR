package OMR.teamProject.OMR.Review.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

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
@Transactional
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final ObjectMapper objectMapper;

    // 전체 리뷰 목록 조회
    @Transactional(readOnly = true)
    public List<ReviewResponseDto> getAllReviews() {
        return reviewRepository.findAll().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    // 리뷰 등록
    public ReviewResponseDto reviewCreate(ReviewRequestDto dto) {
        UserEntity user = userRepository.findByUserId(dto.getUserData().getUserId())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));

        String selectMovieJson = serializeToJson(dto.getSelectMovie());

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

        return toDto(reviewRepository.save(review));
    }

    // Entity → DTO 변환
    private ReviewResponseDto toDto(ReviewEntity review) {
        return ReviewResponseDto.builder()
                .reviewId(review.getReviewId())
                .title(review.getTitle())
                .content(review.getContent())
                .movieId(review.getMovieId())
                .rating(review.getRating())
                .createdAt(formatDateTime(review.getCreateAt()))
                .updateAt(formatDateTime(review.getUpdateAt()))
                .isUpdate(review.getIsUpdate())
                .views(review.getViews())
                .liked(review.getLiked())
                .commentCount(review.getCommentCount())
                .userData(toUserDto(review.getUser()))
                .selectMovie(deserializeFromJson(review.getSelectMovie()))
                .build();
    }

    // 유저 변환
    private UserResponseDto toUserDto(UserEntity user) {
        if (user == null) return null;
        return UserResponseDto.builder()
                .id(user.getId())
                .userId(user.getUserId())
                .nickname(user.getNickname())
                .email(user.getEmail())
                .role(user.getRole())
                .build();
    }

    // 영화 정보 직렬화
    private String serializeToJson(Object obj) {
        if (obj == null) return null;
        try {
            return objectMapper.writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException("JSON 직렬화 실패", e);
        }
    }

    // 영화 정보 역직렬화
    private SelectedMovieDto deserializeFromJson(String json) {
        if (json == null) return null;
        try {
            return objectMapper.readValue(json, SelectedMovieDto.class);
        } catch (Exception e) {
            return null; // 혹은 에러 로깅
        }
    }

    // 날짜 포맷 (필요시 형식 맞추기)
    private String formatDateTime(LocalDateTime time) {
        return time != null ? time.toString() : null;
    }
}
