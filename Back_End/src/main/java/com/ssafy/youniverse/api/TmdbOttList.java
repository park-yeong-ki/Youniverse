package com.ssafy.youniverse.api;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class TmdbOttList {
    private String link;
    private List<TmdbOtt> buy;
    private List<TmdbOtt> rent;
    private List<TmdbOtt> flatrate;
}
