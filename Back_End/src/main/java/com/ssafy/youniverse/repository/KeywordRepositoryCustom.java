package com.ssafy.youniverse.repository;

import com.ssafy.youniverse.entity.Keyword;

import java.util.List;

public interface KeywordRepositoryCustom {
    List<Keyword> findAllByRandomQueryDsl();
}
