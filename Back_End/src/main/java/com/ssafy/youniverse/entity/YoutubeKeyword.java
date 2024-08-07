package com.ssafy.youniverse.entity;

import com.ssafy.youniverse.util.Auditable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import jakarta.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class YoutubeKeyword extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long youtubeKeywordId;

    @Column(nullable = false, length = 30)
    private String youtubeKeywordName;

    @Column(nullable = false)
    private Byte movieRank;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;
}
