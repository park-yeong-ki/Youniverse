package com.ssafy.youniverse.dto.res;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class MemberResDto {
    private Long memberId;
    private String nickname;
    private String email;
    private String gender;
    private Byte age;
    private String introduce;
    private String memberImage;
    private List<OttResDto> ottResDtos;
    private List<KeywordResDto> keywordResDtos;
    private List<FollowResDto> followers;
    private List<FollowResDto> followings;
    private List<HeartMovieResDto> heartMovieResDtos;
    private List<BestMovieResDto> bestMovieResDtos;
    private List<ReviewResDto> reviewResDtos;
    private List<YoutubeKeywordResDto> youtubeKeywordResDtos;
    private List<RecommendOttResDto> recommendOttResDtos;
}
