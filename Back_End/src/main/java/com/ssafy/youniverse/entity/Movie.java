package com.ssafy.youniverse.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long movieId;

    @Column(length = 30, nullable = false)
    private String title;

    @Column(length = 2, nullable = false)
    private String language;

    @Column(length = 255, nullable = false)
    private String overView;

    @Column(nullable = false)
    private Float rate;

    @Column(nullable = false)
    private Integer runtime;

    @Column(length = 255, nullable = false)
    private String movieImage;

}
