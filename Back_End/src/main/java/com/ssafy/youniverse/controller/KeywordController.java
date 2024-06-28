package com.ssafy.youniverse.controller;

import com.ssafy.youniverse.dto.req.KeywordReqDto;
import com.ssafy.youniverse.dto.res.KeywordResDto;
import com.ssafy.youniverse.entity.Keyword;
import com.ssafy.youniverse.mapper.KeywordMapper;
import com.ssafy.youniverse.service.KeywordService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/keywords")
@RequiredArgsConstructor
public class KeywordController {
    private final KeywordService keywordService;
    private final KeywordMapper keywordMapper;

    //키워드 등록
    @PostMapping("/register")
    public ResponseEntity<?> registerKeyword(@RequestBody KeywordReqDto keywordReqDto) {
        Keyword keyword = keywordMapper.keywordReqDtoToKeyword(keywordReqDto);
        Keyword createdKeyword = keywordService.createKeyword(keyword);
        KeywordResDto keywordResDto = keywordMapper.keywordToKeywordResDto(createdKeyword);
        return new ResponseEntity<>(keywordResDto, HttpStatus.OK);
    }

    //키워드 조회
    @GetMapping("/{keyword-id}")
    public ResponseEntity<?> findKeyword(@PathVariable("keyword-id") long keywordId) {
        Keyword keyword = keywordService.readKeyword(keywordId);
        KeywordResDto keywordResDto = keywordMapper.keywordToKeywordResDto(keyword);
        return new ResponseEntity<>(keywordResDto, HttpStatus.OK);
    }

    //키워드 전체 조회 -> isRandom = true일 경우 random으로 20개 키워드 선별
    @GetMapping()
    public ResponseEntity<?> findKeywords(@RequestParam(value = "random") boolean isRandom) {
        List<Keyword> keywords = keywordService.readKeywords(isRandom);
        List<KeywordResDto> keywordResDtos = keywordMapper.keywordsToKeywordResDtos(keywords);
        return new ResponseEntity<>(keywordResDtos, HttpStatus.OK);
    }

    //키워드 삭제
    @DeleteMapping("/{keyword-id}")
    public ResponseEntity<?> removeKeyword(@PathVariable("keyword-id") long keywordId) {
        keywordService.deleteKeyword(keywordId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
