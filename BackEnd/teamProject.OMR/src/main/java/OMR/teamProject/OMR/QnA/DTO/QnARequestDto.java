package OMR.teamProject.OMR.QnA.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class QnARequestDto {
    private String title;
    private String content;
    private Long authorId;
    private Boolean isSecret;
    private String password;
}