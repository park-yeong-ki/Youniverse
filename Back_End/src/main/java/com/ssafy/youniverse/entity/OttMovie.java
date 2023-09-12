package com.ssafy.youniverse.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class OttMovie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer ottMovieId;

//    private Ott ott;
//    private Movie movie;

}
