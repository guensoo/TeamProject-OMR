package OMR.teamProject.OMR.User.Service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import OMR.teamProject.OMR.User.DTO.UserRequestDto;
import OMR.teamProject.OMR.User.DTO.UserResponseDto;
import OMR.teamProject.OMR.User.Entity.UserEntity;
import OMR.teamProject.OMR.User.Exception.PasswordMisMatchException;
import OMR.teamProject.OMR.User.Exception.UserNotFoundException;
import OMR.teamProject.OMR.User.Repository.UserRepository;
import OMR.teamProject.OMR.User.Token.JwtTokenProvider;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final EmailService emailService;
    private final JwtTokenProvider jwtTokenProvider;

    //회원가입
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
    
    //로그인
    public UserResponseDto login(UserRequestDto dto) {
    	UserEntity user = userRepository.findByUserId(dto.getUserId())
    			.orElseThrow(() -> new UserNotFoundException("존재하지 않는 사용자입니다."));
    	
    	if(!user.getPassword().equals(dto.getPassword())) {
    		throw new PasswordMisMatchException("비밀번호가 일치하지 않습니다.");
    	}
    	
    	return toDto(user);
    }
    
    //아이디찾기 (이메일로 찾기)
    public UserResponseDto findUserIdByEmail(String email) {
    	UserEntity user = userRepository.findUserIdByEmail(email)
    			.orElseThrow(() -> new UserNotFoundException("해당 이메일로 등록된 사용자가 없습니다."));
    	UserResponseDto dto = new UserResponseDto();
    	dto.setUserId(user.getUserId());
    	
    	return dto;
    }
    
    //비밀번호찾기 (userId와 email이 일치하는지 확인)
    public String verifyUserForPasswordReset(String userId, String email) {
    	try {
    		UserEntity user = userRepository.findByUserId(userId)
        			.orElseThrow(() -> new UserNotFoundException("존재하지 않는 사용자입니다."));
        	
        	if(!user.getEmail().equals(email)) {
        		throw new IllegalArgumentException("아이디와 이메일이 일치하지 않습니다.");
        	}
        	
        	String token = jwtTokenProvider.createPasswordResetToken(userId);
//            String resetUrl = "https://localhost:3000/reset-password?token=" + token;
        	String resetUrl = "myapp://reset-password?token=" + token;

            emailService.sendPasswordResetEmail(user.getEmail(), resetUrl);
        	
        	return "비밀번호 재설정 링크가 이메일로 발송되었습니다.";
		} catch (Exception e) {
			System.out.println("비밀번호 재설정 실패: " + e.getMessage());
	        throw e;
		}
    	
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
