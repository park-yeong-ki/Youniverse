package com.ssafy.youniverse.entity;

import lombok.Data;

import javax.persistence.*;
import javax.persistence.criteria.CriteriaBuilder;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
public class Actor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer actorId;

    @Column(length = 30, nullable = false)
    private String actorName;

    @Column(length = 255, nullable = false)
    private String actorImage;

    @OneToMany(mappedBy = "actor")
    private List<ActorMovie> actorMovies = new ArrayList<>();
}
