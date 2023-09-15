package com.ssafy.youniverse.dto.res;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberResDto {
    private Integer memberId;
    private String nickname;
    private String email;
    private String gender;
    private Byte age;
    private String introduce;
    private String memberImage;
}
