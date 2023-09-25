package com.ssafy.youniverse.repository;

import com.ssafy.youniverse.entity.GenreMovie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GenreMovieRepository extends JpaRepository<GenreMovie, Integer> {
}
