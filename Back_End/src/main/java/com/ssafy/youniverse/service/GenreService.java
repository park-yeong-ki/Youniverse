package com.ssafy.youniverse.service;

import com.ssafy.youniverse.entity.Genre;
import com.ssafy.youniverse.repository.GenreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class GenreService {
    private final GenreRepository genreRepository;

    //생성
    public Genre createGenre(Genre genre) {
        return genreRepository.save(genre);
    }

    //조회
    @Transactional(readOnly = true)
    public Genre readGenre(long genreId) {
        Optional<Genre> optionalGenre = genreRepository.findById(genreId);
        if (!optionalGenre.isPresent()) { //존재하지 않는 경우
            throw new RuntimeException("존재하지 않습니다."); //임시예외
        }
        return optionalGenre.get();
    }

    //전체조회
    @Transactional(readOnly = true)
    public List<Genre> readGenres() {
        return genreRepository.findAll();
    }

    //수정
    public Genre updateGenre(Genre genre) {
        Genre findGenre = readGenre(genre.getGenreId());
        findGenre.setGenreName(genre.getGenreName());
        return genreRepository.save(findGenre);
    }

    //삭제
    public void deleteGenre(long genreId) {
        Genre genre = readGenre(genreId);
        genreRepository.delete(genre);
    }
}
