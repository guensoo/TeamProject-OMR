package OMR.teamProject.OMR.Review.DTO;

import com.fasterxml.jackson.databind.ObjectMapper;

import OMR.teamProject.OMR.Review.Entity.ReviewEntity;
import OMR.teamProject.OMR.User.DTO.UserResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReviewResponseDto {
    private Long reviewId;
    private String title;
    private String content;
    private int rating;
    private Long movieId;
    private String createdAt;
    private String updateAt;
    private Boolean isUpdate;
    private Integer views;
    private Integer liked;
    private Integer commentCount;
    private UserResponseDto userData; // 유저 정보 DTO
    private SelectedMovieDto selectMovie; // 영화 정보 DTO
    
    // ★ 엔티티 → DTO 변환 (selectMovie 변환 포함)
    public static ReviewResponseDto from(ReviewEntity review) {
        // selectMovie String(JSON) → SelectedMovieDto 변환
        SelectedMovieDto selectMovieObj = null;
        if (review.getSelectMovie() != null) {
            try {
                ObjectMapper mapper = new ObjectMapper();
                selectMovieObj = mapper.readValue(review.getSelectMovie(), SelectedMovieDto.class);
            } catch (Exception e) {
                // 파싱 실패시 null 또는 예외 처리
                selectMovieObj = null;
            }
        }

        return ReviewResponseDto.builder()
            .reviewId(review.getReviewId())
            .title(review.getTitle())
            .content(review.getContent())
            .rating(review.getRating())
            .movieId(review.getMovieId())
            .createdAt(review.getCreateAt() != null ? review.getCreateAt().toString() : null)
            .updateAt(review.getUpdateAt() != null ? review.getUpdateAt().toString() : null)
            .isUpdate(review.getIsUpdate())
            .views(review.getViews())
            .liked(review.getLiked())
            .commentCount(review.getCommentCount())
            .userData(review.getUser() != null ? UserResponseDto.builder()
                .id(review.getUser().getId())
                .userId(review.getUser().getUserId())
                .nickname(review.getUser().getNickname())
                .email(review.getUser().getEmail())
                .role(review.getUser().getRole())
                .createAt(review.getUser().getCreateAt())
                .build() : null)
            .selectMovie(selectMovieObj)
            .build();
    }
}