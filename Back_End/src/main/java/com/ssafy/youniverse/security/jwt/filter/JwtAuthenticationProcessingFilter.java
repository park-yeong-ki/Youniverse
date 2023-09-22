package com.ssafy.youniverse.security.jwt.filter;


import com.ssafy.youniverse.entity.Member;
import com.ssafy.youniverse.repository.MemberRepository;
import com.ssafy.youniverse.repository.RedisRepository;
import com.ssafy.youniverse.security.jwt.service.JwtService;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.mapping.GrantedAuthoritiesMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.mapping.NullAuthoritiesMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.Duration;
import java.util.Objects;


/**
 * Jwt 인증 필터
 * "/login" 이외의 URI 요청이 왔을 때 처리하는 필터
 *
 * 기본적으로 사용자는 요청 헤더에 AccessToken만 담아서 요청
 * AccessToken 만료 시에만 RefreshToken을 요청 헤더에 AccessToken과 함께 요청
 *
 * 1. RefreshToken이 없고, AccessToken이 유효한 경우 -> 인증 성공 처리, RefreshToken을 재발급하지는 않는다.
 * 2. RefreshToken이 없고, AccessToken이 없거나 유효하지 않은 경우 -> 인증 실패 처리, 403 ERROR
 * 3. RefreshToken이 있는 경우 -> DB의 RefreshToken과 비교하여 일치하면 AccessToken 재발급, RefreshToken 재발급(RTR 방식)
 *                              인증 성공 처리는 하지 않고 실패 처리
 *
 */

@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationProcessingFilter extends OncePerRequestFilter {

    private static final String NO_CHECK_URL = "/login"; // "/login"으로 들어오는 요청은 Filter 작동 X

    private final JwtService jwtService;
    private final MemberRepository memberRepository;
    private final RedisRepository redisRepository;

    private GrantedAuthoritiesMapper authoritiesMapper = new NullAuthoritiesMapper();
        //사용자의 권한(Granted Authorities)을 매핑하거나 변환하는 데 사용
        // NullAuthoritiesMapper는 Spring Security에서 사용자의 권한을 변경하지 않고 그대로 반환하는 단순한 구현체

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        if (request.getRequestURI().equals(NO_CHECK_URL)) { // "/login" 요청이 들어오면,
            filterChain.doFilter(request, response); //다음 필터 호출 //다음 필터 또는 서블릿으로 제어를 넘겨줌
            return; // return으로 이후 현재 필터 진행 막기 (안해주면 아래로 내려가서 계속 필터 진행시킴)
        }

        //사용자 요청 헤더에서 refreshToken 추출
        // 사용자의 요청 헤더에 RefreshToken이 있는 경우는, AccessToken이 만료되어 클라이언트가 RefreshToken을 요청에 담아 보낸 경우밖에 없다.
        // 따라서, 위의 경우를 제외하면 추출한 refreshToken은 모두 null (RefreshToken 비교 후 AccessToken을 재발급)
        String refreshToken = jwtService.extractRefreshToken(request)
                .filter(jwtService::isTokenValid) //
                .orElse(null); // 유효하지않다면 null


        // 리프레시 토큰이 요청 헤더에 존재했다면, 사용자가 AccessToken이 만료되어서
        // RefreshToken까지 보낸 것이므로 리프레시 토큰이 DB의 리프레시 토큰과 일치하는지 판단 후,
        // 일치한다면 AccessToken을 재발급해준다.
        if (refreshToken != null) {
            checkRefreshTokenAndReIssueAccessToken(response, refreshToken);
            return;
            // RefreshToken을 보낸 경우에는 AccessToken을 재발급 하고 인증 처리는 하지 않게 하기위해 바로 return으로 필터 진행 막기
        }

        // RefreshToken이 없거나 유효하지 않다면, AccessToken을 검사하고 인증을 처리하는 로직 수행
        // AccessToken이 없거나 유효하지 않다면, 인증 객체가 담기지 않은 상태로 다음 필터로 넘어가기 때문에 403 에러 발생
        // AccessToken이 유효하다면, 인증 객체가 담긴 상태로 다음 필터로 넘어가기 때문에 인증 성공
        if (refreshToken == null) {
            checkAccessTokenAndAuthentication(request, response, filterChain);
        }
    }



    /**
     *  [리프레시 토큰으로 유저 정보 찾기 & 액세스 토큰/리프레시 토큰 재발급 메소드]
     */
