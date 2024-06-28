package com.ssafy.youniverse.controller;

import com.ssafy.youniverse.dto.req.MyMovieReqDto;
import com.ssafy.youniverse.dto.res.HateMovieResDto;
import com.ssafy.youniverse.entity.HateMovie;
import com.ssafy.youniverse.mapper.HateMovieMapper;
import com.ssafy.youniverse.service.HateMovieService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/hate-movies")
public class HateMovieController {
    private final HateMovieMapper hateMovieMapper;
    private final HateMovieService hateMovieService;

    //싫어요 등록
    @PostMapping("/register")
    public ResponseEntity<?> registerHateMovie(@RequestBody MyMovieReqDto myMovieReqDto) {
        HateMovie hateMovie = hateMovieMapper.myMovieReqDtoToHateMovie(myMovieReqDto);
        HateMovie createdHateMovie = hateMovieService.createHateMovie(hateMovie);
        HateMovieResDto hateMovieResDto = hateMovieMapper.hateMovieToHateMovieResDto(createdHateMovie);
        return new ResponseEntity<>(hateMovieResDto, HttpStatus.OK);
    }

    //싫어요 조회
    @GetMapping("/{hate-movie-id}")
    public ResponseEntity<?> findHateMovie(@PathVariable("hate-movie-id") long hateMovieId) {
        HateMovie hateMovie = hateMovieService.readHateMovie(hateMovieId);
        HateMovieResDto hateMovieResDto = hateMovieMapper.hateMovieToHateMovieResDto(hateMovie);
        return new ResponseEntity<>(hateMovieResDto, HttpStatus.OK);
    }

    //싫어요 삭제
    @DeleteMapping("/{hate-movie-id}")
    public ResponseEntity<?> removeHateMovie(@PathVariable("hate-movie-id") long hateMovieId) {
        hateMovieService.deleteHateMovie(hateMovieId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
