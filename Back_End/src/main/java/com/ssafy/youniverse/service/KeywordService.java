package com.ssafy.youniverse.service;

import com.ssafy.youniverse.entity.Keyword;
import com.ssafy.youniverse.repository.KeywordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class KeywordService {
    private final KeywordRepository keywordRepository;

    //키워드 등록
    public Keyword createKeyword(Keyword keyword) {
        Optional<Keyword> optionalKeyword = keywordRepository.findByKeywordName(keyword.getKeywordName());
        if (optionalKeyword.isPresent()) { //중복된 키워드 이름이 존재하는 경우
            Keyword findKeyword = optionalKeyword.get();
            return findKeyword;
        }

        return keywordRepository.save(keyword);
    }

    //키워드 개별 조회
    public Keyword readKeyword(int keywordId) {
        Optional<Keyword> optionalKeyword = keywordRepository.findById(keywordId);
        if (!optionalKeyword.isPresent()) { //키워드가 존재하지 않는 경우
            throw new RuntimeException("존재하지 않는 키워드입니다."); //임시 예외
        }

        return optionalKeyword.get();
    }

    //키워드 전체 조회
    public List<Keyword> readKeywords(boolean isRandom) {
        if (isRandom) {
            return keywordRepository.findAllByRandomQueryDsl();
        } else {
            return keywordRepository.findAll();
        }
    }

    //키워드 수정
    public Keyword modifyKeyword(int keywordId, Keyword keyword) {
        Keyword findKeyword = readKeyword(keywordId);
        findKeyword.setKeywordName(keyword.getKeywordName());
        return keywordRepository.save(findKeyword);
    }

    //키워드 삭제
    public void deleteKeyword(int keywordId) {
        Keyword keyword = readKeyword(keywordId);
        keywordRepository.delete(keyword);
    }
}
