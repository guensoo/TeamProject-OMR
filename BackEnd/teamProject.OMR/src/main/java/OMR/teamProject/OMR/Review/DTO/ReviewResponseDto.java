package OMR.teamProject.OMR.Review.DTO;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ReviewResponseDto {
    private Long id;
    private String title;
    private String content;
    private Long userId;
    private Long movieId;
    private Integer rating;
    private LocalDateTime createdAt;
}