package com.ssafy.youniverse.dto.req;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberReqDto {
    private Integer memberId;
    private String nickname;
    private String email;
    private String gender;
    private Byte age;
    private String introduce;
}
