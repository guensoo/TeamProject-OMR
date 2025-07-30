package OMR.teamProject.OMR.QnA.Controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import OMR.teamProject.OMR.QnA.DTO.QnADto;
import OMR.teamProject.OMR.QnA.Service.QnAService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/qna")
@RequiredArgsConstructor
public class QnAController {
    private final QnAService qnaService;

    //C
    @PostMapping
    public ResponseEntity<?> write(@RequestBody QnADto dto){
    	List<QnADto> result =qnaService.write(dto);
    	return ResponseEntity.ok().body(result);
    }
    
    //R
    @GetMapping
    public ResponseEntity<?> findAll() {
    	List<QnADto> result =qnaService.findAll();
        return ResponseEntity.ok().body(result);
    }
    
    //U
    @PutMapping
    public ResponseEntity<?> update(@RequestBody QnADto dto){
    	boolean result =qnaService.update(dto);
        return ResponseEntity.ok().body(Map.of("result",result));
    }
    
    //D
    @DeleteMapping("/id")
    public ResponseEntity<?> delete(@PathVariable long id){
    	boolean result =qnaService.delete(id);
    	return ResponseEntity.ok().body(Map.of("Result",result));
    }
}