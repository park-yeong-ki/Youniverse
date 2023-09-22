package com.ssafy.youniverse.repository;

import com.ssafy.youniverse.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieRepository extends JpaRepository<Movie, Integer> {
}
