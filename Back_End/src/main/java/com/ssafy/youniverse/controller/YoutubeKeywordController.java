package com.ssafy.youniverse.controller;

import com.ssafy.youniverse.dto.req.MemberYoutubeKeywordReqDto;
import com.ssafy.youniverse.dto.res.YoutubeKeywordResDto;
import com.ssafy.youniverse.entity.YoutubeKeyword;
import com.ssafy.youniverse.mapper.YoutubeKeywordMapper;
import com.ssafy.youniverse.service.YoutubeKeywordService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/youtube-keyword")
@RequiredArgsConstructor
public class YoutubeKeywordController {
    private final YoutubeKeywordService youtubeKeywordService;
    private final YoutubeKeywordMapper youtubeKeywordMapper;

    @PostMapping("/update")
    public ResponseEntity<?> updateYoutubeKeyword(@RequestBody MemberYoutubeKeywordReqDto memberYoutubeKeywordReqDto) {
        List<YoutubeKeyword> youtubeKeywords = youtubeKeywordMapper.youtubeKeywordReqDtosToYoutubeKeywords(memberYoutubeKeywordReqDto.getYoutubeKeywordList());
        List<YoutubeKeyword> updatedYoutubeKeywords = youtubeKeywordService.updateYoutubeKeyword(youtubeKeywords, memberYoutubeKeywordReqDto.getEmail());
        List<YoutubeKeywordResDto> youtubeKeywordResDtos = youtubeKeywordMapper.youtubeKeywordsToYoutubeKeywordResDtos(updatedYoutubeKeywords);
        return new ResponseEntity<>(youtubeKeywordResDtos, HttpStatus.OK);
    }
}
