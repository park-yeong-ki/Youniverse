package com.ssafy.youniverse.entity;

import lombok.Data;

import javax.persistence.*;
import javax.persistence.criteria.CriteriaBuilder;

@Data
@Entity
public class Actor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer actorId;

//    private Movie movie;
    @Column(length = 30, nullable = false)
    private String actorName;

    @Column(length = 255, nullable = false)
    private String actorImage;

}
