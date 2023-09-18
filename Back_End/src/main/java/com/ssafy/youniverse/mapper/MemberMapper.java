package com.ssafy.youniverse.mapper;

import com.ssafy.youniverse.dto.req.MemberReqDto;
import com.ssafy.youniverse.dto.res.KeywordResDto;
import com.ssafy.youniverse.dto.res.MemberResDto;
import com.ssafy.youniverse.dto.res.OttResDto;
import com.ssafy.youniverse.entity.*;
import org.mapstruct.Mapper;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface MemberMapper {
    default Member memberReqDtoToMember(MemberReqDto memberReqDto){
        if ( memberReqDto == null ) {
            return null;
        }

        Member member = new Member();

        member.setMemberId( memberReqDto.getMemberId() );
        member.setNickname( memberReqDto.getNickname() );
        member.setEmail( memberReqDto.getEmail() );
        member.setGender( memberReqDto.getGender() );
        member.setAge( memberReqDto.getAge() );
        member.setIntroduce( memberReqDto.getIntroduce() );

        if (memberReqDto.getOttList() != null) { //ott 목록이 존재하는 경우
            List<OttMember> ottMembers = new ArrayList<>();
            for (int ottId : memberReqDto.getOttList()) {
                Ott ott = new Ott();
                ott.setOttId(ottId);
                OttMember ottMember = new OttMember();
                ottMember.setOtt(ott);
                ottMember.setMember(member);
                ottMembers.add(ottMember);
            }
            member.setOttMembers(ottMembers);    
        }

        if (memberReqDto.getKeywordList() != null) { //키워드 목록이 존재하는 경우
            List<KeywordMember> keywordMembers = new ArrayList<>();
            for (int keywordId : memberReqDto.getKeywordList()) {
                Keyword keyword = new Keyword();
                keyword.setKeywordId(keywordId);
                KeywordMember keywordMember = new KeywordMember();
                keywordMember.setKeyword(keyword);
                keywordMember.setMember(member);
                keywordMembers.add(keywordMember);
            }
            member.setKeywordMembers(keywordMembers);    
        }

        return member;
    }

    default MemberResDto memberToMemberResDto(Member member){
        if ( member == null ) {
            return null;
        }

        MemberResDto memberResDto = new MemberResDto();

        memberResDto.setMemberId( member.getMemberId() );
        memberResDto.setNickname( member.getNickname() );
        memberResDto.setEmail( member.getEmail() );
        memberResDto.setGender( member.getGender() );
        memberResDto.setAge( member.getAge() );
        memberResDto.setIntroduce( member.getIntroduce() );
        memberResDto.setMemberImage( member.getMemberImage() );

        memberResDto.setOttResDtos(member.getOttMembers().stream()
                .map(ottMember -> {
                    Ott ott = ottMember.getOtt();
                    OttResDto ottResDto = new OttResDto();
                    ottResDto.setOttId(ott.getOttId());
                    ottResDto.setOttPrice(ott.getOttPrice());
                    ottResDto.setOttName(ott.getOttName());
                    ottResDto.setOttImage(ott.getOttImage());
                    ottResDto.setOttUrl(ott.getOttUrl());

                    return ottResDto;
                })
                .collect(Collectors.toList())
        );
        
        memberResDto.setKeywordResDtos(member.getKeywordMembers().stream()
                .map(keywordMember -> {
                    Keyword keyword = keywordMember.getKeyword();
                    KeywordResDto keywordResDto = new KeywordResDto();
                    keywordResDto.setKeywordId(keyword.getKeywordId());
                    keywordResDto.setKeywordName(keyword.getKeywordName());
                    keywordResDto.setSource(keyword.getSource());

                    return keywordResDto;
                })
                .collect(Collectors.toList())
        );

        return memberResDto;
    }
}
