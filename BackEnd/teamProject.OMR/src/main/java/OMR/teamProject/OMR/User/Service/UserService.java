package OMR.teamProject.OMR.User.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.security.crypto.password.PasswordEncoder;
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
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;

    //회원가입
    public UserResponseDto register(UserRequestDto dto) {	
        UserEntity user = UserEntity.builder()
            .userId(dto.getUserId())
            .password(passwordEncoder.encode(dto.getPassword())) // 보통 암호화 필요!
            .nickname(dto.getNickname())
            .email(dto.getEmail())
            .role("USER")
            .createAt(LocalDateTime.now())
            .build();
        userRepository.save(user);
        return toDto(user);
    }
    
    //로그인
    public Map<String, Object> login(UserRequestDto dto) {
    	UserEntity user = userRepository.findByUserId(dto.getUserId())
    			.orElseThrow(() -> new UserNotFoundException("존재하지 않는 사용자입니다."));
    	
    	if(!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
    		throw new PasswordMisMatchException("비밀번호가 일치하지 않습니다.");
    	}
    	
    	UserResponseDto userDto = toDto(user);
    	String token = jwtTokenProvider.createToken(user.getUserId());
    	
    	Map<String, Object> response = new HashMap<>();
    	response.put("user", userDto);
    	response.put("token", token);
    	
    	return response;
    }
    
    //아이디찾기 (이메일로 찾기)
    public UserResponseDto findUserIdByEmail(String email) {
    	UserEntity user = userRepository.findUserIdByEmail(email)
    			.orElseThrow(() -> new UserNotFoundException("해당 이메일로 등록된 사용자가 없습니다."));
    	UserResponseDto dto = new UserResponseDto();
    	dto.setUserId(user.getUserId());
    	
    	return dto;
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
