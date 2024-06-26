package com.ssafy.youniverse.repository.bulk;

import com.ssafy.youniverse.entity.ActorMovie;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.util.Set;

@Repository
@RequiredArgsConstructor
public class ActorMovieBulkRepository {
    private final JdbcTemplate jdbcTemplate;

    @Transactional
    public void saveAll(Set<ActorMovie> actorMovies) {
        String sql = "INSERT IGNORE INTO actor_movie (actor_id, movie_id) " +
                "VALUES (?, ?)";

        jdbcTemplate.batchUpdate(sql,
                actorMovies,
                actorMovies.size(),
                (PreparedStatement ps, ActorMovie actormovie) -> {
                    ps.setLong(1, actormovie.getActor().getActorId());
                    ps.setLong(2, actormovie.getMovie().getMovieId());
                });
    }
}
