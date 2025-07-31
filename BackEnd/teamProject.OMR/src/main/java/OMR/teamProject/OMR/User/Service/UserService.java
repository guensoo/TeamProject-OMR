package OMR.teamProject.OMR.User.Service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import OMR.teamProject.OMR.User.DTO.UserRequestDto;
import OMR.teamProject.OMR.User.DTO.UserResponseDto;
import OMR.teamProject.OMR.User.Entity.UserEntity;
import OMR.teamProject.OMR.User.Exception.PasswordMisMatchException;
import OMR.teamProject.OMR.User.Exception.UserNotFoundException;
import OMR.teamProject.OMR.User.Repository.UserRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public UserResponseDto register(UserRequestDto dto) {
        UserEntity user = UserEntity.builder()
            .userId(dto.getUserId())
            .password(dto.getPassword()) // 보통 암호화 필요!
            .nickname(dto.getNickname())
            .email(dto.getEmail())
            .role("USER")
            .createAt(LocalDateTime.now())
            .build();
        userRepository.save(user);
        return toDto(user);
    }
    
    public UserResponseDto login(UserRequestDto dto) {
    	UserEntity user = userRepository.findByUserId(dto.getUserId())
    			.orElseThrow(() -> new UserNotFoundException("존재하지 않는 사용자입니다."));
    	
    	if(!user.getPassword().equals(dto.getPassword())) {
    		throw new PasswordMisMatchException("비밀번호가 일치하지 않습니다.");
    	}
    	
    	return toDto(user);
    }

    private UserResponseDto toDto(UserEntity user) {
        UserResponseDto dto = new UserResponseDto();
        dto.setId(user.getId());
        dto.setUserId(user.getUserId());
        dto.setNickname(user.getNickname());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole());
        dto.setCreateAt(user.getCreateAt());
        return dto;
    }
}