//    public void checkRefreshTokenAndReIssueAccessToken(HttpServletResponse response, String refreshToken) {
//        userRepository.findByRefreshToken(refreshToken) //파라미터로 들어온 헤더에서 추출한 리프레시 토큰으로 DB에서 유저를 찾기
//                .ifPresent(user -> { // 해당 유저가 있다면
//                    String reIssuedRefreshToken = reIssueRefreshToken(user); //reIssueRefreshToken()로 리프레시 토큰 재발급 & DB에 리프레시 토큰 업데이트 메소드 호출
//                    jwtService.sendAccessAndRefreshToken(response, jwtService.createAccessToken(user.getEmail()),//JwtService.createAccessToken()으로 AccessToken 생성,
//                            reIssuedRefreshToken);
//                });
//    }

    public void checkRefreshTokenAndReIssueAccessToken(HttpServletResponse response, String refreshToken) {

        String extractEmail = jwtService.extractEmailFromRefreshToken(refreshToken);

        String refreshTokenInRedis = redisRepository.getValues(extractEmail);

        if(!Objects.isNull(refreshTokenInRedis)){
            String reIssuedRefreshToken = reIssueRefreshToken(extractEmail); //reIssueRefreshToken()로 리프레시 토큰 재발급 & DB에 리프레시 토큰 업데이트 메소드 호출
                    jwtService.sendAccessAndRefreshToken(response, jwtService.createAccessToken(extractEmail),//JwtService.createAccessToken()으로 AccessToken 생성,
                            reIssuedRefreshToken);
        }

    }

    /**
     * [리프레시 토큰 재발급 & DB에 리프레시 토큰 업데이트 메소드]
     */
    private String reIssueRefreshToken(String email) {

        String reIssuedRefreshToken = jwtService.createRefreshToken(email); //리프레쉬토큰 재발급
//        user.updateRefreshToken(reIssuedRefreshToken); //DB에 재발급한 토큰 업데이트
        redisRepository.setValues(email, reIssuedRefreshToken, Duration.ofMillis(1209600000));
//        userRepository.saveAndFlush(user); //변경된 데이터를 즉시 데이터베이스에 동기화 -> 플러쉬
        return reIssuedRefreshToken;
    }

    /**
     * [액세스 토큰 체크 & 인증 처리 메소드]
     */
    private void checkAccessTokenAndAuthentication(HttpServletRequest request, HttpServletResponse response,
                                                   FilterChain filterChain) throws ServletException, IOException {
        log.info("checkAccessTokenAndAuthentication() 호출");
        jwtService.extractAccessToken(request) // 엑세스 토큰 추출
                .filter(jwtService::isTokenValid) // 유효한 토큰이면,  // 클래스이름 :: 메서드이름
                .ifPresent(accessToken -> jwtService.extractEmail(accessToken) //액세스 토큰에서 extractEmail로 Email을 추출
                        .ifPresent(email -> memberRepository.findByEmail(email) //해당 이메일을 사용하는 유저 객체 반환
                                .ifPresent(this::saveAuthentication))); //그 유저 객체를 인증 처리 +인증 허가 처리된 객체를 SecurityContextHolder에 담기

        filterChain.doFilter(request, response);
    }


    /**
     * [인증 허가 메소드]
     */
    public void saveAuthentication(Member myMember) { //* 파라미터의 유저 : 우리가 만든 회원 객체
//        String password = myMember.getPassword();
//        if (password == null) { // 소셜 로그인 유저의 비밀번호 임의로 설정 하여 소셜 로그인 유저도 인증 되도록 설정
////            password = PasswordUtil.generateRandomPassword();
//        }

        // 빌더의 유저 : UserDetails의 User 객체
        UserDetails userDetailsUser = org.springframework.security.core.userdetails.User.builder()
                .username(myMember.getEmail())
//                .password(password)
                .roles(myMember.getRole().name())
                .build();

        Authentication authentication =
                new UsernamePasswordAuthenticationToken(userDetailsUser, null,
                        authoritiesMapper.mapAuthorities(userDetailsUser.getAuthorities()));
        //  UserDetails의 User 객체 안에 Set<GrantedAuthority> authorities이 있어서 getter로 호출한 후에,
        //  new NullAuthoritiesMapper()로 GrantedAuthoritiesMapper 객체를 생성하고 mapAuthorities()에 담기

        SecurityContextHolder.getContext().setAuthentication(authentication);
        //SecurityContextHolder.getContext()로 SecurityContext를 꺼낸 후,
        // setAuthentication()을 이용하여 위에서 만든 Authentication 객체에 대한 인증 허가 처리

    }




}



