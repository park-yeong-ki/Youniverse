package com.ssafy.youniverse.service;

import com.ssafy.youniverse.entity.ActorMovie;
import com.ssafy.youniverse.repository.ActorMovieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class ActorMovieService {
    private final ActorMovieRepository actorMovieRepository;

    //생성
    public ActorMovie createActorMovie(ActorMovie actorMovie) {
        return actorMovieRepository.save(actorMovie);
    }

    //조회
    @Transactional(readOnly = true)
    public ActorMovie readActorMovie(long actorMovieId) {
        Optional<ActorMovie> optionalActorMovie = actorMovieRepository.findById(actorMovieId);
        if (!optionalActorMovie.isPresent()) { //존재하지 않는 경우
            throw new RuntimeException("존재하지 않습니다."); //임시예외
        }
        return optionalActorMovie.get();
    }

    //삭제
    public void deleteActorMovie(long actorMovieId) {
        ActorMovie actorMovie = readActorMovie(actorMovieId);
        actorMovieRepository.delete(actorMovie);
    }
}
