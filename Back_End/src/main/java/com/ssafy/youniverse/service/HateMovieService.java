package com.ssafy.youniverse.service;

import com.ssafy.youniverse.entity.HateMovie;
import com.ssafy.youniverse.entity.Member;
import com.ssafy.youniverse.entity.Movie;
import com.ssafy.youniverse.repository.HateMovieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional
@RequiredArgsConstructor
@Service
public class HateMovieService {
    private final HateMovieRepository hateMovieRepository;
    private final MemberService memberService;
    private final MovieService movieService;

    //HateMovie 저장
    public HateMovie createHateMovie(HateMovie hateMovie) {
        Member member = memberService.readMember(hateMovie.getMember().getMemberId());
        Movie movie = movieService.readMovie(hateMovie.getMovie().getMovieId());

        hateMovie.setMember(member);
        hateMovie.setMovie(movie);

        return hateMovieRepository.save(hateMovie);
    }

    //HateMovie 개별 조회
    @Transactional(readOnly = true)
    public HateMovie readHateMovie(long hateMovieId) {
        Optional<HateMovie> optionalHateMovie = hateMovieRepository.findById(hateMovieId);
        if (!optionalHateMovie.isPresent()) { //존재하지 않는 HateMovie인 경우
            throw new RuntimeException("존재하지 않습니다."); //임시 예외
        }

        return optionalHateMovie.get();
    }

    //HateMovie 삭제
    public void deleteHateMovie(long hateMovieId) {
        HateMovie hateMovie = readHateMovie(hateMovieId);
        hateMovieRepository.delete(hateMovie);
    }
}
