package OMR.teamProject.OMR.Review.DTO;

import OMR.teamProject.OMR.Review.Entity.CommentEntity;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CommentResponseDto {
    private Long id;
    private String text;
    private String writer;
    private String createdAt;

    // (선택) Entity → DTO 변환 메서드
    public static CommentResponseDto from(CommentEntity entity) {
        return CommentResponseDto.builder()
            .id(entity.getId())
            .text(entity.getText())
            .writer(entity.getWriter())
            .createdAt(entity.getCreatedAt() != null ? entity.getCreatedAt().toString() : null)
            .build();
    }
}
