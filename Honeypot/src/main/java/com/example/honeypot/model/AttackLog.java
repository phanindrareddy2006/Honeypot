package com.example.honeypot.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name="attack_logs")

public class AttackLog {

@Id
@GeneratedValue(strategy=GenerationType.IDENTITY)

private int id;

private String ip;

private int port;

private String attackType;

private LocalDateTime timestamp;


// ✅ AI Fields

private String aiAttackType;

@Column(length=1000)
private String aiDescription;

@Column(length=1000)
private String aiSolution;

private String aiSeverity;

// ✅ FIXED: int → Integer

private Integer aiRiskScore;



// Default constructor

public AttackLog(){}


// Parameter constructor

public AttackLog(String ip,int port,String attackType,LocalDateTime timestamp){

this.ip=ip;
this.port=port;
this.attackType=attackType;
this.timestamp=timestamp;

}



// GETTERS

public int getId(){
return id;
}

public String getIp(){
return ip;
}

public int getPort(){
return port;
}

public String getAttackType(){
return attackType;
}

public LocalDateTime getTimestamp(){
return timestamp;
}

public String getAiAttackType(){
return aiAttackType;
}

public String getAiDescription(){
return aiDescription;
}

public String getAiSolution(){
return aiSolution;
}

public String getAiSeverity(){
return aiSeverity;
}

// ✅ FIXED getter

public Integer getAiRiskScore(){
return aiRiskScore;
}



// SETTERS

public void setId(int id){
this.id = id;
}

public void setIp(String ip){
this.ip=ip;
}

public void setPort(int port){
this.port=port;
}

public void setAttackType(String attackType){
this.attackType=attackType;
}

public void setTimestamp(LocalDateTime timestamp){
this.timestamp=timestamp;
}

public void setAiAttackType(String aiAttackType){
this.aiAttackType=aiAttackType;
}

public void setAiDescription(String aiDescription){
this.aiDescription=aiDescription;
}

public void setAiSolution(String aiSolution){
this.aiSolution=aiSolution;
}

public void setAiSeverity(String aiSeverity){
this.aiSeverity = aiSeverity;
}

// ✅ FIXED setter

public void setAiRiskScore(Integer aiRiskScore){
this.aiRiskScore = aiRiskScore;
}

}