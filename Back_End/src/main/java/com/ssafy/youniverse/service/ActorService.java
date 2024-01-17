package com.ssafy.youniverse.service;

import com.ssafy.youniverse.entity.Actor;
import com.ssafy.youniverse.repository.ActorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class ActorService {
    private final ActorRepository actorRepository;

    //생성
    public Actor createActor(Actor actor) {
        return actorRepository.save(actor);
    }

    //조회
    @Transactional(readOnly = true)
    public Actor readActor(int actorId) {
        Optional<Actor> optionalActor = actorRepository.findById(actorId);
        if (!optionalActor.isPresent()) { //존재하지 않는 경우
            throw new RuntimeException("존재하지 않습니다."); //임시예외
        }
        return optionalActor.get();
    }

    //전체조회
    @Transactional(readOnly = true)
    public List<Actor> readActors() {
        return actorRepository.findAll();
    }

    //수정
    public Actor updateActor(Actor actor) {
        Actor findActor = readActor(actor.getActorId());
        findActor.setActorImage(actor.getActorImage());
        findActor.setActorName(actor.getActorName());
        return actorRepository.save(findActor);
    }

    //삭제
    public void deleteActor(int actorId) {
        Actor actor = readActor(actorId);
        actorRepository.delete(actor);
    }
}
