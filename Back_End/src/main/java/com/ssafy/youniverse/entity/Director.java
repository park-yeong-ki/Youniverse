package com.ssafy.youniverse.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class Director {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer directorId;

//    private Movie movie;

    @Column(length = 30, nullable = false)
    private String directorName;

    @Column(length = 255, nullable = false)
    private String directorImage;

}
