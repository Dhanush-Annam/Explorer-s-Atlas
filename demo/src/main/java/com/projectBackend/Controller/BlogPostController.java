package com.projectBackend.Controller;

import com.projectBackend.model.BlogPost;
import com.projectBackend.repositories.BlogPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/blog")
@CrossOrigin(origins = "*")
public class BlogPostController {

    @Autowired
    private BlogPostRepository repository;

    @PostMapping("/like/{id}")
    public ResponseEntity<String> like(@PathVariable Long id) {
        return repository.findById(id).map(post -> {
            post.setLikes(post.getLikes() + 1);
            repository.save(post);
            return ResponseEntity.ok("Liked post " + id);
        }).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/dislike/{id}")
    public ResponseEntity<String> dislike(@PathVariable Long id) {
        return repository.findById(id).map(post -> {
            post.setDislikes(post.getDislikes() + 1);
            repository.save(post);
            return ResponseEntity.ok("Disliked post " + id);
        }).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/save/{id}")
    public ResponseEntity<String> save(@PathVariable Long id) {
        return repository.findById(id).map(post -> {
            post.setSaved(true);
            repository.save(post);
            return ResponseEntity.ok("Saved post " + id);
        }).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<BlogPost> getPost(@PathVariable Long id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/create-sample")
    public ResponseEntity<String> createSampleData() {
        BlogPost post1 = new BlogPost();
        post1.setId(1L);
        post1.setTitle("Paris Trip");
        post1.setContent("Join us on our biggest trip to the city of love");
        post1.setLikes(0);
        post1.setDislikes(0);
        post1.setSaved(false);

        BlogPost post2 = new BlogPost();
        post2.setId(2L);
        post2.setTitle("Maldives Trip");
        post2.setContent("Win exciting deals and join us in a trip to Maldives");
        post2.setLikes(0);
        post2.setDislikes(0);
        post2.setSaved(false);

        BlogPost post3 = new BlogPost();
        post3.setId(3L);
        post3.setTitle("Seven Sisters Trip");
        post3.setContent("Join us in a trip to the Seven Sisters");
        post3.setLikes(0);
        post3.setDislikes(0);
        post3.setSaved(false);

        repository.save(post1);
        repository.save(post2);
        repository.save(post3);

        return ResponseEntity.ok("Sample data created successfully");
    }
}