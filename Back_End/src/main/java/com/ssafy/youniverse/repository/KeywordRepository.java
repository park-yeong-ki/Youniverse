package com.ssafy.youniverse.repository;

import com.ssafy.youniverse.entity.Keyword;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface KeywordRepository extends JpaRepository<Keyword, Integer> {
    Optional<Keyword> findByKeywordName(String keywordName);
}
