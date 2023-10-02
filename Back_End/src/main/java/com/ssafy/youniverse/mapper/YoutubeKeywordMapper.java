package com.ssafy.youniverse.mapper;

import com.ssafy.youniverse.dto.req.YoutubeKeywordReqDto;
import com.ssafy.youniverse.dto.res.YoutubeKeywordResDto;
import com.ssafy.youniverse.entity.YoutubeKeyword;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface YoutubeKeywordMapper {
    YoutubeKeyword youtubeKeywordReqDtoToYoutubeKeyword(YoutubeKeywordReqDto youtubeKeywordReqDto);

    List<YoutubeKeyword> youtubeKeywordReqDtosToYoutubeKeywords(List<YoutubeKeywordReqDto> YoutubeKeywordReqDto);

    YoutubeKeywordResDto youtubeKeywordToYoutubeKeywordResDto(YoutubeKeyword youtubeKeyword);

    List<YoutubeKeywordResDto> youtubeKeywordsToYoutubeKeywordResDtos(List<YoutubeKeyword> youtubeKeywords);
}
