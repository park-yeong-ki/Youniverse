package com.ssafy.youniverse.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class OttMember {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer OttMemberId;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "ott_id")
    private Ott ott;
}
