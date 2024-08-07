package com.ssafy.youniverse.service;

import com.ssafy.youniverse.entity.DirectorMovie;
import com.ssafy.youniverse.repository.DirectorMovieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class DirectorMovieService {
    private final DirectorMovieRepository directorMovieRepository;

    //생성
    public DirectorMovie createDirectorMovie(DirectorMovie directorMovie) {
        return directorMovieRepository.save(directorMovie);
    }

    //조회
    @Transactional(readOnly = true)
    public DirectorMovie readDirectorMovie(long directorMovieId) {
        Optional<DirectorMovie> optionalDirectorMovie = directorMovieRepository.findById(directorMovieId);
        if (!optionalDirectorMovie.isPresent()) { //존재하지 않는 경우
            throw new RuntimeException("존재하지 않습니다."); //임시예외
        }
        return optionalDirectorMovie.get();
    }

    //삭제
    public void deleteDirectorMovie(long directorMovieId) {
        DirectorMovie directorMovie = readDirectorMovie(directorMovieId);
        directorMovieRepository.delete(directorMovie);
    }
}
