package OMR.teamProject.OMR.FAQ.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class FAQDto {
    private Long id;
    private String question;
    private String answer;
    private Integer sortOrder;
}
