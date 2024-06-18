package com.ssafy.youniverse.repository.bulk;

import com.ssafy.youniverse.entity.Movie;
import com.ssafy.youniverse.entity.OttMovie;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Set;

@Repository
@RequiredArgsConstructor
public class MovieBulkRepository {
    private final JdbcTemplate jdbcTemplate;
    @Value("${spring.jpa.properties.hibernate.jdbc.batch_size}")
    private int batchSize;

    @Transactional
    public void saveAll(Set<Movie> movies) {
        String sql = "INSERT IGNORE INTO movie (movie_id, rate, runtime, language, title, movie_image, over_view, created_date, last_modified_date) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

        jdbcTemplate.batchUpdate(sql,
                movies,
                batchSize,
                (PreparedStatement ps, Movie movie) -> {
                    ps.setLong(1, movie.getMovieId());
                    ps.setDouble(2, movie.getRate());
                    ps.setInt(3, movie.getRuntime());
                    ps.setString(4, movie.getLanguage());
                    ps.setString(5, movie.getTitle());
                    ps.setString(6, movie.getMovieImage());
                    ps.setString(7, movie.getOverView());
                    ps.setTimestamp(8, Timestamp.valueOf(LocalDateTime.now()));
                    ps.setTimestamp(9, Timestamp.valueOf(LocalDateTime.now()));
                });
    }
}
