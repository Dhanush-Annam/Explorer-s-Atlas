package com.projectBackend.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.concurrent.atomic.AtomicInteger;

@RestController
public class VisitorsController {

    private static final AtomicInteger count = new AtomicInteger(500);
    @GetMapping("/visitors")
    public int getVisitorCount() { return count.incrementAndGet(); }
}


