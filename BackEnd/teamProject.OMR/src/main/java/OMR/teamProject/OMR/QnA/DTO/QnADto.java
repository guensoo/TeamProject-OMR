package OMR.teamProject.OMR.QnA.DTO;

import java.time.LocalDateTime;

import OMR.teamProject.OMR.QnA.Entity.QnAEntity;
import OMR.teamProject.OMR.User.DTO.UserResponseDto;
import OMR.teamProject.OMR.User.Entity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @Builder
@AllArgsConstructor
@NoArgsConstructor
public class QnADto {
	//고유 아이디
	private long id;
	//답변 타입
	private String types;
	//질문 제목
    private String title;
    //질문 내용
    private String content;
    //관리자 답변
    private String answer;
    
    
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    private Long userId;
    private String userName;
    private UserResponseDto userData;
    
    public QnAEntity toEntity(UserEntity entity) {
    	return QnAEntity
    			.builder()
//    				.id(id)
    				.types(types)
    				.title(title)
    				.content(content)
    				.answer(answer)
    				.createdAt(createdAt)
    				.updatedAt(updatedAt)
    				.userId(entity)
    			.build();
    }
    
}