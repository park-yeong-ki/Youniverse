package com.ssafy.youniverse.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class Member {

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

    @Column(length = 10, nullable = false)
    private String job;

    @Column(length = 255, nullable = false)
    private String introduce;

    @Column(length = 255, nullable = false)
    private String memberImage;


}
