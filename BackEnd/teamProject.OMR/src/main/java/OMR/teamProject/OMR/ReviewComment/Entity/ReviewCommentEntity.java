package OMR.teamProject.OMR.ReviewComment.Entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "review_comment")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class ReviewCommentEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long reviewId;    // FK to Review
    private Long userId;      // FK to User

    @Column(columnDefinition = "TEXT")
    private String content;

    private LocalDateTime createdAt;
}
