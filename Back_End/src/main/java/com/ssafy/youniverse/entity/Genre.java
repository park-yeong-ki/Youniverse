package com.ssafy.youniverse.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
public class Genre {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer genreId;

    @Column(length = 20, nullable = false)
    private String movieGenre;

    @OneToMany(mappedBy = "genre")
    private List<GenreMovie> genreMovies = new ArrayList<>();
}
