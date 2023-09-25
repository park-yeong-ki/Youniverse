package com.ssafy.youniverse.security.oauth2.handler;

import com.ssafy.youniverse.entity.Member;
import com.ssafy.youniverse.repository.MemberRepository;
import com.ssafy.youniverse.security.CustomOAuth2User;
import com.ssafy.youniverse.security.jwt.service.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    private final JwtService jwtService;
    private final MemberRepository memberRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        log.info("OAuth2 Login 성공!");
        try {
            CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();

            // User의 Role이 GUEST일 경우 처음 요청한 회원이므로 회원가입 페이지로 리다이렉트

            //TODO : 추후 회원가입 DB 여부에 관한 메서드 추가할 것 .true 부분. 리다이렉션.

            log.info("회원가입 진입");
            String accessToken = jwtService.createAccessToken(oAuth2User.getEmail());
            String refreshToken = jwtService.createRefreshToken(oAuth2User.getEmail());

            response.addHeader(jwtService.getAccessHeader(), "Bearer " + accessToken);
            response.addHeader(jwtService.getRefreshHeader(), "Bearer " + refreshToken);

            jwtService.updateRefreshToken(oAuth2User.getEmail(), refreshToken); // 레디스에 리프레쉬토큰 저장
            jwtService.sendAccessAndRefreshToken(response, accessToken, refreshToken);


            log.info("accessToken :{} ", accessToken);
            log.info("refreshToken :{} ", refreshToken);
            String email = oAuth2User.getEmail();
            log.info("email :{} ", email);

            /**
             * TODO: 아래 주소 프론트 서버 연결 시 수정 !!!!!!!!
             */
            /**
             *프론트의 회원가입 추가 정보 입력 폼으로 리다이렉트
             */
//            response.sendRedirect("http://localhost:3000/addinfo?accessToken="+accessToken+"refreshToken="+refreshToken+"email="+email);
            response.sendRedirect("https://j9b204.p.ssafy.io/addinfo?accessToken="+accessToken+"&refreshToken="+refreshToken+"&email="+email);

        } catch (Exception e) {
            throw e;
        }
    }

//    private void loginSuccess(HttpServletResponse response, CustomOAuth2User oAuth2User) throws IOException {
//        String accessToken = jwtService.createAccessToken(oAuth2User.getEmail());
//        String refreshToken = jwtService.createRefreshToken(oAuth2User.getEmail());
//        log.info("refreshToken 발급 완료 : {} ", refreshToken);
//        response.addHeader(jwtService.getAccessHeader(), "Bearer " + accessToken);
//        response.addHeader(jwtService.getRefreshHeader(), "Bearer " + refreshToken);
//
//        jwtService.sendAccessAndRefreshToken(response, accessToken, refreshToken);
//        jwtService.updateRefreshToken(oAuth2User.getEmail(), refreshToken); // 레디스에 리프레쉬 토큰 저장
//
//        /**
//         * !!!!!!!!!!!!! 프론트 연결 시 수정 !!!!!!!!
//         */
//        response.sendRedirect("http://localhost:3000?accessToken="+accessToken);
//    }
}