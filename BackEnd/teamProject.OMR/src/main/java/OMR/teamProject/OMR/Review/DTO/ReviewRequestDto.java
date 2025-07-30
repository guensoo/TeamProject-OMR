package OMR.teamProject.OMR.Review.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReviewRequestDto {
    private Long reviewId; // 리뷰 글 pk
    private String title; // 제목
    private String content; // 내용
    private int rating; // 평점

    private Long movieId; // 작품 id
    private SelectedMovieDto selectMovie; // 작품 정보(객체로 받는 걸 권장)
    
    private String createAt; // 생성일(보통 서버에서 처리)
    private String updateAt; // 수정일(보통 서버에서 처리)
    private Boolean isUpdate; // 수정여부

    private Integer views; // 조회 수
    private Integer liked; // 좋아요 수
    private Integer commentCount; // 댓글 수

    private Long userId; // 사용자 id
}