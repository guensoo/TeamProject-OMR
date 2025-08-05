package OMR.teamProject.OMR.Review.DTO;

import OMR.teamProject.OMR.Review.Entity.CommentEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommentRequestDto {
    private Long id;
    private String text;
    private String writer;
    private String createdAt;
    
    public static CommentResponseDto from(CommentEntity entity) {
        return CommentResponseDto.builder()
            .id(entity.getId())
            .text(entity.getText())
            .writer(entity.getWriter())
            .createdAt(entity.getCreatedAt().toString())
            .build();
    }
}
