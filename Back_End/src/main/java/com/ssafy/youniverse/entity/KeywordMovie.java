package com.ssafy.youniverse.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class KeywordMovie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer keywordMovieId;

//    private Keyword keyword;

//    private Movie movie;

}
