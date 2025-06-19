package com.projectBackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.projectBackend.model.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {
}

