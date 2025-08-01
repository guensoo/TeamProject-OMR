package OMR.teamProject.OMR.Review.Controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import OMR.teamProject.OMR.Review.DTO.ReviewRequestDto;
import OMR.teamProject.OMR.Review.DTO.ReviewResponseDto;
import OMR.teamProject.OMR.Review.Service.ReviewService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/review")
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;

    // 1. 전체 리뷰 목록 조회
    @GetMapping
    public List<ReviewResponseDto> getAllReviews() {
        return reviewService.getAllReviews();
    }

    // 2. 단일 리뷰 조회
    @GetMapping("/{id}")
    public ResponseEntity<ReviewResponseDto> getReviewById(@PathVariable Long id) {
        ReviewResponseDto review = reviewService.getReviewById(id);
        if (review == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(review);
    }

    // 3. 리뷰 생성
    @PostMapping
    public ResponseEntity<ReviewResponseDto> createReview(@RequestBody ReviewRequestDto dto) {
        ReviewResponseDto created = reviewService.reviewCreate(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    // 4. 리뷰 수정
    @PutMapping("/{id}")
    public ResponseEntity<ReviewResponseDto> updateReview(
            @PathVariable Long id,
            @RequestBody ReviewRequestDto dto
    ) {
        ReviewResponseDto updated = reviewService.updateReview(id, dto);
        if (updated == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updated);
    }

    // 5. 리뷰 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteReview(@PathVariable Long id) {
        boolean deleted = reviewService.deleteReview(id);
        if (!deleted) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body("삭제 성공");
    }
}
