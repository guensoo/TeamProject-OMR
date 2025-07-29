package OMR.teamProject.OMR.FAQ.Controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import OMR.teamProject.OMR.FAQ.DTO.FAQDto;
import OMR.teamProject.OMR.FAQ.Service.FAQService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/faqs")
@RequiredArgsConstructor
public class FAQController {
    private final FAQService faqService;

    @GetMapping
    public List<FAQDto> getAll() {
        return faqService.getAllFaqs();
    }
}
