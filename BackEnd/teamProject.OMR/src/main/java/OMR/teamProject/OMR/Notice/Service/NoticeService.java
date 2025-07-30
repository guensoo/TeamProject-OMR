package OMR.teamProject.OMR.Notice.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import OMR.teamProject.OMR.Notice.DTO.NoticeDto;
import OMR.teamProject.OMR.Notice.Entity.NoticeEntity;
import OMR.teamProject.OMR.Notice.Repository.NoticeRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NoticeService {
    private final NoticeRepository noticeRepository;

    public List<NoticeDto> getAllNotices() {
        return noticeRepository.findAll().stream()
            .map(this::toDto).toList();
    }

    private NoticeDto toDto(NoticeEntity notice) {
        NoticeDto dto = new NoticeDto();
        dto.setId(notice.getId());
        dto.setTitle(notice.getTitle());
        dto.setContent(notice.getContent());
        dto.setCreatedAt(notice.getCreatedAt());
        return dto;
    }
}
