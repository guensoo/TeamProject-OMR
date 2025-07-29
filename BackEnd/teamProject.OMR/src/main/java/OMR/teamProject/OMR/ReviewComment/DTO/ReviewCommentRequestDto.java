package OMR.teamProject.OMR.ReviewComment.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ReviewCommentRequestDto {
    private Long reviewId;
    private Long userId;
    private String content;
}