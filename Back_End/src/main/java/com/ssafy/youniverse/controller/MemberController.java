package com.ssafy.youniverse.controller;

import com.ssafy.youniverse.dto.req.MemberReqDto;
import com.ssafy.youniverse.dto.res.MemberResDto;
import com.ssafy.youniverse.entity.Member;
import com.ssafy.youniverse.handler.exception.InvalidAccessTokenException;
import com.ssafy.youniverse.mapper.MemberMapper;
import com.ssafy.youniverse.security.jwt.service.JwtService;
import com.ssafy.youniverse.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;
    private final MemberMapper memberMapper;
    private final JwtService jwtService;

    //회원가입
    @PostMapping("/register")
    public ResponseEntity<?> registerMember(@RequestBody MemberReqDto memberReqDto) {
        Member member = memberMapper.memberReqDtoToMember(memberReqDto);
        Member createdMember = memberService.createMember(member);
        MemberResDto memberResDto = memberMapper.memberToMemberResDto(createdMember);
        return new ResponseEntity<>(memberResDto, HttpStatus.OK);
    }

    //개별 회원조회 -> 랜덤 회원 추천일 경우 회원 식별자에 0이 들어옴
    @GetMapping("/{member-id}")
    public ResponseEntity<?> findMember(@PathVariable("member-id") int memberId) {
        Member member = memberService.readMember(memberId);
        MemberResDto memberResDto = memberMapper.memberToMemberResDto(member);
        return new ResponseEntity<>(memberResDto, HttpStatus.OK);
    }

    //전체 회원조회(페이지네이션 적용 -> 파라미터에 page, size 값 입력, 입력하지 않으면 기본값 page=0, size=10)
    //키워드를 입력하거나,
    @GetMapping
    public ResponseEntity<?> findMembers(@PageableDefault(sort = "memberId", direction = Sort.Direction.DESC) Pageable pageable,
                                         @RequestParam(required = false, name = "keyword") String keyword,
                                         @RequestParam(required = false, name = "nickname") String nickname,
                                         @RequestParam(required = false, name = "total") String total) {
        Page<Member> memberPage = memberService.readMembers(pageable, keyword, nickname, total);
        Page<MemberResDto> memberResDtoPage = memberPage.map(member -> memberMapper.memberToMemberResDto(member));
        return new ResponseEntity<>(memberResDtoPage, HttpStatus.OK);
    }

    //회원정보 수정
    @PutMapping("/{member-id}")
    public ResponseEntity<?> modifyMember(@PathVariable("member-id") int memberId,
                                          @RequestPart(value = "memberReqDto") MemberReqDto memberReqDto,
                                          @RequestPart(value = "image", required = false) MultipartFile multipartFile) throws IOException {
        memberReqDto.setMemberId(memberId);
        Member member = memberMapper.memberReqDtoToMember(memberReqDto);
        Member updatedMember = memberService.updateMember(member, multipartFile);
        MemberResDto memberResDto = memberMapper.memberToMemberResDto(updatedMember);
        return new ResponseEntity<>(memberResDto, HttpStatus.OK);
    }

    //회원탈퇴
    @DeleteMapping("/{member-id}")
    public ResponseEntity<?> leaveMember(@PathVariable("member-id") int memberId) {
        memberService.deleteMember(memberId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //TODO : 로그아웃 기본 oauth로 실행 중. 현재 아래 컨트롤러 정확한 동작 안함
    //로그아웃
    @PostMapping("/logout")
    public ResponseEntity<?> logoutMember(HttpServletRequest request) {
        log.info("로그아웃 컨트롤러 실행");
//        log.info("request :{}", request);

//        String accessToken = jwtService.extractAccessToken(request).orElseThrow(() -> {
//            throw new InvalidAccessTokenException(InvalidAccessTokenException.INVALID_ACCESS_TOKEN);
//        });
//        jwtService.saveBlackList(accessToken);
//        jwtService.deleteRefreshToken(accessToken);
//
//        return new ResponseEntity<>(HttpStatus.OK);

        return jwtService.extractAccessToken(request)
                .filter(jwtService::isAccessTokenValid)
                .map(accessToken -> {
                    jwtService.saveBlackList(accessToken);
                    jwtService.deleteRefreshToken(accessToken);
                    return new ResponseEntity<>(HttpStatus.OK);
                })
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.BAD_REQUEST));
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<?> findMemberByEmail(@PathVariable("email") String email) {
        Member member = memberService.readMemberByEmail(email);
        MemberResDto memberResDto = memberMapper.memberToMemberResDto(member);
        return new ResponseEntity<>(memberResDto, HttpStatus.OK);
    }

}
