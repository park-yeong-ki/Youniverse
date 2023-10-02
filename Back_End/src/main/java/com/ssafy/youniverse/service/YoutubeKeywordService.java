package com.ssafy.youniverse.service;

import com.ssafy.youniverse.entity.Member;
import com.ssafy.youniverse.entity.YoutubeKeyword;
import com.ssafy.youniverse.repository.YoutubeKeywordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class YoutubeKeywordService {
    private final YoutubeKeywordRepository youtubeKeywordRepository;
    private final MemberService memberService;

    //유튜브키워드 10개 업데이트
    public List<YoutubeKeyword> updateYoutubeKeyword(List<YoutubeKeyword> youtubeKeywords, String email) {
        Member findMember = memberService.readMemberByEmail(email);
        findMember.getYoutubeKeywords().clear();

        for (YoutubeKeyword youtubeKeyword : youtubeKeywords) {
            youtubeKeyword.setMember(findMember);
            findMember.getYoutubeKeywords().add(youtubeKeyword);
        }

        return findMember.getYoutubeKeywords();
    }
}
