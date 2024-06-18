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
public class Ott {

    @Id
    private Long ottId;

    @Column(length = 30, nullable = false)
    private String ottName;

    @Column(length = 255, nullable = false)
    private String ottImage;

    @OneToMany(mappedBy = "ott", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OttMovie> ottMovies = new ArrayList<>();

    @OneToMany(mappedBy = "ott", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OttMember> ottMembers = new ArrayList<>();
}