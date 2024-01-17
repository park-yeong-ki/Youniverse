package com.ssafy.youniverse.entity;

import lombok.*;

import javax.persistence.*;
import javax.persistence.criteria.CriteriaBuilder;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Actor {

    @Id
    private Integer actorId;

    @Column(length = 60, nullable = false)
    private String actorName;

    @Column(length = 255, nullable = false)
    private String actorImage;

    @OneToMany(mappedBy = "actor", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ActorMovie> actorMovies = new ArrayList<>();
}
