package com.ssafy.youniverse.repository;

import com.ssafy.youniverse.entity.Keyword;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface KeywordRepository extends JpaRepository<Keyword, Long>, KeywordRepositoryCustom {
    Optional<Keyword> findByKeywordName(String keywordName);
}
