package com.ssafy.youniverse.security.oauth2.handler;

import com.ssafy.youniverse.entity.Member;
import com.ssafy.youniverse.repository.MemberRepository;
import com.ssafy.youniverse.security.CustomOAuth2User;
import com.ssafy.youniverse.security.jwt.service.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    @Value("${redirection.url}")
    private String Redirection_Url;

    private final JwtService jwtService;
    private final MemberRepository memberRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        log.info("OAuth2 Login 성공!");
        try {
            CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();

            Optional<Member> optionalMember = memberRepository.findByEmail(oAuth2User.getEmail());

            // DB에 존재하는 회원이 아닐 경우
            if (!optionalMember.isPresent()) {
                //TODO : 추후 회원가입 DB 여부에 관한 메서드 추가할 것 .true 부분. 리다이렉션.

                log.info("회원가입 진입");
                String accessToken = jwtService.createAccessToken(oAuth2User.getEmail());
                String refreshToken = jwtService.createRefreshToken(oAuth2User.getEmail());

                response.addHeader(jwtService.getAccessHeader(), "Bearer " + accessToken);
                response.addHeader(jwtService.getRefreshHeader(), "Bearer " + refreshToken);

//                jwtService.updateRefreshToken(oAuth2User.getEmail(), refreshToken); // 레디스에 리프레쉬토큰 저장
                jwtService.sendAccessAndRefreshToken(response, accessToken, refreshToken);


                log.info("accessToken :{} ", accessToken);
                log.info("refreshToken :{} ", refreshToken);
                String email = oAuth2User.getEmail();
                log.info("email :{} ", email);

                /**
                 * TODO: 아래 주소 프론트 서버 연결 시 수정 !! 위 : 3000에서 작업시 / 아래: 서버 배포용
                 */
                /**
                 *프론트의 회원가입 추가 정보 입력 폼으로 리다이렉트
                 */
                 response.sendRedirect(Redirection_Url+"/addinfo?accessToken=" + accessToken + "&refreshToken=" + refreshToken + "&email=" + email);
            }
            else{ // 회원가입된 유저일 경우
                log.info("회원가입된 유저 로그인 진입");
                loginSuccess(response, oAuth2User);
            }
        } catch (Exception e) {
            throw e;
        }
    }

    private void loginSuccess(HttpServletResponse response, CustomOAuth2User oAuth2User) throws IOException {
        String accessToken = jwtService.createAccessToken(oAuth2User.getEmail());
        String refreshToken = jwtService.createRefreshToken(oAuth2User.getEmail());
        String email = oAuth2User.getEmail();
        log.info("refreshToken 발급 완료 : {} ", refreshToken);
        response.addHeader(jwtService.getAccessHeader(), "Bearer " + accessToken);
        response.addHeader(jwtService.getRefreshHeader(), "Bearer " + refreshToken);

        jwtService.sendAccessAndRefreshToken(response, accessToken, refreshToken);
        jwtService.updateRefreshToken(oAuth2User.getEmail(), refreshToken); // 레디스에 리프레쉬 토큰 저장

        /**
         * !!!!!!!!!!!!! 프론트 연결 시 수정 !!!!!!!!
         */
         response.sendRedirect(Redirection_Url+"?accessToken=" + accessToken + "&refreshToken=" + refreshToken + "&email=" + email);

    }
}