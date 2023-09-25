package com.ssafy.youniverse.security.jwt.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.ssafy.youniverse.handler.exception.InvalidAccessTokenException;
import com.ssafy.youniverse.repository.MemberRepository;
import com.ssafy.youniverse.repository.RedisRepository;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.time.Duration;
import java.util.Date;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Getter
@Slf4j
public class JwtService {

    @Value("${jwt.secretKey}")
    private String secretKey;

    @Value("${jwt.access.expiration}")
    private Long accessTokenExpirationPeriod;

    @Value("${jwt.refresh.expiration}")
    private Long refreshTokenExpirationPeriod;

    @Value("${jwt.access.header}")
    private String accessHeader;

    @Value("${jwt.refresh.header}")
    private String refreshHeader;

    /**
     * JWT의 Subject와 Claim으로 email 사용 -> 클레임의 name을 "email"으로 설정
     * JWT의 헤더에 들어오는 값 : 'Authorization(Key) = Bearer {토큰} (Value)' 형식
     */
//    각 필드들에 설정 파일인 application-jwt.yml의 프로퍼티들을 주입

    private static final String ACCESS_TOKEN_SUBJECT = "AccessToken";
    private static final String REFRESH_TOKEN_SUBJECT = "RefreshToken";
    private static final String EMAIL_CLAIM = "email";
    private static final String BEARER = "Bearer ";

    private final MemberRepository memberRepository;
    private final RedisRepository redisRepository;

    // AccessToken 생성
    public String createAccessToken(String email){
        log.info("createAccessToken 동작");
        Date now = new Date();
        return JWT.create()
                .withSubject(ACCESS_TOKEN_SUBJECT) // JWT의 subject 지정 -> AccessToken으로 지정
                .withExpiresAt(new Date(now.getTime() + accessTokenExpirationPeriod)) // 토큰 만료시간
                .withClaim(EMAIL_CLAIM, email) //클레임으로 email 사용 .withClaim(클레임이름. 클레임값)
                .sign(Algorithm.HMAC512(secretKey));
    }

    // RefreshToken 생성
    //RefreshToken은 Claim에 email 넣지 않으므로 withClaim() X -> 넣었음 레디스 추가
    public String createRefreshToken(String email) {
        log.info("createRefreshToken 동작");
        Date now = new Date();
        return JWT.create()
                .withSubject(REFRESH_TOKEN_SUBJECT)
                .withExpiresAt(new Date(now.getTime() + refreshTokenExpirationPeriod))
                .withClaim(EMAIL_CLAIM, email) //클레임으로 email 사용 .withClaim(클레임이름. 클레임값)
                .sign(Algorithm.HMAC512(secretKey));
    }

    // AccessToken 헤더에 실어 보내기
    public void sendAccessToken(HttpServletResponse response, String accessToken){

        response.setStatus(HttpServletResponse.SC_OK);
        setAccessTokenHeader(response, accessToken);

        log.info("재발급된 Access Token : {}", BEARER+accessToken);
    }

    //     * AccessToken + RefreshToken 헤더에 실어서 보내기
    public void sendAccessAndRefreshToken(HttpServletResponse response, String accessToken, String refreshToken) {
        response.setStatus(HttpServletResponse.SC_OK);

        setAccessTokenHeader(response, accessToken);
        setRefreshTokenHeader(response, refreshToken);

        log.info("Access Token, Refresh Token 헤더 설정 완료");
    }

    //헤더에서 RefreshToken 추출
    //토큰 형식 : Bearer 제거 //헤더를 가져온 후 Bearer 삭제
    public Optional<String> extractRefreshToken(HttpServletRequest request) {
        return Optional.ofNullable(request.getHeader(refreshHeader))
                .filter(refreshToken -> refreshToken.startsWith(BEARER))
                .map(refreshToken -> refreshToken.replace(BEARER, ""));
    }

    //헤더에서 AccessToken 추출
    //토큰 형식 : Bearer 제거 //헤더를 가져온 후 Bearer 삭제
    public Optional<String> extractAccessToken(HttpServletRequest request) {
        return Optional.ofNullable(request.getHeader(accessHeader))
                .filter(refreshToken -> refreshToken.startsWith(BEARER))
                .map(refreshToken -> refreshToken.replace(BEARER, ""));
    }

