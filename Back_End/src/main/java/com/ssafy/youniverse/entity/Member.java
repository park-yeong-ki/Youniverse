package com.ssafy.youniverse.entity;

import com.ssafy.youniverse.util.Auditable;
import lombok.*;
import org.springframework.context.annotation.Lazy;

import javax.persistence.*;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
@Entity
@Transactional
public class Member extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer memberId;

    @Column(length = 20, nullable = true)
    private String nickname;

    @Column(length = 30, nullable = false, unique = true)
    private String email;

    @Column(length = 2, nullable = true)
    private String gender;

    @Column(nullable = true)
    private Byte age;

    @Column(length = 255, nullable = true)
    private String introduce;

    @Column(length = 255, nullable = true)
    private String memberImage;

    @Lazy
    @OneToMany(mappedBy = "follower", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Follow> followers = new ArrayList<>();

    @OneToMany(mappedBy = "following", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Follow> followings = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OttMember> ottMembers = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<KeywordMember> keywordMembers = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<HeartMovie> heartMovies = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<HateMovie> hateMovies = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BestMovie> bestMovies = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Review> reviews = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<YoutubeKeyword> youtubeKeywords = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RecommendMovie> recommendMovies = new ArrayList<>();
}
