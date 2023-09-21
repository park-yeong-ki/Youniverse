package com.ssafy.youniverse.service;
import com.ssafy.youniverse.entity.HeartMovie;
import com.ssafy.youniverse.entity.Member;
import com.ssafy.youniverse.entity.Movie;
import com.ssafy.youniverse.repository.HeartMovieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional
@Service
@RequiredArgsConstructor
public class HeartMovieService {
    private final HeartMovieRepository heartMovieRepository;
    private final MemberService memberService;
    private final MovieService movieService;

    //HeartMovie 저장
    public HeartMovie createHeartMovie(HeartMovie heartMovie) {
        Member member = memberService.readMember(heartMovie.getMember().getMemberId());
        Movie movie = movieService.readMovie(heartMovie.getMovie().getMovieId());

        heartMovie.setMember(member);
        heartMovie.setMovie(movie);

        return heartMovieRepository.save(heartMovie);
    }

    //HeartMovie 개별 조회
    public HeartMovie readHeartMovie(int heartMovieId) {
        Optional<HeartMovie> optionalHeartMovie = heartMovieRepository.findById(heartMovieId);
        if (!optionalHeartMovie.isPresent()) { //존재하지 않는 HeartMovie인 경우
            throw new RuntimeException("존재하지 않습니다."); //임시 예외
        }

        return optionalHeartMovie.get();
    }

    //HeartMovie 삭제
    public void deleteHeartMovie(int heartMovieId) {
        HeartMovie heartMovie = readHeartMovie(heartMovieId);
        heartMovieRepository.delete(heartMovie);
    }
}
