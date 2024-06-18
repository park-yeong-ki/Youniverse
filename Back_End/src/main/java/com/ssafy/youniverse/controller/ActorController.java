package com.ssafy.youniverse.controller;

import com.ssafy.youniverse.dto.req.ActorReqDto;
import com.ssafy.youniverse.dto.res.ActorResDto;
import com.ssafy.youniverse.entity.Actor;
import com.ssafy.youniverse.mapper.ActorMapper;
import com.ssafy.youniverse.service.ActorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/actors")
public class ActorController {
    private final ActorMapper actorMapper;
    private final ActorService actorService;

    //등록
    @PostMapping("/register")
    public ResponseEntity<?> registerActor(@RequestBody ActorReqDto actorReqDto) {
        Actor actor = actorMapper.actorReqDtoToActor(actorReqDto);
        Actor createdActor = actorService.createActor(actor);
        ActorResDto actorResDto = actorMapper.actorToActorResDto(createdActor);
        return new ResponseEntity<>(actorResDto, HttpStatus.OK);
    }

    //조회
    @GetMapping("/{actor-id}")
    public ResponseEntity<?> findActor(@PathVariable("actor-id") long actorId) {
        Actor findActor = actorService.readActor(actorId);
        ActorResDto actorResDto = actorMapper.actorToActorResDto(findActor);
        return new ResponseEntity<>(actorResDto, HttpStatus.OK);
    }

    //전체조회
    @GetMapping
    public ResponseEntity<?> findActors() {
        List<Actor> actors = actorService.readActors();
        List<ActorResDto> actorResDtos = actorMapper.actorsToActorResDtos(actors);
        return new ResponseEntity<>(actorResDtos, HttpStatus.OK);
    }

    //수정
    @PutMapping("/{actor-id}")
    public ResponseEntity<?> modifyActor(@PathVariable("actor-id") long actorId, @RequestBody ActorReqDto actorReqDto) {
        actorReqDto.setActorId(actorId);
        Actor actor = actorMapper.actorReqDtoToActor(actorReqDto);
        Actor updatedActor = actorService.updateActor(actor);
        ActorResDto actorResDto = actorMapper.actorToActorResDto(updatedActor);
        return new ResponseEntity<>(actorResDto, HttpStatus.OK);
    }

    //삭제
    @DeleteMapping("/{actor-id}")
    public ResponseEntity<?> removeActor(@PathVariable("actor-id") long actorId) {
        actorService.deleteActor(actorId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
