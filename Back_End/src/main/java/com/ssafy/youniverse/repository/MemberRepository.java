package com.ssafy.youniverse.repository;

import com.ssafy.youniverse.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Integer> {
}
