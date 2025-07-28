package OMR.teamProject.OMR.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http)throws Exception{
		//fire base 테스트 용으로 모두 열어놨고 추후에 다시 설정 예정
		http
		.csrf().disable() //CSRF 비활성화 
		.authorizeHttpRequests(auth -> auth
				.anyRequest().permitAll() //모든 요청 허용
				);
		return http.build();
	}

}
