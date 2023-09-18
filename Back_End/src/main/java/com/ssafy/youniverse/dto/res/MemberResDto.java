package com.ssafy.youniverse.dto.res;

import com.ssafy.youniverse.entity.OttMember;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class MemberResDto {
    private Integer memberId;
    private String nickname;
    private String email;
    private String gender;
    private Byte age;
    private String introduce;
    private String memberImage;
    private List<OttResDto> ottResDtos;
    private List<KeywordResDto> keywordResDtos;
    private List<MemberResDto> followers;
    private List<MemberResDto> followings;
}
