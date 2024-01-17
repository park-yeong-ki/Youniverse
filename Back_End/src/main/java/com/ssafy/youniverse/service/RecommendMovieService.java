package com.ssafy.youniverse.service;

import com.ssafy.youniverse.entity.Member;
import com.ssafy.youniverse.entity.Movie;
import com.ssafy.youniverse.entity.RecommendMovie;
import com.ssafy.youniverse.entity.YoutubeKeyword;
import com.ssafy.youniverse.repository.RecommendMovieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class RecommendMovieService {
    private final MemberService memberService;
    private final MovieService movieService;

    //추천영화 업데이트
    public List<RecommendMovie> updateRecommendMovies(List<RecommendMovie> recommendMovies, String email) {
        Member findMember = memberService.readMemberByEmail(email);
        findMember.getRecommendMovies().clear();

        for (RecommendMovie recommendMovie : recommendMovies) {
            Movie findMovie = movieService.readMovie(recommendMovie.getMovie().getMovieId());
            recommendMovie.setMember(findMember);
            recommendMovie.setMovie(findMovie);
            findMember.getRecommendMovies().add(recommendMovie);
        }

        return findMember.getRecommendMovies();
    }
}
