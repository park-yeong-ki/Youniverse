package com.ssafy.youniverse.repository.bulk;

import com.ssafy.youniverse.entity.Keyword;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.util.Set;

@Repository
@RequiredArgsConstructor
public class KeywordBulkRepository {
    private final JdbcTemplate jdbcTemplate;

    @Transactional
    public void saveAll(Set<Keyword> keywords) {
        String sql = "INSERT IGNORE INTO keyword (keyword_id, keyword_name) " +
                "VALUES (?, ?)";

        jdbcTemplate.batchUpdate(sql,
                keywords,
                keywords.size(),
                (PreparedStatement ps, Keyword keyword) -> {
                    ps.setLong(1, keyword.getKeywordId());
                    ps.setString(2, keyword.getKeywordName());
                });
    }
}
