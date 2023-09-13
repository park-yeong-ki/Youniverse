package com.ssafy.youniverse.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class GenreMovie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer genreMovieId;

    @ManyToOne
    @JoinColumn(name = "movie_id")
    private Movie movie;

    @ManyToOne
    @JoinColumn(name = "genre_id")
    private Genre genre;

}
