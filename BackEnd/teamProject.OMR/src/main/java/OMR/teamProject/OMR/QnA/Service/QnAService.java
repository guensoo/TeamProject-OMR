package OMR.teamProject.OMR.QnA.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import OMR.teamProject.OMR.QnA.DTO.QnADto;
import OMR.teamProject.OMR.QnA.Entity.QnAEntity;
import OMR.teamProject.OMR.QnA.Repository.QnARepository;
import OMR.teamProject.OMR.User.DTO.UserResponseDto;
import OMR.teamProject.OMR.User.Entity.UserEntity;
import OMR.teamProject.OMR.User.Repository.UserRepository;
import OMR.teamProject.OMR.User.Service.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class QnAService {
    private final QnARepository qnaRepository;
    private final UserRepository userRepository;
    
  //C
    public List<QnADto> write(QnADto dto){
    	
//    	if(qnaRepository.existsById(dto.getId())) {
//    		throw new RuntimeException("[write]이미 존재 id입니다.");
//    	}
//    	
    	UserEntity userEntity = userRepository.findById(dto.getUserId())
    								.orElseThrow(() -> new RuntimeException("사용자 정보가 없습니다."));
    	
    	QnAEntity entity = dto.toEntity(userEntity);
    	
    	System.out.println("[(wrte)notice 들어온 값] :: "+entity);
    	
    	qnaRepository.save(entity);
    	
    	return findAll();
    }
    
    //R
    public List<QnADto> findAll() {
        return qnaRepository.findAll().stream()
            .map(qna -> {
                UserEntity user = userRepository.findById(qna.getUserId().getId())
                			.orElseThrow(() -> new RuntimeException("사용자 정보가 없습니다."));
                return qna.toDto(user);
            })
            .toList();
    }

    
    //U
    @Transactional
    public boolean update(QnADto dto){
    	
    	QnAEntity result = qnaRepository.findById(dto.getId())
    			.orElseThrow(()->new RuntimeException("[update]존재하지 않는 id입니다."));
    	result.setAnswer(dto.getAnswer());
    	result.setTitle(dto.getTitle());
    	result.setContent(dto.getContent());
    	result.setTypes(dto.getTypes());
    	
    	return true;
    }
    
    //D
    public boolean delete(long id) {
    	
    	QnAEntity result = qnaRepository.findById(id)
    			.orElseThrow(()->new RuntimeException("[delete]존재 하지 않는 id입니다."));
    	
    	qnaRepository.delete(result);
    	
    	return true;
    }


}
