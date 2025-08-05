package OMR.teamProject.OMR.ReviewComment.Controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import OMR.teamProject.OMR.ReviewComment.DTO.ReviewCommentRequestDto;
import OMR.teamProject.OMR.ReviewComment.DTO.ReviewCommentResponseDto;
import OMR.teamProject.OMR.ReviewComment.Service.ReviewCommentService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/review-comments")
@RequiredArgsConstructor
public class ReviewCommentController {
    private final ReviewCommentService reviewCommentService;

    @PostMapping
    public ReviewCommentResponseDto create(@RequestBody ReviewCommentRequestDto dto) {
        return reviewCommentService.create(dto);
    }
}
