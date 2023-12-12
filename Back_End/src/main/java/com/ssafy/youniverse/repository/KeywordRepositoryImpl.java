package com.ssafy.youniverse.repository;

import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.youniverse.entity.Keyword;
import com.ssafy.youniverse.entity.QKeyword;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.ssafy.youniverse.entity.QKeyword.keyword;

@RequiredArgsConstructor
@Repository
public class KeywordRepositoryImpl implements KeywordRepositoryCustom {
    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<Keyword> findAllByRandomQueryDsl() {
        return jpaQueryFactory
                .selectFrom(keyword)
                .orderBy(Expressions.numberTemplate(Double.class, "function('rand')").asc())
                .limit(20)
                .fetch();
    }
}
