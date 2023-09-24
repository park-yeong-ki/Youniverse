package com.ssafy.youniverse.mapper;

import com.ssafy.youniverse.dto.req.MyMovieReqDto;
import com.ssafy.youniverse.dto.res.HeartMovieResDto;
import com.ssafy.youniverse.entity.HeartMovie;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface HeartMovieMapper extends CustomMapper {
    @Mapping(source = "movieReqDto.memberId", target = "member.memberId")
    @Mapping(source = "movieReqDto.movieId", target = "movie.movieId")
    HeartMovie myMovieReqDtoToHeartMovie(MyMovieReqDto movieReqDto);

    @Mapping(source = "heartMovie.member", target = "memberSimpleResDto")
    @Mapping(source = "heartMovie.movie", target = "movieSimpleResDto")
    HeartMovieResDto heartMovieToHeartMovieResDto(HeartMovie heartMovie);
}
