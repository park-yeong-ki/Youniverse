package com.ssafy.youniverse.entity;

import lombok.*;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
@EqualsAndHashCode
public class Genre {

    @Id
    private Long genreId;

    @Column(length = 20, nullable = false)
    private String genreName;

    @OneToMany(mappedBy = "genre", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<GenreMovie> genreMovies = new ArrayList<>();
}
