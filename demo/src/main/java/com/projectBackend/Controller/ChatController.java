package com.projectBackend.Controller;

import com.projectBackend.model.ChatRequest;
import com.projectBackend.model.ChatResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin("*")
public class ChatController {

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    @PostMapping
    public ResponseEntity<ChatResponse> chat(@RequestBody ChatRequest chatRequest) {
        String apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + geminiApiKey;

        Map<String, Object> requestBody = Map.of(
            "contents", List.of(
                Map.of("role", "user", "parts", List.of(Map.of("text", chatRequest.getUserMessage())))
            )
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                apiUrl,
                HttpMethod.POST,
                entity,
                new org.springframework.core.ParameterizedTypeReference<Map<String, Object>>() {}
            );
            Map<String, Object> responseBody = response.getBody();

            String reply = extractReply(responseBody);

            return ResponseEntity.ok(new ChatResponse(reply));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ChatResponse("AI response failed."));
        }
    }

    @SuppressWarnings("unchecked")
    private String extractReply(Map<String, Object> responseBody) {
        if (responseBody == null || !responseBody.containsKey("candidates")) return "No response from AI.";

        Object candidatesObj = responseBody.get("candidates");
        if (!(candidatesObj instanceof List<?>)) return "No valid AI response.";
        List<?> candidatesRaw = (List<?>) candidatesObj;
        if (candidatesRaw.isEmpty() || !(candidatesRaw.get(0) instanceof Map)) return "No valid AI response.";
        List<Map<String, Object>> candidates = (List<Map<String, Object>>) candidatesObj;

        Object contentObj = candidates.get(0).get("content");
        if (!(contentObj instanceof Map)) return "Response missing key parts.";
        Map<String, Object> content = (Map<String, Object>) contentObj;

        Object partsObj = content.get("parts");
        if (!(partsObj instanceof List<?>)) return "Response missing key parts.";
        List<?> partsRaw = (List<?>) partsObj;
        if (partsRaw.isEmpty() || !(partsRaw.get(0) instanceof Map)) return "Response incomplete.";
        List<Map<String, Object>> parts = (List<Map<String, Object>>) partsObj;

        return (!parts.isEmpty() && parts.get(0).containsKey("text")) ? (String) parts.get(0).get("text") : "Response incomplete.";
    }
}