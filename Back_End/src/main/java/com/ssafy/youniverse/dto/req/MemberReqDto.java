package com.ssafy.youniverse.dto.req;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class MemberReqDto {
    private Long memberId;
    private String nickname;
    private String email;
    private String gender;
    private Byte age;
    private String introduce;
    private List<Long> ottList; //회원과 관련된 Ott 식별자
    private List<Long> keywordList; //회원과 관련된 Keyword 식별자
}
