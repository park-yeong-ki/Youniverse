package com.ssafy.youniverse.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
public class Keyword {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer keywordId;

    @Column(length = 10, nullable = false)
    private String keywordName;

    @Column(nullable = false)
    private int source;

    @OneToMany(mappedBy = "keyword")
    private List<KeywordMember> keywordMembers = new ArrayList<>();

    @OneToMany(mappedBy = "keyword")
    private List<KeywordMovie> keywordMovies = new ArrayList<>();
}
