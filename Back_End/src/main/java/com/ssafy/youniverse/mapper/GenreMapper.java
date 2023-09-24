package com.ssafy.youniverse.mapper;

import com.ssafy.youniverse.dto.req.GenreReqDto;
import com.ssafy.youniverse.dto.res.GenreResDto;
import com.ssafy.youniverse.entity.Genre;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface GenreMapper {
    Genre genreReqDtoToGenre(GenreReqDto genreReqDto);

    GenreResDto genreToGenreResDto(Genre genre);

    List<GenreResDto> genresToGenreResDtos(List<Genre> genres);
}
