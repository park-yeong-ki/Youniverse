package com.ssafy.youniverse.repository;

import com.ssafy.youniverse.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Integer>, MemberRepositoryCustom {

//    @Query(value = "select m from Member m where m.nickname is not null and m.memberId in " +
//            "(select km.member.memberId from KeywordMember km where km.keyword.keywordId = " +
//            "(select k.keywordId from Keyword k where k.keywordName = :keyword))")
//    Page<Member> findAllByKeyword(@Param("keyword") String keyword, Pageable pageable);

//    Page<Member> findAllByNicknameContains(String nickname, Pageable pageable);

//    @Query(value = "select distinct m from Member m where m.nickname is not null and m.memberId in " +
//            "(select km.member.memberId from KeywordMember km where km.keyword.keywordId = " +
//            "(select k.keywordId from Keyword k where k.keywordName = :total)) or " +
//            "m.nickname like concat('%',:total,'%')")
//    Page<Member> findAllByTotal(String total, Pageable pageable);

//    @Query(value = "select member_id from best_movie group by member_id having count(movie_id) >= 5 order by rand() limit 1", nativeQuery = true)
//    Integer findByRandom();
    Optional<Member> findByEmail(String email);

//    Page<Member> findAllByNicknameIsNotNull(Pageable pageable);
}
