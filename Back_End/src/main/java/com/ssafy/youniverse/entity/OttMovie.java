package com.ssafy.youniverse.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class OttMovie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer ottMovieId;

    @ManyToOne
    @JoinColumn(name ="ott_id")
    private Ott ott;

    @ManyToOne
    @JoinColumn(name = "movie_id")
    private Movie movie;

}
