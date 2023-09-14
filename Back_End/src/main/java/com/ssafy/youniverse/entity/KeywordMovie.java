package com.ssafy.youniverse.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class KeywordMovie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer keywordMovieId;

    @ManyToOne
    @JoinColumn(name = "keyword_id")
    private Keyword keyword;

    @ManyToOne
    @JoinColumn(name = "movie_id")
    private Movie movie;

}
