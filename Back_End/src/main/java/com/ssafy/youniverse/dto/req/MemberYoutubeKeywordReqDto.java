package com.ssafy.youniverse.dto.req;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class MemberYoutubeKeywordReqDto {
    private String email;
    private List<YoutubeKeywordReqDto> youtubeKeywordList;
}
