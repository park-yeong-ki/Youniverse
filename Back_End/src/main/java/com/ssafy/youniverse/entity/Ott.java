package com.ssafy.youniverse.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
public class Ott {

    @Id
    private Integer ottId;

    @Column(length = 30, nullable = false)
    private String ottName;

    @Column(length = 255, nullable = false)
    private String ottImage;

    @Column(length = 255, nullable = false)
    private String ottUrl;

    @OneToMany(mappedBy = "ott", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OttMovie> ottMovies = new ArrayList<>();

    @OneToMany(mappedBy = "ott", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OttMember> ottMembers = new ArrayList<>();
}