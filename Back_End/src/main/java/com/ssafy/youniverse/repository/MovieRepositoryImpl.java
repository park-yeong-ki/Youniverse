package com.ssafy.youniverse.repository;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.youniverse.entity.*;
import com.ssafy.youniverse.util.PageSort;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

import java.util.List;

import static com.ssafy.youniverse.entity.QActorMovie.actorMovie;
import static com.ssafy.youniverse.entity.QDirectorMovie.directorMovie;
import static com.ssafy.youniverse.entity.QHeartMovie.heartMovie;
import static com.ssafy.youniverse.entity.QKeywordMember.keywordMember;
import static com.ssafy.youniverse.entity.QKeywordMovie.keywordMovie;
import static com.ssafy.youniverse.entity.QMember.member;
import static com.ssafy.youniverse.entity.QMovie.movie;
import static com.ssafy.youniverse.entity.QOttMovie.*;
import static com.ssafy.youniverse.entity.QRecommendMovie.recommendMovie;

@RequiredArgsConstructor
@Repository
@Slf4j
public class MovieRepositoryImpl extends PageSort implements MovieRepositoryCustom {
    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public Page<Movie> findAllQueryDsl(Pageable pageable, Long memberId, String director, String actor, String title, Integer type, Long ottId) {
        List<Movie> content = jpaQueryFactory
                .selectFrom(movie)
                .where(eqDirector(director), eqActor(actor), containTitle(title), eqOttId(memberId, ottId), searchType(memberId, type))
                .orderBy(getOrderSpecifier(pageable.getSort(), movie.getType(), movie.getMetadata()))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        Long count = jpaQueryFactory
                .select(movie.count())
                .from(movie)
                .where(eqDirector(director), eqActor(actor), containTitle(title), eqOttId(memberId, ottId), searchType(memberId, type))
                .fetchOne();

        return new PageImpl<>(content, pageable, count);
    }

    private BooleanExpression searchType(Long memberId, Integer type) {
        if (memberId != null && type != null) {
            switch (type) {
                case 1: //선호도 조사 -> 로그인 회원 키워드와 일치하는 키워드를 가진 영화 목록 추천
                    return movie.movieId.in(
                            JPAExpressions
                                    .select(keywordMovie.movie.movieId).distinct()
                                    .from(keywordMovie)
                                    .where(keywordMovie.keyword.keywordId.in(
                                            JPAExpressions
                                                    .select(keywordMember.keyword.keywordId)
                                                    .from(keywordMember)
                                                    .where(keywordMember.member.memberId.eq(memberId))
                                    ))
                    );
                case 2: //로그인 회원 연령, 성별 추천 영화 목록 -> 비슷한 연령과 성별의 회원이 좋아요한 영화 목록 반환
                    return movie.movieId.in(
                            JPAExpressions
                                    .select(heartMovie.movie.movieId).distinct()
                                    .from(heartMovie)
                                    .where(heartMovie.member.memberId.in(
                                            JPAExpressions
                                                    .select(member.memberId)
                                                    .from(member)
                                                    .where(member.age.divide(10).floor().eq(
                                                                    JPAExpressions
                                                                            .select(member.age.divide(10).floor())
                                                                            .from(member)
                                                                            .where(member.memberId.eq(memberId))
                                                            ),
                                                            member.gender.eq(
                                                                    JPAExpressions
                                                                            .select(member.gender)
                                                                            .from(member)
                                                                            .where(member.memberId.eq(memberId))
                                                            )
                                                    )
                                    ))
                    );
                case 3: //회원의 유튜브 추천 영화 조회
                    return movie.movieId.in(
                            JPAExpressions
                                    .select(recommendMovie.movie.movieId)
                                    .from(recommendMovie)
                                    .where(recommendMovie.member.memberId.eq(memberId))
                    );
            }
        }

        return null;
    }

    private BooleanExpression eqOttId(Long memberId, Long ottId) {
        if (memberId != null && ottId != null) {
            return movie.movieId.in(
                    JPAExpressions
                            .select(recommendMovie.movie.movieId)
                            .from(recommendMovie)
                            .where(recommendMovie.member.memberId.eq(memberId),
                                    recommendMovie.movie.movieId.in(
                                            JPAExpressions
                                                    .select(ottMovie.movie.movieId)
                                                    .from(ottMovie)
                                                    .where(ottMovie.ott.ottId.eq(ottId))
                                    )
                            )
            );
        }

        return null;
    }

    private BooleanExpression eqDirector(String director){
        if (StringUtils.hasText(director)) {
            return movie.movieId.in(
                    JPAExpressions
                            .select(directorMovie.movie.movieId)
                            .from(directorMovie)
                            .where(
                                    directorMovie.director.directorId.in(
                                            JPAExpressions
                                                    .select(QDirector.director.directorId)
                                                    .from(QDirector.director)
                                                    .where(QDirector.director.directorName.eq(director))
                                    )
                            )
            );
        }

        return null;
    }

    private BooleanExpression eqActor(String actor) {
        if (StringUtils.hasText(actor)) {
            return movie.movieId.in(
                    JPAExpressions
                            .select(actorMovie.movie.movieId)
                            .from(actorMovie)
                            .where(actorMovie.actor.actorId.in(
                                    JPAExpressions
                                            .select(QActor.actor.actorId)
                                            .from(QActor.actor)
                                            .where(QActor.actor.actorName.eq(actor))
                            ))
            );
        }

        return null;
    }

    private BooleanExpression containTitle(String title) {
        if (StringUtils.hasText(title)) {
            return movie.title.contains(title);
        }

        return null;
    }

}
