package com.ssafy.youniverse.service;

import com.ssafy.youniverse.entity.Member;
import com.ssafy.youniverse.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final S3Service s3Service;

    //회원생성
    public Member createMember(Member member) {
        return memberRepository.save(member);
    }

    //회원조회
    public Member readMember(int memberId) {
        Optional<Member> optionalMember = memberRepository.findById(memberId);

        if (!optionalMember.isPresent()) { //존재하는 회원인지 판별
            throw new RuntimeException("존재하지 않는 회원입니다."); //임시 예외
        }

        return optionalMember.get();
    }

    //회원 리스트 조회
    public Page<Member> readMembers(Pageable pageable) {
        return memberRepository.findAll(pageable);
    }

    //회원정보 수정
    public Member updateMember(Member member, MultipartFile multipartFile) throws IOException {
        Member findMember = readMember(member.getMemberId()); //회원정보에서 회원 불러오기

        //회원정보 수정
        findMember.setNickname(member.getNickname());
        findMember.setEmail(member.getEmail());
        findMember.setGender(member.getGender());
        findMember.setAge(member.getAge());
        findMember.setIntroduce(member.getIntroduce());

        if (findMember.getMemberImage() != null) { //기존 프로필 이미지 삭제
            String file = findMember.getMemberImage();
            s3Service.deleteFile(file);
        }

        if (multipartFile != null) { //프로필 이미지가 존재하는 경우
            String file = s3Service.saveFile(multipartFile);
            findMember.setMemberImage(file);
        } else { //프로필 이미지가 존재하지 않는 경우
            findMember.setMemberImage(null);
        }

        return memberRepository.save(findMember);
    }

    //회원삭제
    public void deleteMember(int memberId) {
        Member findMember = readMember(memberId); //존재하는 회원인지 찾기

        if (findMember.getMemberImage() != null) { //회원 프로필 이미지 존재 여부 파악
            String file = findMember.getMemberImage();
            s3Service.deleteFile(file); //삭제
        }

        memberRepository.delete(findMember);
    }
}
