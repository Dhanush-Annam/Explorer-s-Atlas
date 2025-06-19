package com.projectBackend.Controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;

import com.projectBackend.repositories.ReviewRepository;
import com.projectBackend.model.Review;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "*") // Allow all origins for frontend to access
public class ReviewController {

    private final ReviewRepository repo;

    public ReviewController(ReviewRepository repo) {
        this.repo = repo;
    }

    @PostMapping
    public Review submitReview(@RequestBody Review review) {
        return repo.save(review);
    }

    @GetMapping
    public List<Review> getAllReviews() {
        return repo.findAll();
    }
    
}
