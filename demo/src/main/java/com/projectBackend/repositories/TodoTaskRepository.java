package com.projectBackend.repositories;


import com.projectBackend.model.TodoTask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TodoTaskRepository extends JpaRepository<TodoTask, Long> {
     List<TodoTask> findByUserEmail(String userEmail);
}