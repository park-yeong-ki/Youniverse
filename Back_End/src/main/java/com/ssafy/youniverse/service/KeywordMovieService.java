package com.ssafy.youniverse.service;
import com.ssafy.youniverse.entity.KeywordMovie;
import com.ssafy.youniverse.repository.KeywordMovieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional
@Service
@RequiredArgsConstructor
public class KeywordMovieService {
    private final KeywordMovieRepository keywordMovieRepository;

    //키워드, 무비 저장
    public KeywordMovie createKeywordMovie(KeywordMovie keywordMovie){
        return keywordMovieRepository.save(keywordMovie);
    }

    //키워드, 무비 개별 조회
    public KeywordMovie readKeywordMovie(int keywordMovieId) {
        Optional<KeywordMovie> optionalKeywordMovie = keywordMovieRepository.findById(keywordMovieId);
        if (!optionalKeywordMovie.isPresent()) { //존재하지 않는 경우
            throw new RuntimeException("존재하지 않습니다."); //임시 예외
        }

        return optionalKeywordMovie.get();
    }

    //키워드 무비 전체 조회
    public List<KeywordMovie> readKeywordMovies() {
        return keywordMovieRepository.findAll();
    }

    //키워드, 무비 삭제
    public void deleteKeywordMovie(int keywordMovieId) {
        KeywordMovie keywordMovie = readKeywordMovie(keywordMovieId);
        keywordMovieRepository.delete(keywordMovie);
    }
}
