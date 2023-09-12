package com.ssafy.youniverse.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
@Entity
public class GenreMovie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer genreMovieId;

//    private Movie movie;
//    private Genre genre;

}
