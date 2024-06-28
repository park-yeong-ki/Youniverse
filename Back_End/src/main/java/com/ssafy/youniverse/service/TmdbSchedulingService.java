package com.ssafy.youniverse.service;

import com.ssafy.youniverse.entity.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
@Slf4j
@RequiredArgsConstructor
public class TmdbSchedulingService {
    private final ErrorStartPageService errorStartPageService;
    private final TmdbSaveService saveService;
    private final TmdbCallService callService;

    @Value("${tmdb.chunkSize}")
    private int chunkSize;

    @Value("${tmdb.maxPage}")
    private int maxPage;

    /**
     * 매일 오전 5시 갱신
     * TDMB API를 활용해 영화, 장르, 배우, 감독, 키워드를 불러와 DB에 저장
     * maxPage = 500
     */
    @Scheduled(cron = "0 0 5 * * MON", zone = "Asia/Seoul")
    public void getMovieInfosFromTdmb() {
        for (int i = 1; i <= maxPage; i+= chunkSize) {
            try {
                getChunkMovies(i);
                saveService.saveInfos(callService.getMovieSet(), callService.getGenreSet(), callService.getActorSet(),
                        callService.getDirectorSet(), callService.getKeywordSet(),
                        callService.getGenreMovieSet(), callService.getActorMovieSet(), callService.getDirectorMovieSet(),
                        callService.getKeywordMovieSet(), callService.getOttMovieSet());
            } catch (Exception e) {
                log.error("error start page = {}", i, e);
                errorStartPageService.saveError(i, 1);
            }finally {
                callService.setClear();
            }
        }
    }

    /**
     * 에러 횟수가 1번인 시작 페이지를 불러온 후, 영화 정보 저장 기능 실행
     * 성공한 페이지는 에러 페이지 객체 삭제
     * 실패한 페이지는 에러 횟수 2로 갱신
     */
    @Scheduled(cron = "0 0 5 * * TUE", zone = "Asia/Seoul")
    public void getErrorMovieInfosFromTdmb() {

        for (ErrorStartPage current : errorStartPageService.getErrorCountOnePages()) {
            int startPage = current.getStartPage();
            try {
                getChunkMovies(startPage);
                saveService.saveInfos(callService.getMovieSet(), callService.getGenreSet(), callService.getActorSet(),
                        callService.getDirectorSet(), callService.getKeywordSet(),
                        callService.getGenreMovieSet(), callService.getActorMovieSet(), callService.getDirectorMovieSet(),
                        callService.getKeywordMovieSet(), callService.getOttMovieSet());

                log.info("Success error start page = {}", startPage);
                errorStartPageService.deleteError(current);
            } catch (Exception e) {
                log.error("Fail error start page = {}", startPage, e);
                errorStartPageService.updateErrorCount(current);
            } finally {
                callService.setClear();
            }
        }
    }

    /**
     * chunkSize = 5
     * API 호출에 chunkSize 수만큼 병렬 처리
     * 한 페이지당 20개의 영화 정보를 가지고 있는 페이지 chunkSize 만큼 호출
     * @param startPage
     */
    public void getChunkMovies(int startPage){
        List<CompletableFuture<Integer>> cfList =
                IntStream.range(startPage, Math.min(startPage + chunkSize, maxPage))
                .mapToObj(callService::fetchPage)
                .toList();

        CompletableFuture.allOf(cfList.toArray(new CompletableFuture[0])).join();
    }
}
