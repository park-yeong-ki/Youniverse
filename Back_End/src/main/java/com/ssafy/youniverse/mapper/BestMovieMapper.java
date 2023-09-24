package com.ssafy.youniverse.mapper;

import com.ssafy.youniverse.dto.req.MyMovieReqDto;
import com.ssafy.youniverse.dto.res.BestMovieResDto;
import com.ssafy.youniverse.entity.BestMovie;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface BestMovieMapper extends CustomMapper {
    @Mapping(source = "movieReqDto.memberId", target = "member.memberId")
    @Mapping(source = "movieReqDto.movieId", target = "movie.movieId")
    BestMovie myMovieReqDtoToBestMovie(MyMovieReqDto movieReqDto);

    @Mapping(source = "bestMovie.member", target = "memberSimpleResDto")
    @Mapping(source = "bestMovie.movie", target = "movieSimpleResDto")
    BestMovieResDto bestMovieToBestMovieResDto(BestMovie bestMovie);
}
