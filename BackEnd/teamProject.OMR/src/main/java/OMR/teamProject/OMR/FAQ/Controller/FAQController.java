package OMR.teamProject.OMR.FAQ.Controller;

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

import OMR.teamProject.OMR.FAQ.DTO.FAQDto;
import OMR.teamProject.OMR.FAQ.Service.FAQService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/faq")
@RequiredArgsConstructor
public class FAQController {
    private final FAQService faqService;

    //C
    @PostMapping
    public ResponseEntity<?> write(@RequestBody FAQDto dto){
    	List<FAQDto> result =faqService.write(dto);
    	return ResponseEntity.ok().body(result);
    }
    
    //R
    @GetMapping
    public ResponseEntity<?> findAll() {
    	List<FAQDto> result =faqService.findAll();
        return ResponseEntity.ok().body(result);
    }
    
    //U
    @PutMapping
    public ResponseEntity<?> update(@RequestBody FAQDto dto){
    	boolean result =faqService.update(dto);
        return ResponseEntity.ok().body(Map.of("result",result));
    }
    
    //D
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") long id){
    	boolean result =faqService.delete(id);
    	return ResponseEntity.ok().body(Map.of("Result",result));
    }
}
