package com.ssafy.youniverse.entity;

import lombok.*;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
@EqualsAndHashCode
public class Keyword {

    @Id
    private Long keywordId;

    @Column(length = 50, nullable = false)
    private String keywordName;

    @OneToMany(mappedBy = "keyword", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<KeywordMember> keywordMembers = new ArrayList<>();

    @OneToMany(mappedBy = "keyword", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<KeywordMovie> keywordMovies = new ArrayList<>();
}
