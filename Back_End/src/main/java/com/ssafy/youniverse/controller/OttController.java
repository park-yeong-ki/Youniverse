package com.ssafy.youniverse.controller;

import com.ssafy.youniverse.dto.req.OttReqDto;
import com.ssafy.youniverse.dto.res.OttResDto;
import com.ssafy.youniverse.entity.Ott;
import com.ssafy.youniverse.mapper.OttMapper;
import com.ssafy.youniverse.service.OttService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/otts")
@RequiredArgsConstructor
public class OttController {
    private final OttService ottService;
    private final OttMapper ottMapper;

    //Ott 등록
    @PostMapping("/register")
    public ResponseEntity<?> registerOtt(@RequestPart("ottReqDto") OttReqDto ottReqDto,
                                         @RequestPart(value = "image", required = false) MultipartFile multipartFile) throws IOException {
        Ott ott = ottMapper.ottReqDtoToOtt(ottReqDto);
        Ott createdOtt = ottService.createOtt(ott, multipartFile);
        OttResDto ottResDto = ottMapper.ottToOttResDto(createdOtt);
        return new ResponseEntity<>(ottResDto, HttpStatus.OK);
    }

    //Ott 개별 조회
    @GetMapping("/{ott-id}")
    public ResponseEntity<?> findOtt(@PathVariable("ott-id") long ottId) {
        Ott ott = ottService.readOtt(ottId);
        OttResDto ottResDto = ottMapper.ottToOttResDto(ott);
        return new ResponseEntity<>(ottResDto, HttpStatus.OK);
    }

    //Ott 전체 조회
    @GetMapping()
    public ResponseEntity<?> findOtts() {
        List<Ott> otts = ottService.readOtts();
        List<OttResDto> ottResDtos = ottMapper.ottsToOttResDtos(otts);
        return new ResponseEntity<>(ottResDtos, HttpStatus.OK);
    }

    //Ott 수정
    @PutMapping("/{ott-id}")
    public ResponseEntity<?> modifyOtt(@PathVariable("ott-id") long ottId,
                                       @RequestPart("ottReqDto") OttReqDto ottReqDto,
                                       @RequestPart(value = "image", required = false) MultipartFile multipartFile) throws IOException {
        ottReqDto.setOttId(ottId);
        Ott ott = ottMapper.ottReqDtoToOtt(ottReqDto);
        Ott updatedOtt = ottService.updateOtt(ott, multipartFile);
        OttResDto ottResDto = ottMapper.ottToOttResDto(updatedOtt);
        return new ResponseEntity<>(ottResDto, HttpStatus.OK);
    }

    @DeleteMapping("/{ott-id}")
    public ResponseEntity<?> removeOtt(@PathVariable("ott-id") long ottId) {
        ottService.deleteOtt(ottId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
