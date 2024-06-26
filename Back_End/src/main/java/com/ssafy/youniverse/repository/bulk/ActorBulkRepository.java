package com.ssafy.youniverse.repository.bulk;

import com.ssafy.youniverse.entity.Actor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.util.Set;

@Repository
@RequiredArgsConstructor
public class ActorBulkRepository {
    private final JdbcTemplate jdbcTemplate;

    @Transactional
    public void saveAll(Set<Actor> actors) {
        String sql = "INSERT IGNORE INTO actor (actor_id, actor_name, actor_image) " +
                "VALUES (?, ?, ?)";

        jdbcTemplate.batchUpdate(sql,
                actors,
                actors.size(),
                (PreparedStatement ps, Actor actor) -> {
                    ps.setLong(1, actor.getActorId());
                    ps.setString(2, actor.getActorName());
                    ps.setString(3, actor.getActorImage());
                });
    }
}
