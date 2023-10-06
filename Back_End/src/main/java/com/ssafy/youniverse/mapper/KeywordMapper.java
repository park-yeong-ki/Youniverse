package com.ssafy.youniverse.mapper;

import com.ssafy.youniverse.dto.req.KeywordReqDto;
import com.ssafy.youniverse.dto.res.KeywordResDto;
import com.ssafy.youniverse.entity.Keyword;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface KeywordMapper {
    Keyword keywordReqDtoToKeyword(KeywordReqDto keywordReqDto);

    KeywordResDto keywordToKeywordResDto(Keyword keyword);

    List<KeywordResDto> keywordsToKeywordResDtos(List<Keyword> keywords);
}
