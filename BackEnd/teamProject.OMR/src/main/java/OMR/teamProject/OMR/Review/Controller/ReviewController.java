package OMR.teamProject.OMR.Review.Controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import OMR.teamProject.OMR.Review.DTO.CommentRequestDto;
import OMR.teamProject.OMR.Review.DTO.CommentResponseDto;
import OMR.teamProject.OMR.Review.DTO.ReviewRequestDto;
import OMR.teamProject.OMR.Review.DTO.ReviewResponseDto;
import OMR.teamProject.OMR.Review.DTO.ReviewUpdateRequest;
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
    public ResponseEntity<ReviewResponseDto> updateReview(@PathVariable("id") Long id,
            											  @RequestBody ReviewUpdateRequest request) {
        ReviewResponseDto updated = reviewService.updateReview(id, request);
        if (updated == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updated);
    }

    // 5. 리뷰 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteReview(@PathVariable("id") Long id) {
        boolean deleted = reviewService.deleteReview(id);
        if (!deleted) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body("삭제 성공");
    }
    
    // 리뷰 댓글 조회
    @GetMapping("/{reviewId}/comments")
    public List<CommentResponseDto> getComments(@PathVariable("reviewId") Long reviewId) {
        return reviewService.getCommentsByReviewId(reviewId);
    }

    // 리뷰 댓글 등록
    @PostMapping("/{reviewId}/comments")
    public CommentResponseDto postComment(@PathVariable("reviewId") Long reviewId,
    									  @RequestBody CommentRequestDto dto) {
        return reviewService.createComment(reviewId, dto);
    }
    
    @DeleteMapping("/{reviewId}/comments/{commentId}")
    public ResponseEntity<?> deleteComment(@PathVariable("reviewId") Long reviewId,
    									   @PathVariable("commentId") Long commentId) {
    	reviewService.deleteComment(reviewId, commentId);
        return ResponseEntity.ok().build();
    }
}
