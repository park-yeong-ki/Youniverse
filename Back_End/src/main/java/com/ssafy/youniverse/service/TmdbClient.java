package com.ssafy.youniverse.service;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Set;

@FeignClient(value = "tmdb", url = "${tmdb.url}")
public interface TmdbClient {
    /**
     * 인기 영화 순위를 TMDB API로 호출
     * @param language
     * @param page
     * @return
     */
    @GetMapping("/popular")
    String getPopularMoviesId(@RequestParam String language,
                           @RequestParam int page);

    /**
     * 영화 상세 정보와 장르 정보를 API로 호출
     * @param movieId
     * @param language
     * @return
     */
    @GetMapping("/{movieId}")
    String getDetails(@PathVariable int movieId,
                     @RequestParam String language);

    /**
     * 영화 배우와 감독을 API로 호출
     * @param movieId
     * @param language
     * @return
     */
    @GetMapping("/{movieId}/credits")
    String getCredits(@PathVariable int movieId,
                      @RequestParam String language);

    /**
     * 영화 관련 키워드를 API로 호출
     * @param movieId
     * @return
     */
    @GetMapping("/{movieId}/keywords")
    String getKeywords(@PathVariable int movieId);

    /**
     * 영화 관련 OTT 정보를 API로 호출
     * @param movieId
     * @return
     */
    @GetMapping("/{movieId}/watch/providers")
    String getWatchProviders(@PathVariable int movieId);
}
