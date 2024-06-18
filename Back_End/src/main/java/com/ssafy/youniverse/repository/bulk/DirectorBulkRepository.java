package com.ssafy.youniverse.repository.bulk;

import com.ssafy.youniverse.entity.Director;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.util.Set;

@Repository
@RequiredArgsConstructor
public class DirectorBulkRepository {
    private final JdbcTemplate jdbcTemplate;
    @Value("${spring.jpa.properties.hibernate.jdbc.batch_size}")
    private int batchSize;

    @Transactional
    public void saveAll(Set<Director> directors) {
        String sql = "INSERT IGNORE INTO director (director_id, director_name, director_image) " +
                "VALUES (?, ?, ?)";

        jdbcTemplate.batchUpdate(sql,
                directors,
                batchSize,
                (PreparedStatement ps, Director director) -> {
                    ps.setLong(1, director.getDirectorId());
                    ps.setString(2, director.getDirectorName());
                    ps.setString(3, director.getDirectorImage());
                });
    }
}
