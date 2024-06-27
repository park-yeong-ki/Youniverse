package com.ssafy.youniverse.service;

import com.ssafy.youniverse.entity.ErrorStartPage;
import com.ssafy.youniverse.repository.ErrorStartPageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class ErrorStartPageService {
    private final ErrorStartPageRepository errorStartPageRepository;

    public void saveError(int startPageId, int errorCount) {
        ErrorStartPage errorStartPage = makeErrorStartPage(startPageId, errorCount);
        errorStartPageRepository.save(errorStartPage);
    }

    public void updateErrorCount(ErrorStartPage errorStartPage) {
        ErrorStartPage findErrorStartPage = errorStartPageRepository.findById(errorStartPage.getId()).get();
        findErrorStartPage.setErrorCount(2);
    }

    public List<ErrorStartPage> getErrorCountOnePages() {
        return errorStartPageRepository.findAllByErrorCountEquals(1);
    }

    public void deleteError(ErrorStartPage startPage) {
        errorStartPageRepository.delete(startPage);
    }

    private ErrorStartPage makeErrorStartPage(int startPageId, int errorCount) {
        ErrorStartPage errorStartPage = new ErrorStartPage();
        errorStartPage.setStartPage(startPageId);
        errorStartPage.setErrorCount(errorCount);
        return errorStartPage;
    }
}
