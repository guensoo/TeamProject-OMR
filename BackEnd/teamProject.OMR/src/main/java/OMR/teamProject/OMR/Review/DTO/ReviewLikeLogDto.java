package OMR.teamProject.OMR.Review.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewLikeLogDto {
    private Long id;          // 좋아요 로그 PK
    private Long reviewId;    // 리뷰 ID
    private String userId;    // 좋아요 누른 사용자 ID
    private String createdAt; // 생성일 (String or LocalDateTime)
}