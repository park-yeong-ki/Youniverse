package com.ssafy.youniverse.repository.bulk;

import com.ssafy.youniverse.entity.Genre;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.util.Set;

@Repository
@RequiredArgsConstructor
public class GenreBulkRepository {
    private final JdbcTemplate jdbcTemplate;

    @Transactional
    public void saveAll(Set<Genre> genres) {
        String sql = "INSERT IGNORE INTO genre (genre_id, genre_name) " +
                "VALUES (?, ?)";

        jdbcTemplate.batchUpdate(sql,
                genres,
                genres.size(),
                (PreparedStatement ps, Genre genre) -> {
                    ps.setLong(1, genre.getGenreId());
                    ps.setString(2, genre.getGenreName());
                });
    }
}
