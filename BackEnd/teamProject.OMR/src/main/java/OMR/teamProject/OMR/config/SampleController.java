package OMR.teamProject.OMR.config;

import java.util.Map;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;


@RestController
public class SampleController {
	
	// Post 예시: Firestore에 문서 저장
	@PostMapping("/add")
	public String add(@RequestBody Map<String,Object> data) throws Exception{
	    Firestore db = FirestoreClient.getFirestore(); // Firestore 인스턴스 가져오기
	    db.collection("testCollection")                  // 'testCollection' 컬렉션 선택 => mysql의 database = uka
	      .document("testDoc")                           // 'testDoc' 문서 선택 (없으면 생성) => mysql의 table = userTable
	      .set(data);                                   // 요청 본문 데이터를 문서에 저장
	    return "Document 저장 완료";                      // 완료 메시지 반환
	}

	// Delete 예시: Firestore에서 문서 삭제
	@DeleteMapping("/delete")
	public String delete() throws Exception {
	    Firestore db = FirestoreClient.getFirestore(); // Firestore 인스턴스 가져오기
	    db.collection("testCollection")                  // 'testCollection' 컬렉션 선택 => mysql의 database = uka
	      .document("testDoc")                           // 'testDoc' 문서 선택 => mysql의 table = userTable
	      .delete();                                    // 문서 삭제
	    return "Document 삭제 완료";                      // 완료 메시지 반환
	}

	// Put 예시: Firestore 문서 일부 필드 업데이트
	@PutMapping("/update")
	public String update(@RequestBody Map<String,Object> updates) throws Exception {
	    Firestore db = FirestoreClient.getFirestore(); // Firestore 인스턴스 가져오기
	    db.collection("testCollection")                  // 'testCollection' 컬렉션 선택 => mysql의 database = uka
	      .document("testDoc")                           // 'testDoc' 문서 선택 => mysql의 table = userTable
	      .update(updates);                             // 전달된 필드만 업데이트
	    return "Document 업데이트 완료";                  // 완료 메시지 반환
	}

	// Get 예시: Firestore에서 문서 읽기
	@GetMapping("/get")
	public Map<String, Object> findAll() throws Exception{
	    Firestore db = FirestoreClient.getFirestore(); // Firestore 인스턴스 가져오기
	    return db.collection("testCollection")           // 'testCollection' 컬렉션 선택 => mysql의 database = uka
	            .document("testDoc")                      // 'testDoc' 문서 선택 => mysql의 table = userTable
	            .get()                                   // 문서 가져오기 (비동기)
	            .get()                                   // Future에서 실제 결과 가져오기 (블로킹)
	            .getData();                              // 문서 데이터 Map으로 반환
	}


}
