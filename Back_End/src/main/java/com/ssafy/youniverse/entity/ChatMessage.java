package com.ssafy.youniverse.entity;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
public class ChatMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer chatId;


//    private Member member1;

//    private Member member2;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

//    private LocalDateTime createdDate;

    @Column(nullable = false, columnDefinition = "default false")
    private boolean isRead;

}
