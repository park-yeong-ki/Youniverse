package com.ssafy.youniverse.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
public class Keyword {

    @Id
    private Integer keywordId;

    @Column(length = 50, nullable = false)
    private String keywordName;

    @Column(nullable = false)
    private int source;

    @OneToMany(mappedBy = "keyword", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<KeywordMember> keywordMembers = new ArrayList<>();

    @OneToMany(mappedBy = "keyword", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<KeywordMovie> keywordMovies = new ArrayList<>();
}
