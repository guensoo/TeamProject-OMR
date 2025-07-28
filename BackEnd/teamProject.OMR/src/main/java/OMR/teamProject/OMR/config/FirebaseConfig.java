package OMR.teamProject.OMR.config;

import java.io.FileInputStream;

import javax.annotation.PostConstruct;

import org.springframework.context.annotation.Configuration;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

@Configuration
public class FirebaseConfig {
	
	@PostConstruct
	public void init() {
		try {
			if(FirebaseApp.getApps().isEmpty()) {//이미 초기화 되어 있는지 확인
				FileInputStream serviceAccount = 
						new FileInputStream("src/main/resources/serviceAccountKey.json");
				FirebaseOptions options = new FirebaseOptions.Builder()
						.setCredentials(GoogleCredentials.fromStream(serviceAccount))
						.build();
				
				FirebaseApp.initializeApp(options);
				System.out.println("Firebase 초기화 완료");
			} else {
				System.out.println("Firebase 이미 초기화됨.");
			}
			
		}catch (Exception e) {
			System.out.println("파이어베이스 연결오류");
			e.printStackTrace();
		}
	}

}
