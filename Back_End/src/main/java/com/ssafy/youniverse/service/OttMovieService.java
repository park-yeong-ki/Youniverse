package com.ssafy.youniverse.service;
import com.ssafy.youniverse.entity.OttMovie;
import com.ssafy.youniverse.repository.OttMovieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional
@Service
@RequiredArgsConstructor
public class OttMovieService {
    private final OttMovieRepository ottMovieRepository;

    //OttMovie 저장
    public OttMovie createOttMovie(OttMovie ottMovie) {
        return ottMovieRepository.save(ottMovie);
    }

    //OttMovie 개별 조회
    @Transactional(readOnly = true)
    public OttMovie readOttMovie(int ottMovieId) {
        Optional<OttMovie> optionalOttMovie = ottMovieRepository.findById(ottMovieId);
        if (!optionalOttMovie.isPresent()) { //존재하지 않는 OttMovie인 경우
            throw new RuntimeException("존재하지 않습니다."); //임시 예외
        }

        return optionalOttMovie.get();
    }

    //OttMovie 전체 조회
    @Transactional(readOnly = true)
    public List<OttMovie> readOttMovies() {
        return ottMovieRepository.findAll();
    }

    //OttMovie 삭제
    public void deleteOttMovie(int ottMovieId) {
        OttMovie ottMovie = readOttMovie(ottMovieId);
        ottMovieRepository.delete(ottMovie);
    }
}
