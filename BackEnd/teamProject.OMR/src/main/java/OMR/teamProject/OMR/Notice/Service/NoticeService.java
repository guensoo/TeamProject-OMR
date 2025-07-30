package OMR.teamProject.OMR.Notice.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import OMR.teamProject.OMR.Notice.DTO.NoticeDto;
import OMR.teamProject.OMR.Notice.Entity.NoticeEntity;
import OMR.teamProject.OMR.Notice.Repository.NoticeRepository;
import OMR.teamProject.OMR.User.DTO.UserResponseDto;
import OMR.teamProject.OMR.User.Entity.UserEntity;
import OMR.teamProject.OMR.User.Repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NoticeService {
    private final NoticeRepository noticeRepository;
    private final UserRepository userRepository;

    //C
    public List<NoticeDto> write(NoticeDto dto){
    	
    	if(noticeRepository.existsById(dto.getId())) {
    		throw new RuntimeException("[write]이미 존재 id입니다.");
    	}
    	
    	UserEntity userEntity = userRepository.findById(dto.getId())
    			.orElseThrow(() -> new RuntimeException("사용자 정보가 없습니다."));
    	
    	NoticeEntity entity = dto.toEntity(UserResponseDto
				.builder()
		            .id(userEntity.getId())
		            .nickname(userEntity.getNickname())
		            .email(userEntity.getEmail())
			.build());
    	System.out.println("[(wrte)notice 들어온 값] :: "+entity);
    	
    	noticeRepository.save(entity);
    	
    	return findAll();
    }
    
    //R
    public List<NoticeDto> findAll() {
        return noticeRepository.findAll().stream()
            .map(notice -> {
                UserEntity user = userRepository.findById(notice.getUserId().getId())
                		 .orElseThrow(() -> new RuntimeException("사용자 정보가 없습니다."));
                return notice.toDto(user);
            })
            .toList();
    }
    
    //U
    @Transactional
    public boolean update(NoticeDto dto){
    	
    	NoticeEntity result = noticeRepository.findById(dto.getId())
    			.orElseThrow(()->new RuntimeException("[update]존재하지 않는 id입니다."));

    	result.setContent(dto.getContent());
    	result.setNew(dto.isNew());
    	result.setImportant(dto.isImportant());
    	result.setTitle(dto.getTitle());
    	result.setCategory(dto.getCategory());
    	
    	return true;
    }
    
    //D
    public boolean delete(long id) {
    	
    	NoticeEntity result = noticeRepository.findById(id)
    			.orElseThrow(()->new RuntimeException("[delete]존재 하지 않는 id입니다."));
    	
    	noticeRepository.delete(result);
    	
    	return true;
    }


}
