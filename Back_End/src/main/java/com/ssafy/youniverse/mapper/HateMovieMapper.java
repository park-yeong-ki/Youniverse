package com.ssafy.youniverse.mapper;

import com.ssafy.youniverse.dto.req.MyMovieReqDto;
import com.ssafy.youniverse.dto.res.HateMovieResDto;
import com.ssafy.youniverse.entity.HateMovie;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface HateMovieMapper {
    @Mapping(source = "movieReqDto.memberId", target = "member.memberId")
    @Mapping(source = "movieReqDto.movieId", target = "movie.movieId")
    HateMovie myMovieReqDtoToHateMovie(MyMovieReqDto movieReqDto);

    @Mapping(source = "hateMovie.member", target = "memberSimpleResDto")
    @Mapping(source = "hateMovie.movie", target = "movieSimpleResDto")
    HateMovieResDto hateMovieToHateMovieResDto(HateMovie hateMovie);
}
