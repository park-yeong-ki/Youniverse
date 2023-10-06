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

    @Query(value = "select * from movie where movie_id in " +
            "(select distinct movie_id from keyword_movie where keyword_id in " +
            "(select keyword_id from keyword_member where member_id = :memberId))", nativeQuery = true)
    Page<Movie> findAllByMemberKeyword(@Param("memberId") Integer memberId, Pageable pageable);

    @Query(value = "select * from movie where movie_id in " +
            "(select distinct movie_id from heart_movie where member_id in " +
            "(select member_id from member where floor(age/10) = " +
            "(select floor(age/10) from member where member_id = :memberId) " +
            "and gender = " +
            "(select gender from member where member_id = :memberId)))", nativeQuery = true)
    Page<Movie> findAllByAgeAndGender(@Param("memberId") Integer memberId, Pageable pageable);

    @Query(value = "select * from movie where movie_id in " +
            "(select movie_id from recommend_movie where member_id = :memberId AND " +
            "movie_id in " +
            "(select movie_id from ott_movie where ott_id = :ottId))", nativeQuery = true)
    Page<Movie> findAllByOttId(@Param("ottId") Integer ottId, @Param("memberId") Integer memberId, Pageable pageable);

    //유튜브 추천
    @Query(value = "select * from movie where movie_id in " +
            "(select movie_id from recommend_movie where member_id = :memberId)", nativeQuery = true)
    Page<Movie> findAllByYoutube(@Param("memberId") Integer memberId, Pageable pageable);
}
