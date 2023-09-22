package com.ssafy.youniverse.controller;

import com.ssafy.youniverse.dto.req.GenreReqDto;
import com.ssafy.youniverse.dto.res.GenreResDto;
import com.ssafy.youniverse.entity.Genre;
import com.ssafy.youniverse.mapper.GenreMapper;
import com.ssafy.youniverse.service.GenreService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/genres")
public class GenreController {
    private final GenreMapper genreMapper;
    private final GenreService genreService;

    //등록
    @PostMapping("/register")
    public ResponseEntity<?> registerGenre(@RequestBody GenreReqDto genreReqDto) {
        Genre genre = genreMapper.genreReqDtoToGenre(genreReqDto);
        Genre createdGenre = genreService.createGenre(genre);
        GenreResDto genreResDto = genreMapper.genreToGenreResDto(createdGenre);
        return new ResponseEntity<>(genreResDto, HttpStatus.OK);
    }

    //조회
    @GetMapping("/{genre-id}")
    public ResponseEntity<?> findGenre(@PathVariable("genre-id") int genreId) {
        Genre findGenre = genreService.readGenre(genreId);
        GenreResDto genreResDto = genreMapper.genreToGenreResDto(findGenre);
        return new ResponseEntity<>(genreResDto, HttpStatus.OK);
    }

    //전체조회
    @GetMapping
    public ResponseEntity<?> findGenres() {
        List<Genre> genres = genreService.readGenres();
        List<GenreResDto> genreResDtos = genreMapper.genresToGenreResDtos(genres);
        return new ResponseEntity<>(genreResDtos, HttpStatus.OK);
    }

    //수정
    @PutMapping("/{genre-id}")
    public ResponseEntity<?> modifyGenre(@PathVariable("genre-id") int genreId, @RequestBody GenreReqDto genreReqDto) {
        genreReqDto.setGenreId(genreId);
        Genre genre = genreMapper.genreReqDtoToGenre(genreReqDto);
        Genre updatedGenre = genreService.updateGenre(genre);
        GenreResDto genreResDto = genreMapper.genreToGenreResDto(updatedGenre);
        return new ResponseEntity<>(genreResDto, HttpStatus.OK);
    }

    //삭제
    @DeleteMapping("/{genre-id}")
    public ResponseEntity<?> removeGenre(@PathVariable("genre-id") int genreId) {
        genreService.deleteGenre(genreId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
