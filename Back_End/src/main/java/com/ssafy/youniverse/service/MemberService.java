package com.ssafy.youniverse.service;

import com.ssafy.youniverse.entity.KeywordMember;
import com.ssafy.youniverse.entity.Member;
import com.ssafy.youniverse.entity.Ott;
import com.ssafy.youniverse.entity.OttMember;
import com.ssafy.youniverse.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final S3Service s3Service;
    private final OttService ottService;
    private final OttMemberService ottMemberService;
    private final KeywordService keywordService;
    private final KeywordMemberService keywordMemberService;

    //회원생성
    public Member createMember(Member member) {
        Member createdMember = memberRepository.save(member);

        createdMember.getKeywordMembers().stream().forEach(keywordMember -> {
            keywordMember.setMember(createdMember);
            keywordMember.setKeyword(keywordService.readKeyword(keywordMember.getKeyword().getKeywordId()));
            keywordMemberService.createKeywordMember(keywordMember);
        });

        createdMember.getOttMembers().stream().forEach(ottMember -> {
            ottMember.setMember(createdMember);
            ottMember.setOtt(ottService.readOtt(ottMember.getOtt().getOttId()));
            ottMemberService.createOttMember(ottMember);
        });

        return createdMember;
    }

    //회원조회
    public Member readMember(int memberId) {
        if (memberId == 0) { //인생영화 5개 이상인 랜덤 회원 전송
            memberId = memberRepository.findByRandom();
        }

        Optional<Member> optionalMember = memberRepository.findById(memberId);

        if (!optionalMember.isPresent()) { //존재하는 회원인지 판별
            throw new RuntimeException("존재하지 않는 회원입니다."); //임시 예외
        }

        return optionalMember.get();

    }

    //회원 리스트 조회
    public Page<Member> readMembers(Pageable pageable, String keyword, String nickname) {
        Page<Member> memberPage = null;
        if (StringUtils.hasText(keyword)){ //키워드로 조회하는 경우
            memberPage = memberRepository.findAllByKeyword(keyword, pageable);
        } else if (StringUtils.hasText(nickname)) { //닉네임으로 조회하는 경우
            memberPage = memberRepository.findAllByNicknameContains(nickname, pageable);
        }else { // 회원 전체 조회
            memberPage = memberRepository.findAll(pageable);
        }
        return memberPage;
    }

    //회원정보 수정 -> 수정 후 지연 조회 해결(@ManyToOne 관계에서의 변경이 아닌 @OneToMany를 통해 해결)
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

        Member updatedMember = memberRepository.save(findMember);

        //기존 키워드, 멤버 삭제
        updatedMember.getKeywordMembers().clear();
//        updatedMember.getKeywordMembers().stream().forEach(keywordMember -> {
//            keywordMemberService.deleteKeywordMember(keywordMember.getKeywordMemberId());
//        });

        //기존 ott, 멤버 삭제
        updatedMember.getOttMembers().clear();
//        updatedMember.getOttMembers().stream().forEach(ottMember -> {
//            ottMemberService.deleteOttMember(ottMember.getOttMemberId());
//        });

        //새로운 키워드, 멤버 등록
        member.getKeywordMembers().stream().forEach(keywordMember -> {
            keywordMember.setMember(updatedMember);
            keywordMember.setKeyword(keywordService.readKeyword(keywordMember.getKeyword().getKeywordId()));
//            keywordMemberService.createKeywordMember(keywordMember);
            updatedMember.getKeywordMembers().add(keywordMember);
        });

        //새로운 ott, 멤버 등록
        member.getOttMembers().stream().forEach(ottMember -> {
            ottMember.setMember(updatedMember);
            ottMember.setOtt(ottService.readOtt(ottMember.getOtt().getOttId()));
//            ottMemberService.createOttMember(ottMember);
            updatedMember.getOttMembers().add(ottMember);
        });

        return updatedMember;
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

    //이메일로 회원 조회
    public Member readMemberByEmail(String email) {
        Optional<Member> optionalMember = memberRepository.findByEmail(email);

        if (!optionalMember.isPresent()) { //존재하는 회원인지 판별
            throw new RuntimeException("존재하지 않는 회원입니다."); //임시 예외
        }
        return optionalMember.get();
    }

}
