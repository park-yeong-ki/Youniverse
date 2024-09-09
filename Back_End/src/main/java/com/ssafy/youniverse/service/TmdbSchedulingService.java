package com.ssafy.youniverse.service;

import com.ssafy.youniverse.entity.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobParametersBuilder;
import org.springframework.batch.core.JobParametersInvalidException;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.batch.core.repository.JobExecutionAlreadyRunningException;
import org.springframework.batch.core.repository.JobInstanceAlreadyCompleteException;
import org.springframework.batch.core.repository.JobRestartException;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
@Slf4j
@RequiredArgsConstructor
public class TmdbSchedulingService {
    private final JobLauncher jobLauncher;
    private final Job tmdbJob;

    /**
     * 매주 오전 5시 갱신
     * TDMB API를 활용해 영화, 장르, 배우, 감독, 키워드를 불러와 DB에 저장
     * maxPage = 500
     */
    @Scheduled(cron = "0 0 5 * * MON", zone = "Asia/Seoul")
    public void getMovieInfosFromTdmb() throws JobInstanceAlreadyCompleteException, JobExecutionAlreadyRunningException, JobParametersInvalidException, JobRestartException {
        jobLauncher.run(tmdbJob,
                new JobParametersBuilder()
                        .addLocalDateTime("date", LocalDateTime.now())
                        .toJobParameters());
    }
}
