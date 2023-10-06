package com.ssafy.youniverse.mapper;

import com.ssafy.youniverse.dto.req.MyMovieReqDto;
import com.ssafy.youniverse.dto.res.ReviewResDto;
import com.ssafy.youniverse.entity.Review;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ReviewMapper extends CustomMapper {
    @Mapping(source = "movieReqDto.memberId", target = "member.memberId")
    @Mapping(source = "movieReqDto.movieId", target = "movie.movieId")
    Review myMovieReqDtoToReview(MyMovieReqDto movieReqDto);

    @Mapping(source = "review.member", target = "memberSimpleResDto")
    @Mapping(source = "review.movie", target = "movieSimpleResDto")
    ReviewResDto reviewToReviewResDto(Review review);
}
