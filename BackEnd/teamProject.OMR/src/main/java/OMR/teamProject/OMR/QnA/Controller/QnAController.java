package OMR.teamProject.OMR.QnA.Controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import OMR.teamProject.OMR.QnA.DTO.QnARequestDto;
import OMR.teamProject.OMR.QnA.DTO.QnAResponseDto;
import OMR.teamProject.OMR.QnA.Service.QnAService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/qna")
@RequiredArgsConstructor
public class QnAController {
    private final QnAService qnaService;

    @PostMapping
    public QnAResponseDto create(@RequestBody QnARequestDto dto) {
        return qnaService.createQnA(dto);
    }
}