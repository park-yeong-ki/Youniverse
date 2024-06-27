package com.ssafy.youniverse.repository;

import com.ssafy.youniverse.entity.ErrorStartPage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ErrorStartPageRepository extends JpaRepository<ErrorStartPage, Long> {
    List<ErrorStartPage> findAllByErrorCountEquals(int count);
}
