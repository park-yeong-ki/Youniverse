package com.ssafy.youniverse.mapper;

import com.ssafy.youniverse.dto.req.MemberRecommendMovieReqDto;
import com.ssafy.youniverse.dto.res.RecommendMovieResDto;
import com.ssafy.youniverse.entity.RecommendMovie;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface RecommendMovieMapper extends CustomMapper {
    @Mapping(source = "movieId", target = "movie.movieId")
    RecommendMovie movieIdToRecommendMovie(Integer movieId);
    List<RecommendMovie> movieIdListToRecommendMovies(List<Integer> movieIdList);

    @Mapping(source = "recommendMovie.member", target = "memberSimpleResDto")
    @Mapping(source = "recommendMovie.movie", target = "movieSimpleResDto")
    RecommendMovieResDto recommendMoviesToRecommendMovieResDto(RecommendMovie recommendMovie);

    List<RecommendMovieResDto> recommendMoviesToRecommendMovieResDtos(List<RecommendMovie> recommendMovies);
}
