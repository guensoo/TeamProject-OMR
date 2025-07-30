package OMR.teamProject.OMR.QnA.Entity;

import java.time.LocalDateTime;

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
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "qna_answer")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class QnAAnswerEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "qna_id")
    private QnAEntity qna;

    @Column(columnDefinition = "TEXT")
    private String content;

    private Long writerId; // 관리자ID

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}