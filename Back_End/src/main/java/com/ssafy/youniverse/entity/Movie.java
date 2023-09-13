package com.ssafy.youniverse.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long movieId;

    @Column(length = 30, nullable = false)
    private String title;

    @Column(length = 2, nullable = false)
    private String language;

    @Column(length = 255, nullable = false)
    private String overView;

    @Column(nullable = false)
    private Float rate;

    @Column(nullable = false)
    private Integer runtime;

    @Column(length = 255, nullable = false)
    private String movieImage;

    @OneToMany(mappedBy = "movie")
    private List<HeartMovie> heartMovies = new ArrayList<>();

    @OneToMany(mappedBy = "movie")
    private List<HateMovie> hateMovies = new ArrayList<>();

    @OneToMany(mappedBy = "movie")
    private List<BestMovie> bestMovies = new ArrayList<>();

    @OneToMany(mappedBy = "movie")
    private List<Review> reviews = new ArrayList<>();

    @OneToMany(mappedBy = "movie")
    private List<OttMovie> ottMovies = new ArrayList<>();

    @OneToMany(mappedBy = "movie")
    private List<KeywordMovie> keywordMovies = new ArrayList<>();

    @OneToMany(mappedBy = "movie")
    private List<ActorMovie> actorMovies = new ArrayList<>();

    @OneToMany(mappedBy = "movie")
    private List<GenreMovie> genreMovies = new ArrayList<>();

    @OneToMany(mappedBy = "movie")
    private List<DirectorMovie> directorMovies = new ArrayList<>();

}
