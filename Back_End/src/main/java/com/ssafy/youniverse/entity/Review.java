package com.ssafy.youniverse.entity;

import com.ssafy.youniverse.util.Auditable;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class Review extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer reviewId;

    @Column(length = 100, nullable = true)
    private String reviewContent;

    @Column(nullable = false)
    private Float reviewRate;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "movie_id")
    private Movie movie;


}
