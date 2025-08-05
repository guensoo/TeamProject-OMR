package OMR.teamProject.OMR.ReviewComment.DTO;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ReviewCommentResponseDto {
    private Long id;
    private Long reviewId;
    private String userId;
    private String content;
    private LocalDateTime createdAt;
}