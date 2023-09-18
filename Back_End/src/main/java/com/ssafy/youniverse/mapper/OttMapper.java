package com.ssafy.youniverse.mapper;

import com.ssafy.youniverse.dto.req.OttReqDto;
import com.ssafy.youniverse.dto.res.OttResDto;
import com.ssafy.youniverse.entity.Ott;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface OttMapper {
    Ott ottReqDtoToOtt(OttReqDto ottReqDto);

    OttResDto ottToOttResDto(Ott ott);

    List<OttResDto> ottsToOttResDtos(List<Ott> otts);
}
