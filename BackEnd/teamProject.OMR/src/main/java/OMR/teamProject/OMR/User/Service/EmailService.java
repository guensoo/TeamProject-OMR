package OMR.teamProject.OMR.User.Service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
	
	private final JavaMailSender mailSender;
	
	public EmailService(JavaMailSender mailSender) {
		this.mailSender = mailSender;
	}
	
	public void sendPasswordResetEmail(String toEmail, String resetUrl) {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(toEmail);
		message.setSubject("비밀번호 재설정 안내");
		message.setText("아래 링크를 클릭하여 비밀번호를 재설정하세요:\n" + resetUrl);
		mailSender.send(message);
	}
}
