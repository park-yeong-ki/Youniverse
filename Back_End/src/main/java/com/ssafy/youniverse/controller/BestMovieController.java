package com.ssafy.youniverse.controller;

import com.ssafy.youniverse.dto.req.MyMovieReqDto;
import com.ssafy.youniverse.dto.res.BestMovieResDto;
import com.ssafy.youniverse.entity.BestMovie;
import com.ssafy.youniverse.mapper.BestMovieMapper;
import com.ssafy.youniverse.service.BestMovieService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/best-movies")
public class BestMovieController {
    private final BestMovieMapper bestMovieMapper;
    private final BestMovieService bestMovieService;

    //인생영화 등록
    @PostMapping("/register")
    public ResponseEntity<?> registerBestMovie(@RequestBody MyMovieReqDto myMovieReqDto) {
        BestMovie bestMovie = bestMovieMapper.myMovieReqDtoToBestMovie(myMovieReqDto);
        BestMovie createdBestMovie = bestMovieService.createBestMovie(bestMovie);
        BestMovieResDto bestMovieResDto = bestMovieMapper.bestMovieToBestMovieResDto(createdBestMovie);
        return new ResponseEntity<>(bestMovieResDto, HttpStatus.OK);
    }

    //인생영화 조회
    @GetMapping("/{best-movie-id}")
    public ResponseEntity<?> findBestMovie(@PathVariable("best-movie-id") long bestMovieId) {
        BestMovie bestMovie = bestMovieService.readBestMovie(bestMovieId);
        BestMovieResDto bestMovieResDto = bestMovieMapper.bestMovieToBestMovieResDto(bestMovie);
        return new ResponseEntity<>(bestMovieResDto, HttpStatus.OK);
    }

    //인생영화 삭제
    @DeleteMapping("/{best-movie-id}")
    public ResponseEntity<?> removeBestMovie(@PathVariable("best-movie-id") long bestMovieId) {
        bestMovieService.deleteBestMovie(bestMovieId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
