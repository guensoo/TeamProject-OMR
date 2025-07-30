package OMR.teamProject.OMR.FAQ.DTO;

import java.time.LocalDateTime;

import OMR.teamProject.OMR.FAQ.Entity.FAQEntity;
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
public class FAQDto {
	//고유 아이디
    private Long id;
    //카테고리
    private String category;
    //질문
    private String question;
    //답변
    private String answer;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    
    //유저 정보들
    private String userId;
    private String userName;
    private UserResponseDto userData;
    
    //정렬용?
    private Integer sortOrder;
    
    public FAQEntity toEntity(UserEntity entity) {
    	return FAQEntity
    			.builder()
    				.id(id)
    				.category(category)
    				.question(question)
    				.answer(answer)
    				.createdAt(createdAt)
    				.updatedAt(updatedAt)
    				.userId(entity)
    				.sortOrder(sortOrder)
    			.build();
    }
}
