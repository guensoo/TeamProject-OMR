package OMR.teamProject.OMR.Review.DTO;

import lombok.Data;

@Data
public class ReviewUpdateRequest {
    private String title;
    private String content;
    private int rating;
}
