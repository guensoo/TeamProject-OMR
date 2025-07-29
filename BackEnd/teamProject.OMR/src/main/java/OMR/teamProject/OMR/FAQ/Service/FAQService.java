package OMR.teamProject.OMR.FAQ.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import OMR.teamProject.OMR.FAQ.DTO.FAQDto;
import OMR.teamProject.OMR.FAQ.Entity.FAQEntity;
import OMR.teamProject.OMR.FAQ.Repository.FAQRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FAQService {
    private final FAQRepository faqRepository;

    public List<FAQDto> getAllFaqs() {
        return faqRepository.findAllByOrderBySortOrderAsc()
            .stream().map(this::toDto).toList();
    }

    private FAQDto toDto(FAQEntity faq) {
        FAQDto dto = new FAQDto();
        dto.setId(faq.getId());
        dto.setQuestion(faq.getQuestion());
        dto.setAnswer(faq.getAnswer());
        dto.setSortOrder(faq.getSortOrder());
        return dto;
    }
}
