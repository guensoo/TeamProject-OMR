package OMR.teamProject.OMR.Review.Controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import OMR.teamProject.OMR.Review.DTO.ReviewRequestDto;
import OMR.teamProject.OMR.Review.DTO.ReviewResponseDto;
import OMR.teamProject.OMR.Review.Service.ReviewService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;

    @PostMapping
    public ReviewResponseDto create(@RequestBody ReviewRequestDto dto) {
        return reviewService.create(dto);
    }
}
