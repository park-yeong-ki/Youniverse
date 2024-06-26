package com.ssafy.youniverse.repository.bulk;

import com.ssafy.youniverse.entity.ActorMovie;
import com.ssafy.youniverse.entity.DirectorMovie;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.util.Set;

@Repository
@RequiredArgsConstructor
public class DirectorMovieBulkRepository {
    private final JdbcTemplate jdbcTemplate;

    @Transactional
    public void saveAll(Set<DirectorMovie> directorMovies) {
        String sql = "INSERT IGNORE INTO director_movie (director_id, movie_id) " +
                "VALUES (?, ?)";

        jdbcTemplate.batchUpdate(sql,
                directorMovies,
                directorMovies.size(),
                (PreparedStatement ps, DirectorMovie directorMovie) -> {
                    ps.setLong(1, directorMovie.getDirector().getDirectorId());
                    ps.setLong(2, directorMovie.getMovie().getMovieId());
                });
    }
}
