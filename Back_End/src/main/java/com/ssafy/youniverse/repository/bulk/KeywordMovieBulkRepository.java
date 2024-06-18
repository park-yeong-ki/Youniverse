package com.ssafy.youniverse.repository.bulk;

import com.ssafy.youniverse.entity.GenreMovie;
import com.ssafy.youniverse.entity.KeywordMovie;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.util.Set;

@Repository
@RequiredArgsConstructor
public class KeywordMovieBulkRepository {
    private final JdbcTemplate jdbcTemplate;
    @Value("${spring.jpa.properties.hibernate.jdbc.batch_size}")
    private int batchSize;

    @Transactional
    public void saveAll(Set<KeywordMovie> keywordMovies) {
        String sql = "INSERT IGNORE INTO keyword_movie (keyword_id, movie_id) " +
                "VALUES (?, ?)";

        jdbcTemplate.batchUpdate(sql,
                keywordMovies,
                batchSize,
                (PreparedStatement ps, KeywordMovie keywordMovie) -> {
                    ps.setLong(1, keywordMovie.getKeyword().getKeywordId());
                    ps.setLong(2, keywordMovie.getMovie().getMovieId());
                });
    }
}
