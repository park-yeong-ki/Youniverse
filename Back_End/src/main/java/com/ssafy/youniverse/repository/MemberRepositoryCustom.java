package com.ssafy.youniverse.repository;

import com.ssafy.youniverse.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface MemberRepositoryCustom {
    Page<Member> findAllQueryDsl(Pageable pageable, String keyword, String nickname, String total);
    Integer findByRandomQueryDsl();
}
