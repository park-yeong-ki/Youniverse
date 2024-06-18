package com.ssafy.youniverse.repository.bulk;

import com.ssafy.youniverse.entity.KeywordMovie;
import com.ssafy.youniverse.entity.OttMovie;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.util.Set;

@Repository
@RequiredArgsConstructor
public class OttMovieBulkRepository {
    private final JdbcTemplate jdbcTemplate;
    @Value("${spring.jpa.properties.hibernate.jdbc.batch_size}")
    private int batchSize;

    @Transactional
    public void saveAll(Set<OttMovie> ottMovies) {
        String sql = "INSERT IGNORE INTO ott_movie (ott_id, movie_id) " +
                "VALUES (?, ?)";

        jdbcTemplate.batchUpdate(sql,
                ottMovies,
                batchSize,
                (PreparedStatement ps, OttMovie ottMovie) -> {
                    ps.setLong(1, ottMovie.getOtt().getOttId());
                    ps.setLong(2, ottMovie.getMovie().getMovieId());
                });
    }
}
