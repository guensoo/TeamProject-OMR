package OMR.teamProject.OMR.QnA.DTO;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class QnAResponseDto {
    private Long id;
    private String title;
    private String content;
    private Long authorId;
    private Boolean isSecret;
    private Boolean isReported;
    private LocalDateTime createdAt;
    private QnAAnswerDto answer;
}