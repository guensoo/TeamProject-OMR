package OMR.teamProject.OMR.Notice.Controller;

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

import OMR.teamProject.OMR.Notice.DTO.NoticeDto;
import OMR.teamProject.OMR.Notice.Service.NoticeService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/notice")
@RequiredArgsConstructor
public class NoticeController {
    private final NoticeService noticeService;

    //C
    @PostMapping
    public ResponseEntity<?> write(@RequestBody NoticeDto dto){
    	List<NoticeDto> result = noticeService.write(dto);
    	return ResponseEntity.ok().body(result);
    }
    
    //R
    @GetMapping
    public ResponseEntity<?> findAll() {
    	List<NoticeDto> result = noticeService.findAll();
        return ResponseEntity.ok().body(result);
    }
    
    //U
    @PutMapping
    public ResponseEntity<?> update(@RequestBody NoticeDto dto){
    	boolean result = noticeService.update(dto);
    	return ResponseEntity.ok().body(Map.of("result",result));
    }
    
    
    //D
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") long id){
    	boolean result = noticeService.delete(id);
    	return ResponseEntity.ok().body(Map.of("result",result));
    }
}
