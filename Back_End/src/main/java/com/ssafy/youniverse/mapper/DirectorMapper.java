package com.ssafy.youniverse.mapper;

import com.ssafy.youniverse.dto.req.DirectorReqDto;
import com.ssafy.youniverse.dto.res.DirectorResDto;
import com.ssafy.youniverse.entity.Director;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface DirectorMapper {
    Director directorReqDtoToDirector(DirectorReqDto dto);

    DirectorResDto directorToDirectorResDto(Director director);

    List<DirectorResDto> directorsToDirectorResDtos(List<Director> directors);
}
