package com.ssafy.youniverse.service;
import com.ssafy.youniverse.entity.Member;
import com.ssafy.youniverse.entity.Movie;
import com.ssafy.youniverse.entity.Review;
import com.ssafy.youniverse.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional
@Service
@RequiredArgsConstructor
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final MemberService memberService;
    private final MovieService movieService;

    //Review 저장
    public Review createReview(Review review) {
        Member member = memberService.readMember(review.getMember().getMemberId());
        Movie movie = movieService.readMovie(review.getMovie().getMovieId());

        review.setMember(member);
        review.setMovie(movie);

        return reviewRepository.save(review);
    }

    //Review 개별 조회
    @Transactional(readOnly = true)
    public Review readReview(long reviewId) {
        Optional<Review> optionalReview = reviewRepository.findById(reviewId);
        if (!optionalReview.isPresent()) { //존재하지 않는 Review인 경우
            throw new RuntimeException("존재하지 않습니다."); //임시 예외
        }

        return optionalReview.get();
    }

    //Review 수정
    public Review updateReview(Review review){
        Review findReview = readReview(review.getReviewId());
        findReview.setReviewContent(review.getReviewContent());
        findReview.setReviewRate(review.getReviewRate());
        return reviewRepository.save(findReview);
    }

    //Review 삭제
    public void deleteReview(long reviewId) {
        Review review = readReview(reviewId);
        reviewRepository.delete(review);
    }
}
