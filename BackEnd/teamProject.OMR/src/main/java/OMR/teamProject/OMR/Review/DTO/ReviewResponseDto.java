package OMR.teamProject.OMR.Review.DTO;

import OMR.teamProject.OMR.User.DTO.UserResponseDto;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
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
}