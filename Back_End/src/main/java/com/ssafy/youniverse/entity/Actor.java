package com.ssafy.youniverse.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
@EqualsAndHashCode
public class Actor {

    @Id
    private Long actorId;

    @Column(length = 60, nullable = false)
    private String actorName;

    @Column(length = 255, nullable = false)
    private String actorImage;

    @OneToMany(mappedBy = "actor", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ActorMovie> actorMovies = new ArrayList<>();
}
