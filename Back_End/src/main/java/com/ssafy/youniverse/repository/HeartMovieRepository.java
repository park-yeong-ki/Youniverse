package com.ssafy.youniverse.repository;

import com.ssafy.youniverse.entity.HeartMovie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HeartMovieRepository extends JpaRepository<HeartMovie, Long> {
}
