package com.ssafy.youniverse.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
public class Ott {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer ottId;

    @Column(length = 10, nullable = false)
    private String ottName;

    @Column(length = 255, nullable = false)
    private String ottImage;

    @Column(length = 255, nullable = false)
    private String ottUrl;

    @Column(nullable = false)
    private Integer ottPrice;

    @OneToMany(mappedBy = "ott", cascade = CascadeType.ALL)
    private List<OttMovie> ottMovies = new ArrayList<>();

    @OneToMany(mappedBy = "ott", cascade = CascadeType.ALL)
    private List<OttMember> ottMembers = new ArrayList<>();
}