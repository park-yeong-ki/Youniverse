package com.ssafy.youniverse.dto.res;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RecommendOttResDto {
    private Integer ottId;
    private String ottName;
    private String ottImage;
    private String ottUrl;
    private int count;
}