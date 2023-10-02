package com.ssafy.youniverse.repository;

import com.ssafy.youniverse.entity.RecommendMovie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecommendMovieRepository extends JpaRepository<RecommendMovie, Integer> {
}
