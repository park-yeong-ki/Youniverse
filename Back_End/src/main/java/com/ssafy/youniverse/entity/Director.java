package com.ssafy.youniverse.entity;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Director {

    @Id
    private Integer directorId;

    @Column(length = 60, nullable = false)
    private String directorName;

    @Column(length = 255, nullable = false)
    private String directorImage;

    @OneToMany(mappedBy = "director", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DirectorMovie> directorMovies = new ArrayList<>();

}
