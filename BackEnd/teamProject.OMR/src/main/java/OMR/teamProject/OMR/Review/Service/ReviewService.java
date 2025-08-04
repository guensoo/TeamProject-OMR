package OMR.teamProject.OMR.Review.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.ObjectMapper;

import OMR.teamProject.OMR.Review.DTO.CommentRequestDto;
import OMR.teamProject.OMR.Review.DTO.CommentResponseDto;
import OMR.teamProject.OMR.Review.DTO.ReviewRequestDto;
import OMR.teamProject.OMR.Review.DTO.ReviewResponseDto;
import OMR.teamProject.OMR.Review.DTO.ReviewUpdateRequest;
import OMR.teamProject.OMR.Review.DTO.SelectedMovieDto;
import OMR.teamProject.OMR.Review.Entity.CommentEntity;
import OMR.teamProject.OMR.Review.Entity.ReviewEntity;
import OMR.teamProject.OMR.Review.Repository.CommentRepository;
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
    private final CommentRepository commentRepository;

    // 전체 리뷰 목록 조회
    @Transactional(readOnly = true)
    public List<ReviewResponseDto> getAllReviews() {
        return reviewRepository.findAll().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    // 리뷰 단건 조회
    @Transactional(readOnly = true)
    public ReviewResponseDto getReviewById(Long id) {
        return reviewRepository.findById(id)
                .map(this::toDto)
                .orElse(null);
    }

    // 리뷰 등록
    public ReviewResponseDto reviewCreate(ReviewRequestDto dto) {
        if (dto.getUserId() == null) {
            throw new IllegalArgumentException("사용자 ID가 없습니다.");
        }
        UserEntity user = userRepository.findByUserId(dto.getUserId())
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

    // 리뷰 수정
    public ReviewResponseDto updateReview(Long id, ReviewUpdateRequest req) {
        ReviewEntity review = reviewRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("리뷰를 찾을 수 없습니다."));

        review.setTitle(req.getTitle());
        review.setContent(req.getContent());
        review.setRating(req.getRating());

        // (필요시 selectMovie, isUpdate, updateAt 등도 여기서 같이 set)
        reviewRepository.save(review);

        return ReviewResponseDto.from(review);
    }

    // 리뷰 삭제
    public boolean deleteReview(Long id) {
        if (!reviewRepository.existsById(id)) return false;
        reviewRepository.deleteById(id);
        return true;
    }

    // --- 아래는 변환 함수/유틸 ---
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

    private String serializeToJson(Object obj) {
        if (obj == null) return null;
        try {
            return objectMapper.writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException("JSON 직렬화 실패", e);
        }
    }

    private SelectedMovieDto deserializeFromJson(String json) {
        if (json == null) return null;
        try {
            return objectMapper.readValue(json, SelectedMovieDto.class);
        } catch (Exception e) {
            return null; // 에러시 null
        }
    }

    private String formatDateTime(LocalDateTime time) {
        return time != null ? time.toString() : null;
    }
    
    public List<CommentResponseDto> getCommentsByReviewId(Long reviewId) {
        List<CommentEntity> comments = commentRepository.findByReview_ReviewId(reviewId);
        return comments.stream().map(CommentResponseDto::from).collect(Collectors.toList());
    }

    public CommentResponseDto createComment(Long reviewId, CommentRequestDto dto) {
        ReviewEntity review = reviewRepository.findById(reviewId)
            .orElseThrow(() -> new RuntimeException("리뷰 없음"));

        CommentEntity comment = CommentEntity.builder()
            .review(review)
            .text(dto.getText())
            .writer(dto.getWriter()) // writer 없이 익명으로 할 수도 있음
            .createdAt(LocalDateTime.now())
            .build();

        commentRepository.save(comment);

        return CommentResponseDto.from(comment);
    }
    
    public void deleteComment(Long reviewId, Long commentId) {
        CommentEntity comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("댓글을 찾을 수 없습니다."));

        if (!comment.getReview().getReviewId().equals(reviewId)) {
            throw new RuntimeException("리뷰/댓글 정보가 일치하지 않습니다.");
        }

        commentRepository.delete(comment);
    }
}
