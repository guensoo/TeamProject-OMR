package OMR.teamProject.OMR.Review.DTO;

import OMR.teamProject.OMR.User.DTO.UserResponseDto;
import lombok.Data;

@Data
public class ReviewResponseDto {
    private Long reviewId;
    private String title;
    private String content;
    private int rating;
    private Long movieId;
    private SelectedMovieDto selectMovie;
    private String createdAt;
    private String updateAt;
    private Boolean isUpdate;
    private Integer views;
    private Integer liked;
    private Integer commentCount;
    private UserResponseDto userData; // 유저 정보
}