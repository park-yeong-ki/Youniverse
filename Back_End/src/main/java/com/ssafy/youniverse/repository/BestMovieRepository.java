package com.ssafy.youniverse.repository;

import com.ssafy.youniverse.entity.BestMovie;
import com.ssafy.youniverse.entity.Member;
import com.ssafy.youniverse.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BestMovieRepository extends JpaRepository<BestMovie, Integer> {
    List<BestMovie> findAllByMember(Member member);

    Optional<BestMovie> findByMovieAndMember(Movie movie, Member member);
}
