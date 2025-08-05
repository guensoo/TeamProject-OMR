package OMR.teamProject.OMR.User.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import OMR.teamProject.OMR.User.Entity.EmailVerification;
import OMR.teamProject.OMR.User.Repository.EmailVerificationRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailService {
	
	private final JavaMailSender mailSender;
	private final EmailVerificationRepository repository;
	
	@Transactional
    public void sendVerificationCode(String email, String purpose) {
        String code = makeRandomCode();
        LocalDateTime expiresAt = LocalDateTime.now().plusMinutes(5);  // 5분 유효기간

        // 이전 데이터 삭제
        repository.deleteByEmail(email);

        // 저장
        EmailVerification ev = EmailVerification.builder()
                .email(email)
                .code(code)
                .verified(false)
                .expiresAt(expiresAt)
                .build();
        
        repository.save(ev);
        
        String subject;
        String text;
        
        if ("signup".equals(purpose)) {
            subject = "[YourApp] 회원가입 이메일 인증 코드";
            text = "회원가입을 위한 인증번호: " + code + "\n(5분 이내 입력해주세요)";
        } else if ("reset".equals(purpose)) {
            subject = "[YourApp] 비밀번호 재설정 인증 코드";
            text = "비밀번호 재설정을 위한 인증번호: " + code + "\n(5분 이내 입력해주세요)";
        } else {
            subject = "[YourApp] 인증 코드";
            text = "인증번호: " + code + "\n(5분 이내 입력해주세요)";
        }
        
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject(subject);
        message.setText(text);

        mailSender.send(message);
    }

    @Transactional(readOnly = true)
    public boolean verifyCode(String email, String code) {
        Optional<EmailVerification> opt = repository.findByEmail(email);
        if(opt.isEmpty()) return false;

        EmailVerification ev = opt.get();

        if(ev.getExpiresAt().isBefore(LocalDateTime.now())) return false; // 만료
        return ev.getCode().equals(code);
    }

    private String makeRandomCode() {
        Random r = new Random();
        StringBuilder sb = new StringBuilder();
        for(int i=0; i<6; i++) sb.append(r.nextInt(10));
        return sb.toString();
    }
    
    @Transactional
    public boolean verifyAndRemoveCode(String email, String code) {
        Optional<EmailVerification> opt = repository.findByEmail(email);
        if (opt.isEmpty()) return false;

        EmailVerification ev = opt.get();

        // 인증 코드 만료 확인
        if (ev.getExpiresAt().isBefore(LocalDateTime.now())) return false;

        // 코드 일치 여부 확인
        if (ev.getCode().equals(code)) {
            repository.delete(ev);  // 인증 성공 후 DB에서 삭제
            return true;
        }
        return false;
    }
    
    @Transactional
    public boolean verifyAndMarkAsVerified(String email, String code) {
        Optional<EmailVerification> opt = repository.findByEmail(email);
        if (opt.isEmpty()) return false;

        EmailVerification ev = opt.get();

        if (ev.getExpiresAt().isBefore(LocalDateTime.now())) return false;

        if (ev.getCode().equals(code)) {
            ev.setVerified(true);
            repository.save(ev);
            return true;
        }
        return false;
    }
}
