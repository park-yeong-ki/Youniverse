package com.ssafy.youniverse.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
@Entity
public class DirectorMovie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer directorMovieId;

//    private Director director;
//    private Movie movie;

}
