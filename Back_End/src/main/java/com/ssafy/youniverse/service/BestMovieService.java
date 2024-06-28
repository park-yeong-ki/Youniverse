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

        isFull(member); //인생영화 개수 판별

        Movie movie = movieService.readMovie(bestMovie.getMovie().getMovieId());

        isSameMovie(movie, member); //이미 등록한 인생영화 여부 판별

        bestMovie.setMember(member);
        bestMovie.setMovie(movie);

        return bestMovieRepository.save(bestMovie);
    }

    //BestMovie 개별 조회
    @Transactional(readOnly = true)
    public BestMovie readBestMovie(long bestMovieId) {
        Optional<BestMovie> optionalBestMovie = bestMovieRepository.findById(bestMovieId);
        if (!optionalBestMovie.isPresent()) { //존재하지 않는 BestMovie인 경우
            throw new RuntimeException("존재하지 않습니다."); //임시 예외
        }

        return optionalBestMovie.get();
    }

    //BestMovie 삭제
    public void deleteBestMovie(long bestMovieId) {
        BestMovie bestMovie = readBestMovie(bestMovieId);
        bestMovieRepository.delete(bestMovie);
    }

    //인생영화 5개 여부
    private void isFull(Member member) {
        List<BestMovie> bestMovies = bestMovieRepository.findAllByMember(member); //회원별 인생영화 목록 조회
        if (bestMovies.size() >= 5) { //5개 미만인 경우
            throw new RuntimeException("더이상 인생영화를 추가할 수 없습니다."); //임시 예외
        }
    }

    //동일한 인생 영화 등록 여부
    private void isSameMovie(Movie movie, Member member) {
        Optional<BestMovie> optionalBestMovie = bestMovieRepository.findByMovieAndMember(movie, member);
        if (optionalBestMovie.isPresent()) {
            throw new RuntimeException("이미 등록된 인생영화입니다."); //임시 예외
        }
    }
}
