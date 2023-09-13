package com.ssafy.youniverse.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class DirectorMovie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer directorMovieId;

    @ManyToOne
    @JoinColumn(name = "director_id")
    private Director director;

    @ManyToOne
    @JoinColumn(name = "movie_id")
    private Movie movie;

}
