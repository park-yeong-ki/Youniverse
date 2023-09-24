package com.ssafy.youniverse.mapper;

import com.ssafy.youniverse.dto.req.ActorReqDto;
import com.ssafy.youniverse.dto.res.ActorResDto;
import com.ssafy.youniverse.entity.Actor;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ActorMapper {
    Actor actorReqDtoToActor(ActorReqDto actorReqDto);

    ActorResDto actorToActorResDto(Actor actor);

    List<ActorResDto> actorsToActorResDtos(List<Actor> actors);
}
