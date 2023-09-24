package com.ssafy.youniverse.repository;

import com.ssafy.youniverse.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Integer> {
}
