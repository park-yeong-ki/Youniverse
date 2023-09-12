package com.ssafy.youniverse.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class Ott {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer ottId;


//    private Member member;

    @Column(length = 10, nullable = false)
    private String ottName;

    @Column(length = 255, nullable = false)
    private String ottImage;

    @Column(length = 255, nullable = false)
    private String ottUrl;

    @Column(nullable = false)
    private Integer ottPrice;

}