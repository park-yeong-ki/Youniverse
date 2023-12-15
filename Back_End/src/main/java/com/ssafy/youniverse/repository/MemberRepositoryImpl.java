package com.ssafy.youniverse.repository;

import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.PathBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.youniverse.entity.*;
import com.ssafy.youniverse.util.PageSort;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

import static com.ssafy.youniverse.entity.QBestMovie.bestMovie;
import static com.ssafy.youniverse.entity.QKeyword.keyword;
import static com.ssafy.youniverse.entity.QKeywordMember.keywordMember;
import static com.ssafy.youniverse.entity.QMember.member;

@RequiredArgsConstructor
@Repository
@Slf4j
public class MemberRepositoryImpl extends PageSort implements MemberRepositoryCustom {
    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public Page<Member> findAllQueryDsl(Pageable pageable, String keyword, String nickname, String total) {
        List<Member> content = jpaQueryFactory
                .select(member).distinct()
                .from(member)
                .join(member.keywordMembers, keywordMember)
                .join(keywordMember.keyword, QKeyword.keyword)
                .where(member.nickname.isNotNull(), eqKeyword(keyword), containNickname(nickname), searchTotal(total))
                .orderBy(getOrderSpecifier(pageable.getSort(), member.getType(), member.getMetadata()))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        Long count = jpaQueryFactory
                .select(member.countDistinct())
                .from(member)
                .join(member.keywordMembers, keywordMember)
                .join(keywordMember.keyword, QKeyword.keyword)
                .where(member.nickname.isNotNull(), eqKeyword(keyword), containNickname(nickname), searchTotal(total))
                .fetchOne();

        return new PageImpl<>(content, pageable, count);
    }

    @Override
    public Integer findByRandomQueryDsl() {
        return jpaQueryFactory
                .select(bestMovie.member.memberId)
                .from(bestMovie)
                .groupBy(bestMovie.member.memberId)
                .having(bestMovie.movie.movieId.count().goe(5))
                .orderBy(Expressions.numberTemplate(Double.class, "function('rand')").asc())
                .fetchFirst();
    }

    private BooleanExpression eqKeyword(String keyword) {
        if (StringUtils.hasText(keyword)) {
            return QKeyword.keyword.keywordName.eq(keyword);
        }

        return null;
    }

    private BooleanExpression containNickname(String nickname) {
        if (StringUtils.hasText(nickname)) {
            return member.nickname.contains(nickname);
        }

        return null;
    }

    private BooleanExpression searchTotal(String total) {
        if (StringUtils.hasText(total)) {
            return keyword.keywordName.eq(total).or(member.nickname.contains(total));
        }

        return null;
    }
}
