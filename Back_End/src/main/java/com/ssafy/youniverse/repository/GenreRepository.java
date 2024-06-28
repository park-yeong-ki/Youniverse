package com.ssafy.youniverse.repository;

import com.ssafy.youniverse.entity.Genre;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GenreRepository extends JpaRepository<Genre, Long> {
}
