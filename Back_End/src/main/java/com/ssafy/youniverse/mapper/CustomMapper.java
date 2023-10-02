package com.ssafy.youniverse.mapper;

import com.ssafy.youniverse.dto.res.KeywordResDto;
import com.ssafy.youniverse.dto.res.MemberSimpleResDto;
import com.ssafy.youniverse.dto.res.MovieSimpleResDto;
import com.ssafy.youniverse.entity.Keyword;
import com.ssafy.youniverse.entity.Member;
import com.ssafy.youniverse.entity.Movie;
import org.mapstruct.Mapper;

import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface CustomMapper {
    default MemberSimpleResDto memberToMemberSimpleResDto(Member member){
        MemberSimpleResDto memberSimpleResDto = new MemberSimpleResDto();
        memberSimpleResDto.setMemberId(member.getMemberId());
        memberSimpleResDto.setNickname(member.getNickname());
        memberSimpleResDto.setMemberImage(member.getMemberImage());
        memberSimpleResDto.setKeywordResDtos(member.getKeywordMembers().stream()
                .map(keywordMember -> {
                    Keyword keyword = keywordMember.getKeyword();
                    KeywordResDto keywordResDto = new KeywordResDto();
                    keywordResDto.setKeywordName(keyword.getKeywordName());
                    keywordResDto.setKeywordId(keyword.getKeywordId());
                    return keywordResDto;
                })
                .collect(Collectors.toList())
        );
        return memberSimpleResDto;
    }

    default MovieSimpleResDto movieToMovieSimpleResDto(Movie movie){
        MovieSimpleResDto movieSimpleResDto = new MovieSimpleResDto();
        movieSimpleResDto.setMovieId(movie.getMovieId());
        movieSimpleResDto.setRate(movie.getRate());
        movieSimpleResDto.setMovieImage(movie.getMovieImage());
        movieSimpleResDto.setRuntime(movie.getRuntime());
        movieSimpleResDto.setTitle(movie.getTitle());
        movieSimpleResDto.setKeywordResDtos(movie.getKeywordMovies().stream()
                .map(keywordMovie -> {
                    Keyword keyword = keywordMovie.getKeyword();
                    KeywordResDto keywordResDto = new KeywordResDto();
                    keywordResDto.setKeywordId(keyword.getKeywordId());
                    keywordResDto.setKeywordName(keyword.getKeywordName());
                    return keywordResDto;
                })
                .collect(Collectors.toList())
        );
        return movieSimpleResDto;
    };
}
