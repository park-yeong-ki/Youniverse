package com.ssafy.youniverse.repository;

import com.ssafy.youniverse.entity.Actor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActorRepository extends JpaRepository<Actor, Integer> {
}
