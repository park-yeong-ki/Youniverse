package com.ssafy.youniverse.entity;

import com.ssafy.youniverse.util.Auditable;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class Follow extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer followId;

    @ManyToOne
    @JoinColumn(name = "follower_id")
    private Member follower;

    @ManyToOne
    @JoinColumn(name = "following_id")
    private Member following;

}
