package OMR.teamProject.OMR.FAQ.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import OMR.teamProject.OMR.FAQ.DTO.FAQDto;
import OMR.teamProject.OMR.FAQ.Entity.FAQEntity;
import OMR.teamProject.OMR.FAQ.Repository.FAQRepository;
import OMR.teamProject.OMR.User.DTO.UserResponseDto;
import OMR.teamProject.OMR.User.Entity.UserEntity;
import OMR.teamProject.OMR.User.Repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FAQService {
    private final FAQRepository faqRepository;
    private final UserRepository userRepository;

    //C
    public List<FAQDto> write(FAQDto dto){
    	
//    	if(faqRepository.existsById(dto.getId())) {
//    		throw new RuntimeException("[write]이미 존재 id입니다.");
//    	}
    	
    	UserEntity userEntity =userRepository.findById(dto.getId()).orElse(null);
    	
    	FAQEntity faq = dto.toEntity(userEntity);
    	System.out.println("[(wrte)faq 들어온 값] :: "+faq);
    	
    	faqRepository.save(faq);
    	
    	return findAll();
    }
    
    //R
    public List<FAQDto> findAll() {
        return faqRepository.findAll().stream()
            .map(faq -> {
                UserEntity user = userRepository.findById(faq.getUserId().getId()).orElse(null);
                
                UserResponseDto userDto = UserResponseDto
                		.builder()
                		 .id(user.getId())
                		 .nickname(user.getNickname())
                		 .email(user.getEmail())
                		.build();
                
                return faq.toDTO(userDto);
            })
            .toList();
    }
    
    //U
    @Transactional
    public boolean update(FAQDto dto){
    	
    	FAQEntity faq = faqRepository.findById(dto.getId())
    			.orElseThrow(()->new RuntimeException("[update]존재하지 않는 id입니다."));

    	faq.setAnswer(dto.getAnswer());
    	faq.setCategory(dto.getCategory());
    	faq.setQuestion(dto.getQuestion());
    	
    	return true;
    }
    
    
    //D
    public boolean delete(long id) {
    	
    	FAQEntity faq = faqRepository.findById(id)
    			.orElseThrow(()->new RuntimeException("[delete]존재 하지 않는 id입니다."));
    		
		faqRepository.delete(faq);
    	
    	   	
    	return true;
    }
    
    

    
}
