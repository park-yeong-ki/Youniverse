package com.ssafy.youniverse.controller;

import com.ssafy.youniverse.dto.req.FollowReqDto;
import com.ssafy.youniverse.dto.res.FollowResDto;
import com.ssafy.youniverse.entity.Follow;
import com.ssafy.youniverse.mapper.FollowMapper;
import com.ssafy.youniverse.service.FollowService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/follows")
@RequiredArgsConstructor
public class FollowController {
    private final FollowService followService;
    private final FollowMapper followMapper;

    //팔로우 등록
    @PostMapping("/register")
    public ResponseEntity<?> registerFollow(@RequestBody FollowReqDto followReqDto) {
        Follow follow = followMapper.followReqDtoToFollow(followReqDto);
        Follow createdFollow = followService.createFollow(follow);
        FollowResDto followResDto = followMapper.followToFollowResDto(createdFollow);

        return new ResponseEntity<>(followResDto, HttpStatus.OK);
    }

    //팔로우 조회
    @GetMapping("/{follow-id}")
    public ResponseEntity<?> findFollow(@PathVariable("follow-id") int followId) {
        Follow follow = followService.readFollow(followId);
        FollowResDto followResDto = followMapper.followToFollowResDto(follow);
        return new ResponseEntity<>(followResDto, HttpStatus.OK);
    }

    //팔로우 전체 조회
    @GetMapping()
    public ResponseEntity<?> findFollows() {
        List<Follow> follows = followService.readFollows();
        List<FollowResDto> followResDtos = followMapper.followsToFollowResDtos(follows);
        return new ResponseEntity<>(followResDtos, HttpStatus.OK);
    }

    //팔로우 삭제
    @DeleteMapping("/{follow-id}")
    public ResponseEntity<?> removeFollow(@PathVariable("follow-id") int followId) {
        followService.deleteFollow(followId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
