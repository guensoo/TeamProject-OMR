package OMR.teamProject.OMR.Notice.Entity;

import java.time.LocalDateTime;

import OMR.teamProject.OMR.Notice.DTO.NoticeDto;
import OMR.teamProject.OMR.User.DTO.UserResponseDto;
import OMR.teamProject.OMR.User.Entity.UserEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "notice")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class NoticeEntity {
	//고유 아이디
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    //공지 카테고리
    private String category;
    //중요 표시
    private boolean isImportant;
    //새고운글 표시
    private boolean isNew;
    //공지 제목
    @Column(columnDefinition = "LONGTEXT")
    private String title;
    //공지 내용
    @Column(columnDefinition = "LONGTEXT")
    private String content; 

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity userId;
    
    
//    public NoticeDto toDto() {
//    	return NoticeDto
//    			.builder()
//    				.id(id)
//    				.category(category)
//    				.isImportant(isImportant)
//    				.isNew(isNew)
//    				.title(title)
//    				.content(content)
//    				.createdAt(createdAt)
//    				.updatedAt(updatedAt)
//    				.userId(userId)
//    			.build();
//    }
    
    public NoticeDto toDto(UserEntity entity) {
    	return NoticeDto
    			.builder()
    				.id(id)
    				.category(category)
    				.isImportant(isImportant)
    				.isNew(isNew)
    				.title(title)
    				.content(content)
    				.createdAt(createdAt)
    				.updatedAt(updatedAt)
    				.userId(entity.getUserId())
    				.userName(entity.getNickname())
    				.userData(UserResponseDto
    						.builder()
    							.id(entity.getId())
    							.userId(entity.getUserId())
    							.nickname(entity.getNickname())
    							.email(entity.getEmail())
    						.build())
    			.build();
    }
}
