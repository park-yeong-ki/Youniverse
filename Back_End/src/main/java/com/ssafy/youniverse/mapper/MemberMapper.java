package com.ssafy.youniverse.mapper;

import com.ssafy.youniverse.dto.req.MemberReqDto;
import com.ssafy.youniverse.dto.res.*;
import com.ssafy.youniverse.entity.*;
//import com.ssafy.youniverse.security.Role;
import org.mapstruct.Mapper;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface MemberMapper extends CustomMapper {
    default Member memberReqDtoToMember(MemberReqDto memberReqDto){
        if ( memberReqDto == null ) {
            return null;
        }

        Member member = new Member();

        member.setMemberId( memberReqDto.getMemberId() );
        member.setNickname( memberReqDto.getNickname() );
        member.setEmail( memberReqDto.getEmail() );
//        member.setEmail( oAuth2UserInfo.getEmail() );
        member.setGender( memberReqDto.getGender() );
        member.setAge( memberReqDto.getAge() );
        member.setIntroduce( memberReqDto.getIntroduce() );
//        member.setRole(Role.GUEST);

        if (memberReqDto.getOttList() != null) { //ott 목록이 존재하는 경우
            List<OttMember> ottMembers = new ArrayList<>();
            for (long ottId : memberReqDto.getOttList()) {
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
            for (long keywordId : memberReqDto.getKeywordList()) {
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
                    ottResDto.setOttName(ott.getOttName());
                    ottResDto.setOttImage(ott.getOttImage());

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

                    return keywordResDto;
                })
                .collect(Collectors.toList())
        );

        //나를 팔로워한 목록
        memberResDto.setFollowers(member.getFollowings().stream()
                .map(follow -> {
                    FollowResDto followResDto = new FollowResDto();
                    followResDto.setFollowId(follow.getFollowId());
                    followResDto.setFollowerResDto(memberToMemberSimpleResDto(follow.getFollower()));
                    return followResDto;
                })
                .collect(Collectors.toList())
        );

        //내가 팔로잉한 목록
        memberResDto.setFollowings(member.getFollowers().stream()
                .map(follow -> {
                    FollowResDto followResDto = new FollowResDto();
                    followResDto.setFollowId(follow.getFollowId());
                    followResDto.setFollowingResDto(memberToMemberSimpleResDto(follow.getFollowing()));
                    return followResDto;
                })
                .collect(Collectors.toList())
        );

        //좋아요한 영화 목록
        memberResDto.setHeartMovieResDtos(member.getHeartMovies().stream()
                .map(heartMovie -> {
                    HeartMovieResDto heartMovieResDto = new HeartMovieResDto();
                    heartMovieResDto.setHeartMovieId(heartMovie.getHeartMovieId());
//                    heartMovieResDto.setMemberSimpleResDto(memberToMemberSimpleResDto(heartMovie.getMember()));
                    heartMovieResDto.setMovieSimpleResDto(movieToMovieSimpleResDto(heartMovie.getMovie()));
                    return heartMovieResDto;
                })
                .collect(Collectors.toList())
        );

        //인생 영화 목록
        memberResDto.setBestMovieResDtos(member.getBestMovies().stream()
                .map(bestMovie -> {
                    BestMovieResDto bestMovieResDto = new BestMovieResDto();
                    bestMovieResDto.setBestMovieId(bestMovie.getBestMovieId());
//                    bestMovieResDto.setMemberSimpleResDto(memberToMemberSimpleResDto(bestMovie.getMember()));
                    bestMovieResDto.setMovieSimpleResDto(movieToMovieSimpleResDto(bestMovie.getMovie()));
                    return bestMovieResDto;
                })
                .collect(Collectors.toList())
        );

        //작성한 영화 리뷰 목록
        memberResDto.setReviewResDtos(member.getReviews().stream()
                .map(review -> {
                    ReviewResDto reviewResDto = new ReviewResDto();
                    reviewResDto.setReviewId(review.getReviewId());
//                    reviewResDto.setMemberSimpleResDto(memberToMemberSimpleResDto(review.getMember()));
                    reviewResDto.setMovieSimpleResDto(movieToMovieSimpleResDto(review.getMovie()));
                    reviewResDto.setReviewContent(review.getReviewContent());
                    reviewResDto.setReviewRate(review.getReviewRate());
                    return reviewResDto;
                })
                .collect(Collectors.toList())
        );

        //유튜브 키워드 목록
        memberResDto.setYoutubeKeywordResDtos(member.getYoutubeKeywords().stream()
                .map(youtubeKeyword -> {
                    YoutubeKeywordResDto youtubeKeywordResDto = new YoutubeKeywordResDto();
                    youtubeKeywordResDto.setYoutubeKeywordId(youtubeKeyword.getYoutubeKeywordId());
                    youtubeKeywordResDto.setYoutubeKeywordName(youtubeKeyword.getYoutubeKeywordName());
                    youtubeKeywordResDto.setMovieRank(youtubeKeyword.getMovieRank());
                    return youtubeKeywordResDto;
                })
                .collect(Collectors.toList())
        );

        //추천 OTT 순위
        Map<Long, RecommendOttResDto> map = new HashMap();

        member.getRecommendMovies().stream()
                .forEach(recommendMovie -> {
                    List<OttMovie> ottMovies = recommendMovie.getMovie().getOttMovies();
                    for (OttMovie ottMovie : ottMovies) {
                        if (map.containsKey(ottMovie.getOtt().getOttId())) {
                            int prev = map.get(ottMovie.getOtt().getOttId()).getCount();
                            map.get(ottMovie.getOtt().getOttId()).setCount(prev + 1);
                        } else {
                            RecommendOttResDto recommendOttResDto = new RecommendOttResDto();
                            recommendOttResDto.setOttId(ottMovie.getOtt().getOttId());
                            recommendOttResDto.setOttName(ottMovie.getOtt().getOttName());
                            recommendOttResDto.setOttImage(ottMovie.getOtt().getOttImage());
                            recommendOttResDto.setCount(1);
                            map.put(ottMovie.getOtt().getOttId(), recommendOttResDto);
                        }
                    }
                });

        memberResDto.setRecommendOttResDtos(new ArrayList<>(map.values()));

        return memberResDto;
    }
}
