package OMR.teamProject.OMR.Notice.DTO;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class NoticeDto {
    private Long id;
    private String title;
    private String content;
    private LocalDateTime createdAt;
}