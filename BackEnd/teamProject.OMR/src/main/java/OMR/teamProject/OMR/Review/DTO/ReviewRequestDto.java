package OMR.teamProject.OMR.Review.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ReviewRequestDto {
    private String title;
    private String content;
    private Long userId;
    private Long movieId;
    private Integer rating;
}
