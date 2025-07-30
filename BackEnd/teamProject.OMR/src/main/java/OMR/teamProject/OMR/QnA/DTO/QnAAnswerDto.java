package OMR.teamProject.OMR.QnA.DTO;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class QnAAnswerDto {
    private Long id;
    private String content;
    private Long writerId;
    private LocalDateTime createdAt;
}