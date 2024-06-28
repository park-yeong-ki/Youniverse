package com.ssafy.youniverse.controller;

import com.ssafy.youniverse.dto.req.MyMovieReqDto;
import com.ssafy.youniverse.dto.res.ReviewResDto;
import com.ssafy.youniverse.entity.Review;
import com.ssafy.youniverse.mapper.ReviewMapper;
import com.ssafy.youniverse.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/reviews")
public class ReviewController {
    private final ReviewMapper reviewMapper;
    private final ReviewService reviewService;

    //리뷰 등록
    @PostMapping("/register")
    public ResponseEntity<?> registerReview(@RequestBody MyMovieReqDto myMovieReqDto) {
        Review review = reviewMapper.myMovieReqDtoToReview(myMovieReqDto);
        Review createdReview = reviewService.createReview(review);
        ReviewResDto reviewResDto = reviewMapper.reviewToReviewResDto(createdReview);
        return new ResponseEntity<>(reviewResDto, HttpStatus.OK);
    }

    //리뷰 조회
    @GetMapping("/{review-id}")
    public ResponseEntity<?> findReview(@PathVariable("review-id") long reviewId) {
        Review review = reviewService.readReview(reviewId);
        ReviewResDto reviewResDto = reviewMapper.reviewToReviewResDto(review);
        return new ResponseEntity<>(reviewResDto, HttpStatus.OK);
    }

    //리뷰 수정
    @PutMapping("/{review-id}")
    public ResponseEntity<?> modifyReview(@PathVariable("review-id") long reviewId, @RequestBody MyMovieReqDto myMovieReqDto) {
        Review review = reviewMapper.myMovieReqDtoToReview(myMovieReqDto);
        review.setReviewId(reviewId);
        Review updatedReview = reviewService.updateReview(review);
        ReviewResDto reviewResDto = reviewMapper.reviewToReviewResDto(updatedReview);
        return new ResponseEntity<>(reviewResDto, HttpStatus.OK);
    }

    //리뷰 삭제
    @DeleteMapping("/{review-id}")
    public ResponseEntity<?> removeHeartMovie(@PathVariable("review-id") long reviewId) {
        reviewService.deleteReview(reviewId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
