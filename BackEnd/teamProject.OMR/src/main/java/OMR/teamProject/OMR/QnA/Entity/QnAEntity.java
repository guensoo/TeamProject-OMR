package OMR.teamProject.OMR.QnA.Entity;

import java.time.LocalDateTime;

import OMR.teamProject.OMR.QnA.DTO.QnADto;
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
@Table(name = "qna")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class QnAEntity {
	
	//고유 아이디
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    //답변 상태
    private boolean status;
    //질문 제목
    @Column(columnDefinition = "LONGTEXT")
    private String title;
    //질문 내용
    @Column(columnDefinition = "LONGTEXT")
    private String content;
    //관리자 답변
    @Column(columnDefinition = "LONGTEXT")
    private String answer;


    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    @ManyToOne
    @JoinColumn(name = "id")
    private UserEntity userId;
    
    
//    public QnADto toDto() {
//    	return QnADto
//    			.builder()
//    				.id(id)
//    				.status(status)
//    				.title(title)
//    				.content(content)
//    				.answer(asnwer)
//    				.createdAt(createdAt)
//    				.updatedAt(updatedAt)
//    				.userId(userId)
//    			.build();
//    }
    
    public QnADto toDto(UserResponseDto dto) {
    	return QnADto
    			.builder()
    				.id(id)
    				.status(status)
    				.title(title)
    				.content(content)
    				.answer(answer)
    				.createdAt(createdAt)
    				.updatedAt(updatedAt)
    				.userId(dto.getId())
    				.userName(dto.getNickname())
    				.userData(dto)
    			.build();
    }
}