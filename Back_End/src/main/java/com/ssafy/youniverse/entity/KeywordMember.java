package com.ssafy.youniverse.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class KeywordMember {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer keywordMemberId;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "keyword_id")
    private Keyword keyword;

}
