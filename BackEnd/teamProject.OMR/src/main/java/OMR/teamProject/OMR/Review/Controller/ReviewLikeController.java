package OMR.teamProject.OMR.Review.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import OMR.teamProject.OMR.Review.Service.ReviewLikeService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/review/like")
@RequiredArgsConstructor
public class ReviewLikeController {

    private final ReviewLikeService likeService;

    // 좋아요 등록
    @PostMapping("/{reviewId}/{userId}")
    public ResponseEntity<String> likeReview(
        @PathVariable Long reviewId,
        @PathVariable String userId
    ) {
        System.out.println("[likeReview] reviewId: " + reviewId + ", userId: " + userId);
        boolean result = likeService.likeReview(reviewId, userId);
        if (result) {
            return ResponseEntity.ok("좋아요 등록 성공");
        } else {
            return ResponseEntity.badRequest().body("이미 좋아요를 누른 상태입니다.");
        }
    }

    // 좋아요 취소
    @DeleteMapping("/{reviewId}/{userId}")
    public ResponseEntity<String> unlikeReview(
        @PathVariable Long reviewId,
        @PathVariable String userId
    ) {
        boolean result = likeService.unlikeReview(reviewId, userId);
        if (result) {
            return ResponseEntity.ok("좋아요 취소 성공");
        } else {
            return ResponseEntity.badRequest().body("좋아요가 되어 있지 않습니다.");
        }
    }

    // 좋아요 여부 조회
    @GetMapping("/{reviewId}/{userId}")
    public ResponseEntity<Boolean> isLiked(
        @PathVariable Long reviewId,
        @PathVariable String userId
    ) {
        boolean liked = likeService.isLikedByUser(reviewId, userId);
        return ResponseEntity.ok(liked);
    }
}