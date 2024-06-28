package com.ssafy.youniverse.dto.res;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class MemberSimpleResDto {
    private Long memberId;
    private String nickname;
    private String memberImage;
    private List<KeywordResDto> keywordResDtos;
}
