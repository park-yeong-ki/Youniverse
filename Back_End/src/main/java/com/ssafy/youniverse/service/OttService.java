package com.ssafy.youniverse.service;

import com.ssafy.youniverse.entity.Ott;
import com.ssafy.youniverse.repository.OttRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class OttService {
    private final OttRepository ottRepository;
    private final S3Service s3Service;

    //Ott 등록
    public Ott createOtt(Ott ott, MultipartFile multipartFile) throws IOException {
        String file = s3Service.saveFile(multipartFile);
        ott.setOttImage(file);
        return ottRepository.save(ott);
    }

    //Ott 개별 조회
    @Transactional(readOnly = true)
    public Ott readOtt(int ottId) {
        Optional<Ott> optionalOtt = ottRepository.findById(ottId);
        if (!optionalOtt.isPresent()) { //Ott가 존재하지 않는 경우
            throw new RuntimeException("존재하지 않는 OTT 입니다."); //임시 예외
        }
        return optionalOtt.get();
    }

    //Ott 전체 조회
    @Transactional(readOnly = true)
    public List<Ott> readOtts() {
        return ottRepository.findAll();
    }

    //Ott 수정
    public Ott updateOtt(Ott ott, MultipartFile multipartFile) throws IOException {
        Ott findOtt = readOtt(ott.getOttId());
        findOtt.setOttName(ott.getOttName());
        findOtt.setOttUrl(ott.getOttUrl());

        if (findOtt.getOttImage() != null) { //기존 OTT 이미지가 존재하는 경우
            String file = findOtt.getOttImage();
            s3Service.deleteFile(file); //OTT 이미지 삭제
        }

        if (multipartFile != null) { //OTT 이미지가 존재하는 경우
            String file = s3Service.saveFile(multipartFile);
            findOtt.setOttImage(file);
        } else { //OTT 이미지가 존재하지 않는 경우
            findOtt.setOttImage(null);
        }

        return ottRepository.save(findOtt);
    }

    //Ott 삭제
    public void deleteOtt(int ottId) {
        Ott findOtt = readOtt(ottId); //OTT 찾기
        if (findOtt.getOttImage() != null) { //OTT 프로필 이미지 존재 여부 파악
            String file = findOtt.getOttImage();
            s3Service.deleteFile(file); //삭제
        }
        ottRepository.delete(findOtt); //OTT 삭제
    }

}
