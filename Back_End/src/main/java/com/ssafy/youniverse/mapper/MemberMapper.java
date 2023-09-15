package com.ssafy.youniverse.mapper;

import com.ssafy.youniverse.dto.req.MemberReqDto;
import com.ssafy.youniverse.dto.res.MemberResDto;
import com.ssafy.youniverse.entity.Member;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MemberMapper {
    Member memberReqDtoToMember(MemberReqDto memberReqDto);

    MemberResDto memberToMemberResDto(Member member);
}
