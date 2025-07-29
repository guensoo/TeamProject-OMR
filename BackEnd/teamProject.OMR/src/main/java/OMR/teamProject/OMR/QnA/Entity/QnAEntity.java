package OMR.teamProject.OMR.QnA.Entity;

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
@Table(name = "qna")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class QnAEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    @Column(columnDefinition = "TEXT")
    private String content;

    private Long authorId;
    private Boolean isSecret;
    private String password;
    private Boolean isReported;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // 답변은 별도 QnAAnswer 테이블로 관리 (1:N)
}