package com.ssafy.youniverse.entity;

import com.ssafy.youniverse.util.Auditable;
import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
public class Member extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer memberId;

    @Column(length = 20, nullable = false)
    private String nickname;

    @Column(length = 30, nullable = false)
    private String email;

    @Column(length = 2, nullable = false)
    private String gender;

    @Column(nullable = false)
    private Byte age;

    @Column(length = 255, nullable = false)
    private String introduce;

    @Column(length = 255, nullable = true)
    private String memberImage;

    @OneToMany(mappedBy = "follower", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Follow> followers = new ArrayList<>();

    @OneToMany(mappedBy = "following", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Follow> followings = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OttMember> ottMembers = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<KeywordMember> keywordMembers = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<HeartMovie> heartMovies = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<HateMovie> hateMovies = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<BestMovie> bestMovies = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Review> reviews = new ArrayList<>();
}
