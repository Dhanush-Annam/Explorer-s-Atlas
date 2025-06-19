package com.projectBackend.Controller;

import com.projectBackend.model.TodoTask;
import com.projectBackend.repositories.TodoTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/todo")
@CrossOrigin(origins = "*")
public class TodoTaskController {

    @Autowired
    private TodoTaskRepository todoTaskRepo;

    @PostMapping("/add")
    public TodoTask addTask(@RequestParam String userEmail, @RequestParam String taskContent) {
        TodoTask task = new TodoTask();
        task.setUserEmail(userEmail);
        task.setTaskContent(taskContent);
        return todoTaskRepo.save(task);
    }

    @DeleteMapping("/delete")
    public void deleteTask(@RequestParam Long id) {
        todoTaskRepo.deleteById(id);
    }

    @GetMapping("/get")
    public List<TodoTask> getTasksByEmail(@RequestParam String userEmail) {
        return todoTaskRepo.findByUserEmail(userEmail);
    }
}
