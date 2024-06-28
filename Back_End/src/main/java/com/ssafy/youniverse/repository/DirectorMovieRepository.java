package com.ssafy.youniverse.repository;

import com.ssafy.youniverse.entity.DirectorMovie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DirectorMovieRepository extends JpaRepository<DirectorMovie, Long> {
}
