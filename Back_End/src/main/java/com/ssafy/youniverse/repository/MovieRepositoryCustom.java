package com.ssafy.youniverse.repository;

import com.ssafy.youniverse.entity.Movie;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface MovieRepositoryCustom {
    Page<Movie> findAllQueryDsl(Pageable pageable, Integer memberId, String director, String actor, String title, Integer type, Integer ottId);
}
