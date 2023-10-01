package com.ssafy.youniverse.controller;

import com.ssafy.youniverse.dto.req.MemberRecommendMovieReqDto;
import com.ssafy.youniverse.dto.req.MemberYoutubeKeywordReqDto;
import com.ssafy.youniverse.dto.res.RecommendMovieResDto;
import com.ssafy.youniverse.dto.res.YoutubeKeywordResDto;
import com.ssafy.youniverse.entity.RecommendMovie;
import com.ssafy.youniverse.entity.YoutubeKeyword;
import com.ssafy.youniverse.mapper.RecommendMovieMapper;
import com.ssafy.youniverse.service.RecommendMovieService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/recommend-movies")
@RequiredArgsConstructor
public class RecommendMovieController {
    private final RecommendMovieMapper recommendMovieMapper;
    private final RecommendMovieService recommendMovieService;

    @PostMapping("/update")
    public ResponseEntity<?> updateRecommendMovie(@RequestBody MemberRecommendMovieReqDto memberRecommendMovieReqDto) {
        List<RecommendMovie> recommendMovies = recommendMovieMapper.movieIdListToRecommendMovies(memberRecommendMovieReqDto.getMovieIdList());
        List<RecommendMovie> updatedRecommendMovies = recommendMovieService.updateRecommendMovies(recommendMovies, memberRecommendMovieReqDto.getEmail());
        List<RecommendMovieResDto> recommendMovieResDtos = recommendMovieMapper.recommendMoviesToRecommendMovieResDtos(updatedRecommendMovies);
        return new ResponseEntity<>(recommendMovieResDtos, HttpStatus.OK);
    }
}
