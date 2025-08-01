package OMR.teamProject.OMR.User.Controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import OMR.teamProject.OMR.User.DTO.UserRequestDto;
import OMR.teamProject.OMR.User.DTO.UserResponseDto;
import OMR.teamProject.OMR.User.Entity.UserEntity;
import OMR.teamProject.OMR.User.Exception.UserNotFoundException;
import OMR.teamProject.OMR.User.Repository.UserRepository;
import OMR.teamProject.OMR.User.Service.UserService;
import OMR.teamProject.OMR.User.Token.JwtTokenProvider;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;

    //회원가입
    @PostMapping("/register")
    public UserResponseDto register(@RequestBody UserRequestDto dto) {
        return userService.register(dto);
    }
    
    //로그인
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody UserRequestDto dto){
    	Map<String, Object> result = userService.login(dto);
    	return ResponseEntity.ok(result);
    }
    
    //아이디찾기 (이메일로 찾기)
    @PostMapping("/find-id")
    public ResponseEntity<UserResponseDto> findId(@RequestBody Map<String, String> request){
    	String email = request.get("email");
    	
    	UserResponseDto userDto = userService.findUserIdByEmail(email);
    	return ResponseEntity.ok(userDto);
    }
    
    //비밀번호찾기 (userId와 email이 일치하는지 확인)
    @PostMapping("/find-password")
    public ResponseEntity<Map<String, String>> findPassword(@RequestBody Map<String, String> request){
    	String userId = request.get("userId");
    	String email = request.get("email");
    	
    	String message = userService.verifyUserForPasswordReset(userId, email);
    	
    	Map<String, String> response = new HashMap<>();
    	response.put("message", message);
    	
    	return ResponseEntity.ok(response);
    }
    
    //비밀번호 재설정
    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody Map<String, String> request){
    	String token = request.get("token");
    	String newPassword = request.get("newPassword");
    	
    	if(!jwtTokenProvider.validateToken(token)) {
    		return ResponseEntity.badRequest().body("유효하지 않거나 만료된 토큰입니다.");
    	}
    	
    	String tokenType = jwtTokenProvider.getTokenType(token);
    	if(!"passwordReset".equals(tokenType)) {
    		return ResponseEntity.badRequest().body("비밀번호 재설정 토큰이 아닙니다.");
    	}
    	
    	String userId = jwtTokenProvider.getUserIdFromToken(token);
    	
    	UserEntity user = userRepository.findByUserId(userId)
    			.orElseThrow(() -> new UserNotFoundException("사용자를 찾을 수 없습니다."));
    	
    	user.setPassword(passwordEncoder.encode(newPassword));
    	userRepository.save(user);
    	
    	return ResponseEntity.ok("비밀번호가 성공적으로 변경되었습니다.");
    }
}
