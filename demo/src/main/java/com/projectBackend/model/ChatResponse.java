package com.projectBackend.model;


public class ChatResponse {
    private String botMessage;
    public ChatResponse(String botMessage) { this.botMessage = botMessage; }
    public String getBotMessage() { return botMessage; }
    public void setBotMessage(String botMessage) { this.botMessage = botMessage; }
}
