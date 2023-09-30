package com.ssafy.youniverse.api;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class TmdbMovie {
    private int id;
    private String title;
    private String language;
    private String overView;
    private float rate;
    private String movieImage;
    private int runtime;
    private List<TmdbGenre> genreList;
    private List<TmdbKeyword> keywordList;
    private TmdbOttList ottList;
    private List<TmdbCast> castList;
    private List<TmdbCrew> crewList;
}
