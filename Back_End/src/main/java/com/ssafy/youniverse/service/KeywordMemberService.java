package com.ssafy.youniverse.service;

import com.ssafy.youniverse.entity.KeywordMember;
import com.ssafy.youniverse.repository.KeywordMemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class KeywordMemberService {
    private final KeywordMemberRepository keywordMemberRepository;

    //키워드, 멤버 저장
    public KeywordMember createKeywordMember(KeywordMember keywordMember){
        return keywordMemberRepository.save(keywordMember);
    }

    //키워드, 멤버 개별 조회
    @Transactional(readOnly = true)
    public KeywordMember readKeywordMember(long keywordMemberId) {
        Optional<KeywordMember> optionalKeywordMember = keywordMemberRepository.findById(keywordMemberId);
        if (!optionalKeywordMember.isPresent()) { //존재하지 않는 경우
            throw new RuntimeException("존재하지 않습니다."); //임시 예외
        }

        return optionalKeywordMember.get();
    }

    //키워드 멤버 전체 조회
    @Transactional(readOnly = true)
    public List<KeywordMember> readKeywordMembers() {
        return keywordMemberRepository.findAll();
    }

    //키워드, 멤버 삭제
    public void deleteKeywordMember(long keywordMemberId) {
        KeywordMember keywordMember = readKeywordMember(keywordMemberId);
        keywordMemberRepository.delete(keywordMember);
    }
}
