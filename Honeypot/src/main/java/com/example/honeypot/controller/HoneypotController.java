package com.example.honeypot.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import com.example.honeypot.model.AttackLog;
import com.example.honeypot.repository.AttackLogRepository;
import com.example.honeypot.ai.AttackAnalyzer;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")

public class HoneypotController {

    @Autowired
    private AttackLogRepository repo;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;



    // LOGIN HONEYPOT ENDPOINT
    @PostMapping("/login")
    public String login(@RequestBody Map<String,String> body,
                        HttpServletRequest request){

        // Capture IP
        String ip = request.getHeader("X-Forwarded-For");

        if(ip == null || ip.isEmpty()){
            ip = request.getRemoteAddr();
        }

        if(ip.equals("0:0:0:0:0:0:0:1")){
            ip = "127.0.0.1";
        }


        // Capture Port
        int port = request.getRemotePort();


        // Capture Payload
        String payload = body.toString();


        // Basic Detection
        String attackType = "Normal";

        if(payload.contains("OR") || payload.contains("'")){
            attackType = "SQL Injection";
        }



        // ✅ NEW AI ANALYSIS (Severity + Risk)
        Object[] ai = AttackAnalyzer.analyze(payload);


        String aiType = (String) ai[0];

        String aiDescription = (String) ai[1];

        String aiSolution = (String) ai[2];

        String aiSeverity = (String) ai[3];

        int aiRiskScore = (Integer) ai[4];




        // Create Log
        AttackLog log = new AttackLog();

        log.setIp(ip);

        log.setPort(port);

        log.setAttackType(attackType);

        log.setTimestamp(LocalDateTime.now());



        // Save AI Results

        log.setAiAttackType(aiType);

        log.setAiDescription(aiDescription);

        log.setAiSolution(aiSolution);

        log.setAiSeverity(aiSeverity);

        log.setAiRiskScore(aiRiskScore);



        // Save MySQL

        repo.save(log);



        // Send Live Update

        messagingTemplate.convertAndSend("/topic/attacks", log);



        return "Login Failed";
    }



    // GET ALL LOGS

    @GetMapping("/attacks")
    public List<AttackLog> getLogs(){

        return repo.findAll();
    }

}