package OMR.teamProject.OMR.Notice.DTO;

import java.time.LocalDateTime;

import OMR.teamProject.OMR.Notice.Entity.NoticeEntity;
import OMR.teamProject.OMR.User.DTO.UserResponseDto;
import OMR.teamProject.OMR.User.Entity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NoticeDto {
	//고유 아이디
    private Long id;
    //공지 카테고리
    private String category;
    //중요 표시
    private boolean isImportant;
    //새로운글 표시
    private boolean isNew;
    //공지 제목
    private String title;
    //공지 내용
    private String content;
   
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    
    //유저 정보들
    private String userId;
    private String userName;
    private UserResponseDto userData;
    
    
    public NoticeEntity toEntity(UserEntity entity) {
    	return NoticeEntity.builder()
    							.id(id)
    							.category(category)
    							.isImportant(isImportant)
    							.isNew(isNew)
    							.title(title)
    							.content(content)
    							.createdAt(createdAt)
    							.updatedAt(updatedAt)
    							.userId(entity)
    						.build();
    }
}