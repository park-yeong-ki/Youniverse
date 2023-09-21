package com.ssafy.youniverse.service;

import com.ssafy.youniverse.entity.BestMovie;
import com.ssafy.youniverse.entity.Member;
import com.ssafy.youniverse.entity.Movie;
import com.ssafy.youniverse.repository.BestMovieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional
@Service
@RequiredArgsConstructor
public class BestMovieService {
    private final BestMovieRepository bestMovieRepository;
    private final MemberService memberService;
    private final MovieService movieService;

    //BestMovie 저장
    public BestMovie createBestMovie(BestMovie bestMovie) {
        Member member = memberService.readMember(bestMovie.getMember().getMemberId());
        Movie movie = movieService.readMovie(bestMovie.getMovie().getMovieId());

        bestMovie.setMember(member);
        bestMovie.setMovie(movie);

        return bestMovieRepository.save(bestMovie);
    }

    //BestMovie 개별 조회
    public BestMovie readBestMovie(int bestMovieId) {
        Optional<BestMovie> optionalBestMovie = bestMovieRepository.findById(bestMovieId);
        if (!optionalBestMovie.isPresent()) { //존재하지 않는 BestMovie인 경우
            throw new RuntimeException("존재하지 않습니다."); //임시 예외
        }

        return optionalBestMovie.get();
    }

    //BestMovie 삭제
    public void deleteBestMovie(int bestMovieId) {
        BestMovie bestMovie = readBestMovie(bestMovieId);
        bestMovieRepository.delete(bestMovie);
    }
}
