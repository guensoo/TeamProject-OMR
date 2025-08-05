package OMR.teamProject.OMR.User.Controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import OMR.teamProject.OMR.User.DTO.UserRequestDto;
import OMR.teamProject.OMR.User.DTO.UserResponseDto;
import OMR.teamProject.OMR.User.Entity.EmailVerification;
import OMR.teamProject.OMR.User.Entity.UserEntity;
import OMR.teamProject.OMR.User.Exception.UserNotFoundException;
import OMR.teamProject.OMR.User.Repository.EmailVerificationRepository;
import OMR.teamProject.OMR.User.Repository.UserRepository;
import OMR.teamProject.OMR.User.Service.EmailService;
import OMR.teamProject.OMR.User.Service.UserService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;
    private final EmailVerificationRepository emailVerificationRepository;

    //회원가입
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserRequestDto dto) {
    	EmailVerification ev = emailVerificationRepository.findByEmail(dto.getEmail())
    	        .orElse(null);
    	
    	if (ev == null || !ev.isVerified()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("이메일 인증이 필요합니다.");
        }
    	
    	// 회원가입 처리
        UserResponseDto response = userService.register(dto);
        
     // 인증 정보 삭제 (선택)
        emailVerificationRepository.delete(ev);
    	
        return ResponseEntity.ok(response);
    }
    
    //회원가입 이메일 인증 전송
    @PostMapping("/signup/send-code")
    public ResponseEntity<?> sendSignupCode(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        emailService.sendVerificationCode(email, "signup");
        return ResponseEntity.ok("이메일 전송 완료");
    }
    
    //회원가입 이메일 인증 코드 확인
    @PostMapping("/signup/verify-code")
    public ResponseEntity<?> verifySignupCode(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String code = request.get("code");

        boolean verified = emailService.verifyAndMarkAsVerified(email, code);

        if (verified) {
            return ResponseEntity.ok("인증 성공");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("인증 실패");
        }
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
    
    // 1) 인증 코드 이메일 발송
    @PostMapping("/send-reset-code")
    public ResponseEntity<String> sendResetCode(@RequestBody Map<String, String> req) {
        String userId = req.get("userId");
        String email = req.get("email");

        UserEntity user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new UserNotFoundException("존재하지 않는 사용자입니다."));

        if (!user.getEmail().equals(email)) {
            return ResponseEntity.badRequest().body("아이디와 이메일이 일치하지 않습니다.");
        }

        emailService.sendVerificationCode(email, "reset");

        return ResponseEntity.ok("인증코드를 이메일로 전송했습니다.");
    }

    // 2) 인증 코드 검증
    @PostMapping("/verify-reset-code")
    public ResponseEntity<String> verifyResetCode(@RequestBody Map<String, String> req) {
        String email = req.get("email");
        String code = req.get("code");

        boolean verified = emailService.verifyCode(email, code);
        if (!verified) {
            return ResponseEntity.badRequest().body("인증코드가 유효하지 않거나 만료되었습니다.");
        }

        return ResponseEntity.ok("인증 성공");
    }

    // 3) 비밀번호 재설정
    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody Map<String, String> req) {
        String userId = req.get("userId");
        String newPassword = req.get("newPassword");

        UserEntity user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new UserNotFoundException("사용자를 찾을 수 없습니다."));

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        return ResponseEntity.ok("비밀번호가 성공적으로 변경되었습니다.");
    }
}
