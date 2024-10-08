package com.ssafy.youniverse.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import jakarta.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(uniqueConstraints = {@UniqueConstraint(columnNames = {"ott_id", "movie_id"})})
public class OttMovie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ottMovieId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name ="ott_id")
    private Ott ott;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "movie_id")
    private Movie movie;

}
