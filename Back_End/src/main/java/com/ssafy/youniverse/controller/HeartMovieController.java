package com.ssafy.youniverse.controller;

import com.ssafy.youniverse.dto.req.MyMovieReqDto;
import com.ssafy.youniverse.dto.res.HeartMovieResDto;
import com.ssafy.youniverse.entity.HeartMovie;
import com.ssafy.youniverse.mapper.HeartMovieMapper;
import com.ssafy.youniverse.service.HeartMovieService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/heart-movies")
public class HeartMovieController {
    private final HeartMovieMapper heartMovieMapper;
    private final HeartMovieService heartMovieService;

    //좋아요 등록
    @PostMapping("/register")
    public ResponseEntity<?> registerHeartMovie(@RequestBody MyMovieReqDto myMovieReqDto) {
        HeartMovie heartMovie = heartMovieMapper.myMovieReqDtoToHeartMovie(myMovieReqDto);
        HeartMovie createdHeartMovie = heartMovieService.createHeartMovie(heartMovie);
        HeartMovieResDto heartMovieResDto = heartMovieMapper.heartMovieToHeartMovieResDto(createdHeartMovie);
        return new ResponseEntity<>(heartMovieResDto, HttpStatus.OK);
    }

    //좋아요 조회
    @GetMapping("/{heart-movie-id}")
    public ResponseEntity<?> findHeartMovie(@PathVariable("heart-movie-id") int heartMovieId) {
        HeartMovie heartMovie = heartMovieService.readHeartMovie(heartMovieId);
        HeartMovieResDto heartMovieResDto = heartMovieMapper.heartMovieToHeartMovieResDto(heartMovie);
        return new ResponseEntity<>(heartMovieResDto, HttpStatus.OK);
    }

    //좋아요 삭제
    @DeleteMapping("/{heart-movie-id}")
    public ResponseEntity<?> removeHeartMovie(@PathVariable("heart-movie-id") int heartMovieId) {
        heartMovieService.deleteHeartMovie(heartMovieId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
