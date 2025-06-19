package com.projectBackend.Controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/tips")
public class TravelTipsController {

    private List<String> travelNudges = Arrays.asList(
            "Avoid overpacking, it’ll save your shoulders.",
            "Download offline maps before the flight.",
            "Mingle with locals to get real food tips.",
            "Stash emergency cash in separate bags.",
            "Carry a tiny diary – memories fade fast!",
            "Ask for recommendations, not reviews.",
            "Start your days early – mornings are peaceful.");

    @GetMapping()
    public String fetchOne() {
        Random dice = new Random();
        return travelNudges.get(dice.nextInt(travelNudges.size()));
    }
}
