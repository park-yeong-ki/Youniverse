package com.ssafy.youniverse.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class HeartMovie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer heartMovieId;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "movie_id")
    private Movie movie;


}
