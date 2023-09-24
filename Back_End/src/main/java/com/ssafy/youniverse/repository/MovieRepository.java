package com.ssafy.youniverse.repository;

import com.ssafy.youniverse.entity.Movie;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MovieRepository extends JpaRepository<Movie, Integer> {
    @Query(value = "select m from Movie m where m.movieId in " +
            "(select dm.movie.movieId from DirectorMovie dm where dm.director.directorId in " +
            "(select d.directorId from Director d where d.directorName = :director))")
    Page<Movie> findAllByDirector(@Param("director") String director, Pageable pageable);

    @Query(value = "select m from Movie m where m.movieId in " +
            "(select am.movie.movieId from ActorMovie am where am.actor.actorId in " +
            "(select a.actorId from Actor a where a.actorName = :actor))")
    Page<Movie> findAllByActor(@Param("actor") String actor, Pageable pageable);


    Page<Movie> findAllByTitleContains(String title, Pageable pageable);

    @Query(value = "select m from Movie m where m.movieId in " +
            "(select kmv.movie.movieId from KeywordMovie kmv where kmv.keyword.keywordId in " +
            "(select kmb.keyword.keywordId from KeywordMember kmb where kmb.member.memberId = :memberId))")
    Page<Movie> findAllByMemberKeyword(@Param("memberId") Integer memberId, Pageable pageable);
}
