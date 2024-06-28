package com.ssafy.youniverse.controller;

import com.ssafy.youniverse.dto.req.DirectorReqDto;
import com.ssafy.youniverse.dto.res.DirectorResDto;
import com.ssafy.youniverse.entity.Director;
import com.ssafy.youniverse.mapper.DirectorMapper;
import com.ssafy.youniverse.service.DirectorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/directors")
public class DirectorController {
    private final DirectorService directorService;
    private final DirectorMapper directorMapper;

    //등록
    @PostMapping("/register")
    public ResponseEntity<?> registerDirector(@RequestBody DirectorReqDto directorReqDto) {
        Director director = directorMapper.directorReqDtoToDirector(directorReqDto);
        Director createdDirector = directorService.createDirector(director);
        DirectorResDto directorResDto = directorMapper.directorToDirectorResDto(createdDirector);
        return new ResponseEntity<>(directorResDto, HttpStatus.OK);
    }

    //조회
    @GetMapping("/{director-id}")
    public ResponseEntity<?> findDirector(@PathVariable("director-id") long directorId) {
        Director findDirector = directorService.readDirector(directorId);
        DirectorResDto directorResDto = directorMapper.directorToDirectorResDto(findDirector);
        return new ResponseEntity<>(directorResDto, HttpStatus.OK);
    }

    //전체조회
    @GetMapping
    public ResponseEntity<?> findDirectors() {
        List<Director> directors = directorService.readDirectors();
        List<DirectorResDto> directorResDtos = directorMapper.directorsToDirectorResDtos(directors);
        return new ResponseEntity<>(directorResDtos, HttpStatus.OK);
    }

    //수정
    @PutMapping("/{director-id}")
    public ResponseEntity<?> modifyDirector(@PathVariable("director-id") long directorId, @RequestBody DirectorReqDto directorReqDto) {
        directorReqDto.setDirectorId(directorId);
        Director director = directorMapper.directorReqDtoToDirector(directorReqDto);
        Director updatedDirector = directorService.updateDirector(director);
        DirectorResDto directorResDto = directorMapper.directorToDirectorResDto(updatedDirector);
        return new ResponseEntity<>(directorResDto, HttpStatus.OK);
    }

    //삭제
    @DeleteMapping("/{director-id}")
    public ResponseEntity<?> removeDirector(@PathVariable("director-id") long directorId) {
        directorService.deleteDirector(directorId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