    //AccessToken에서 Email 추출
    public Optional<String> extractEmail(String accessToken) {
        try {
            // 토큰 유효성 검사하는 데에 사용할 알고리즘이 있는 JWT verifier builder 반환
            return Optional.ofNullable(JWT.require(Algorithm.HMAC512(secretKey)) //추출 전에 JWT.require()로 검증기 생성
                    .build() // 반환된 빌더로 JWT verifier 생성
                    .verify(accessToken) // accessToken을 검증하고 유효하지 않다면 예외 발생
                    .getClaim(EMAIL_CLAIM) // claim(Emial) 가져오기
                    .asString());
        } catch (Exception e) {
            log.error("액세스 토큰이 유효하지 않습니다.");
            return Optional.empty(); //유효하지 않다면 빈 Optional 객체 반환
//            return ResponseE
        }
    }

    /**
     * AccessToken 헤더 설정
     */
    public void setAccessTokenHeader(HttpServletResponse response, String accessToken) {
        response.setHeader(accessHeader, BEARER+accessToken);
        log.info(" setAccessTokenHeader 실행 완료");
    }

    /**
     * RefreshToken 헤더 설정
     */
    public void setRefreshTokenHeader(HttpServletResponse response, String refreshToken) {
        response.setHeader(refreshHeader, BEARER+refreshToken);
    }

    /**
     * RefreshToken DB 저장(업데이트) -> RefreshToken Redis 저장
     */
    public void updateRefreshToken(String email, String refreshToken) {
//        memberRepository.findByEmail(email).ifPresentOrElse(
//                member -> {
//                    member.updateRefreshToken(refreshToken);
                    redisRepository.setValues(email, refreshToken, Duration.ofMillis(refreshTokenExpirationPeriod));
                    log.info(" RefreshToken Redis 저장(업데이트)");
//                },
//                () -> { throw new RuntimeException("일치하는 회원이 없습니다."); }
//        );
    }
    public boolean isAccessTokenValid(String accessToken) {
        Optional<String> blackListOption = Optional.ofNullable(redisRepository.getValues(accessToken));

        try {
            if(blackListOption.isPresent()) throw new InvalidAccessTokenException(InvalidAccessTokenException.INVALID_ACCESS_TOKEN);
            JWT.require(Algorithm.HMAC512(secretKey)).build().verify(accessToken);
            return true;
        } catch (Exception e) {
            log.error("유효하지 않은 토큰입니다. {}", e.getMessage());
            throw new InvalidAccessTokenException(InvalidAccessTokenException.INVALID_ACCESS_TOKEN);
        }
    }

    public boolean isRefreshTokenValid(String refreshToken) {
        try {
            JWT.require(Algorithm.HMAC512(secretKey)).build().verify(refreshToken);
            return true;
        } catch (Exception e) {
            log.error("유효하지 않은 토큰입니다. {}", e.getMessage());
            return false;
        }
    }


    public String extractEmailFromRefreshToken(String refreshToken) {
        try {
            // 주어진 리프레시 토큰을 파싱하여 JWT 객체 생성
            DecodedJWT jwt = JWT.decode(refreshToken);

            // JWT에서 이메일 클레임 값을 추출
            Claim emailClaim = jwt.getClaim("email");
            if (emailClaim.isNull()) {
                // 이메일 클레임이 존재하지 않을 경우 처리
                throw new IllegalArgumentException("RefreshToken does not contain email claim.");
            }

            // 이메일 클레임 값을 문자열로 반환
            return emailClaim.asString();
        } catch (JWTDecodeException e) {
            // JWT 파싱 오류 처리
            throw new IllegalArgumentException("Invalid RefreshToken format.");
        }
    }


    public void saveBlackList(String accessToken){
        log.info("saveBlackList 동작");
        DecodedJWT jwt = JWT.decode(accessToken);
        Date expiresAt = jwt.getExpiresAt();
        long remainingTime = expiresAt.getTime() - System.currentTimeMillis();

        if (remainingTime > 0) {
            Duration duration = Duration.ofMillis(remainingTime);
            redisRepository.setValues(accessToken, "logout", duration);
        }
    }

    public void deleteRefreshToken(String accessToken){
        String email = extractEmailFromAccessToken(accessToken);
        redisRepository.deleteValues(email);

    }

    public String extractEmailFromAccessToken(String accessToken) {
        try {
            // 주어진 리프레시 토큰을 파싱하여 JWT 객체 생성
            DecodedJWT jwt = JWT.decode(accessToken);

            // JWT에서 이메일 클레임 값을 추출
            Claim emailClaim = jwt.getClaim("email");
            if (emailClaim.isNull()) {
                // 이메일 클레임이 존재하지 않을 경우 처리
                throw new IllegalArgumentException("AccessToken does not contain email claim.");
            }

            // 이메일 클레임 값을 문자열로 반환
            return emailClaim.asString();
        } catch (JWTDecodeException e) {
            // JWT 파싱 오류 처리
            throw new IllegalArgumentException("Invalid AccessToken format.");
        }
    }


}
