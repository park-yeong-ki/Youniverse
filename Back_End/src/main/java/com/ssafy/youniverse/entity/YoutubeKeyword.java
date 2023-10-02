package com.ssafy.youniverse.entity;

import com.ssafy.youniverse.util.Auditable;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class YoutubeKeyword extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer youtubeKeywordId;

    @Column(nullable = false, length = 30)
    private String youtubeKeywordName;

    @Column(nullable = false)
    private Byte movieRank;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;
}
