package OMR.teamProject.OMR.Review.Controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import OMR.teamProject.OMR.Review.DTO.ReviewRequestDto;
import OMR.teamProject.OMR.Review.DTO.ReviewResponseDto;
import OMR.teamProject.OMR.Review.Service.ReviewService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/review")
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;

    // 전체 리뷰 목록 조회 (GET /api/review)
    @GetMapping
    public List<ReviewResponseDto> getAllReviews() {
    	System.out.println("너 조회인데 들어오니?");
        return reviewService.getAllReviews();
    }
    
    @PostMapping
    public ReviewResponseDto reviewCreate(@RequestBody ReviewRequestDto dto) {
    	System.out.println("너 생성인데 들어오니?"+dto);
        return reviewService.reviewCreate(dto);
    }
}
