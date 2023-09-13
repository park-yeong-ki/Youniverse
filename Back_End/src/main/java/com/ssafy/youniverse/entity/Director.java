package com.ssafy.youniverse.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
public class Director {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer directorId;

    @Column(length = 30, nullable = false)
    private String directorName;

    @Column(length = 255, nullable = false)
    private String directorImage;

    @OneToMany(mappedBy = "director")
    private List<DirectorMovie> directorMovies = new ArrayList<>();

}
