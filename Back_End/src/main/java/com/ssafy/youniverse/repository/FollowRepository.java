package com.ssafy.youniverse.repository;

import com.ssafy.youniverse.entity.Follow;
import com.ssafy.youniverse.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FollowRepository extends JpaRepository<Follow, Integer> {
    Optional<Follow> findByFollowerAndFollowing(Member follower, Member Following);
}
