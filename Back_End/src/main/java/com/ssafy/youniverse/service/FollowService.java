package com.ssafy.youniverse.service;

import com.ssafy.youniverse.entity.Follow;
import com.ssafy.youniverse.entity.Member;
import com.ssafy.youniverse.repository.FollowRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class FollowService {
    private final FollowRepository followRepository;
    private final MemberService memberService;

    //팔로우 생성
    public Follow createFollow(Follow follow) {
        Member follower = memberService.readMember(follow.getFollower().getMemberId());
        Member following = memberService.readMember(follow.getFollowing().getMemberId());
        follow.setFollower(follower);
        follow.setFollowing(following);

        return followRepository.save(follow);
    }

    //팔로우 조회
    public Follow readFollow(int followId) {
        Optional<Follow> optionalFollow = followRepository.findById(followId);
        if (!optionalFollow.isPresent()){ //존재하지 않는 팔로우인 경우
            throw new RuntimeException("존재하지 않습니다."); //임시 예외
        }

        return optionalFollow.get();
    }

    //팔로우 전체 조회
    public List<Follow> readFollows() {
        return followRepository.findAll();
    }

    //팔로우 삭제
    public void deleteFollow(int followId) {
        Follow follow = readFollow(followId);
        followRepository.delete(follow);
    }

}
