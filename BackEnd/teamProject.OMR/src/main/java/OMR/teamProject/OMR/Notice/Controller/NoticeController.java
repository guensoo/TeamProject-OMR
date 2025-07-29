package OMR.teamProject.OMR.Notice.Controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import OMR.teamProject.OMR.Notice.DTO.NoticeDto;
import OMR.teamProject.OMR.Notice.Service.NoticeService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/notices")
@RequiredArgsConstructor
public class NoticeController {
    private final NoticeService noticeService;

    @GetMapping
    public List<NoticeDto> getAll() {
        return noticeService.getAllNotices();
    }
}
