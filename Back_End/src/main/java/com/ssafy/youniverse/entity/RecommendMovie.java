package com.ssafy.youniverse.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class RecommendMovie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer recommendMovieId;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "movie_id")
    private Movie movie;
}
