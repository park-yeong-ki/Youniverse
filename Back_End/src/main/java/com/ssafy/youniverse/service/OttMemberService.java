package com.ssafy.youniverse.service;

import com.ssafy.youniverse.entity.OttMember;
import com.ssafy.youniverse.repository.OttMemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional
@Service
@RequiredArgsConstructor
public class OttMemberService {
    private final OttMemberRepository ottMemberRepository;

    //OttMember 저장
    public OttMember createOttMember(OttMember ottMember) {
        return ottMemberRepository.save(ottMember);
    }

    //OttMember 개별 조회
    @Transactional(readOnly = true)
    public OttMember readOttMember(long ottMemberId) {
        Optional<OttMember> optionalOttMember = ottMemberRepository.findById(ottMemberId);
        if (!optionalOttMember.isPresent()) { //존재하지 않는 OttMember인 경우
            throw new RuntimeException("존재하지 않습니다."); //임시 예외
        }

        return optionalOttMember.get();
    }

    //OttMember 전체 조회
    @Transactional(readOnly = true)
    public List<OttMember> readOttMembers() {
        return ottMemberRepository.findAll();
    }

    //OttMember 삭제
    public void deleteOttMember(long ottMemberId) {
        OttMember ottMember = readOttMember(ottMemberId);
        ottMemberRepository.delete(ottMember);
    }
}
