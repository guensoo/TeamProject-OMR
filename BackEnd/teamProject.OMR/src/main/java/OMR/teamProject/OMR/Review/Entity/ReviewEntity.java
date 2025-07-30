package OMR.teamProject.OMR.Review.Entity;

import java.time.LocalDateTime;

import OMR.teamProject.OMR.User.Entity.UserEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "review")
@Data
@NoArgsConstructor 
@AllArgsConstructor 
@Builder
public class ReviewEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;

    private String title;
    
    @Column(columnDefinition = "LONGTEXT")
    private String content;
    private int rating;

    private Long movieId;

    @Column(columnDefinition = "LONGTEXT")
    private String selectMovie; // JSON 문자열로 저장(혹은 필요하면 별도 테이블/임베디드)

    private LocalDateTime createAt;
    private LocalDateTime updateAt;
    private Boolean isUpdate;
    private Integer views;
    private Integer liked;
    private Integer commentCount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user; // 작성자 정보
}
