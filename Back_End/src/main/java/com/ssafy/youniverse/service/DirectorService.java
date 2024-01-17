package com.ssafy.youniverse.service;

import com.ssafy.youniverse.entity.Director;
import com.ssafy.youniverse.repository.DirectorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class DirectorService {
    private final DirectorRepository directorRepository;

    //생성
    public Director createDirector(Director director) {
        return directorRepository.save(director);
    }

    //조회
    @Transactional(readOnly = true)
    public Director readDirector(int directorId) {
        Optional<Director> optionalDirector = directorRepository.findById(directorId);
        if (!optionalDirector.isPresent()) { //존재하지 않는 경우
            throw new RuntimeException("존재하지 않습니다."); //임시예외
        }
        return optionalDirector.get();
    }

    //전체조회
    @Transactional(readOnly = true)
    public List<Director> readDirectors() {
        return directorRepository.findAll();
    }

    //수정
    public Director updateDirector(Director director) {
        Director findDirector = readDirector(director.getDirectorId());
        findDirector.setDirectorImage(director.getDirectorImage());
        findDirector.setDirectorName(director.getDirectorName());
        return directorRepository.save(findDirector);
    }

    //삭제
    public void deleteDirector(int directorId) {
        Director director = readDirector(directorId);
        directorRepository.delete(director);
    }
}
