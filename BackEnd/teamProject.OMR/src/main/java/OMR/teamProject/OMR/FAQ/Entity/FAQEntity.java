package OMR.teamProject.OMR.FAQ.Entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import OMR.teamProject.OMR.FAQ.DTO.FAQDto;
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
@Table(name = "faq")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class FAQEntity {
	
    //고유 아이디
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    //카테고리
    //[전체,, 계정/로그인, 서비스 이용, 결제/환불, 기술문제]
    private String category;
    //질문
    @Column(columnDefinition = "LONGTEXT")
    private String question;
    //답변    	
    @Column(columnDefinition = "LONGTEXT")
    private String answer;
    @CreationTimestamp
    private LocalDateTime createdAt;
    @UpdateTimestamp
    private LocalDateTime updatedAt;
    
    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity userId;
    
    private Integer sortOrder; // 정렬용
    
//    public FAQDto toDTO() {
//    	return FAQDto
//    			.builder()
//    				.id(id)
//    				.category(category)
//    				.question(question)
//    				.answer(answer)
//    				.createdAt(createdAt)
//    				.updatedAt(updatedAt)
//    				.userId(userId)
//    				.sortOrder(sortOrder)
//    			.build();
//    }
    
    public FAQDto toDTO(UserResponseDto dto) {
    	return FAQDto
    			.builder()
    				.id(id)
    				.category(category)
    				.question(question)
    				.answer(answer)
    				.createdAt(createdAt)
    				.updatedAt(updatedAt)
    				.userId(dto.getId())
    				.userData(dto)
    				.sortOrder(sortOrder)
    			.build();
    }    
}
