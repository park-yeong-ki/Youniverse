package com.ssafy.youniverse.repository.bulk;

import com.ssafy.youniverse.entity.ActorMovie;
import com.ssafy.youniverse.entity.GenreMovie;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.util.Set;

@Repository
@RequiredArgsConstructor
public class GenreMovieBulkRepository {
    private final JdbcTemplate jdbcTemplate;

    @Transactional
    public void saveAll(Set<GenreMovie> genreMovies) {
        String sql = "INSERT IGNORE INTO genre_movie (genre_id, movie_id) " +
                "VALUES (?, ?)";

        jdbcTemplate.batchUpdate(sql,
                genreMovies,
                genreMovies.size(),
                (PreparedStatement ps, GenreMovie genreMovie) -> {
                    ps.setLong(1, genreMovie.getGenre().getGenreId());
                    ps.setLong(2, genreMovie.getMovie().getMovieId());
                });
    }
}
