package com.example.honeypot.ai;

public class AttackAnalyzer {

public static Object[] analyze(String payload){

String type="Normal";
String desc="Normal activity";
String solution="No action needed";
String severity="Low";
int risk=10;


// SQL Injection

if(payload.contains("OR") || payload.contains("'")){

type="SQL Injection";

desc="Attacker tried authentication bypass using SQL injection.";

solution="Use prepared statements and input validation.";

severity="Critical";

risk=95;

}


// XSS

else if(payload.contains("<script>")){

type="XSS Attack";

desc="Cross Site Scripting attempt detected.";

solution="Sanitize input and enable CSP.";

severity="High";

risk=85;

}


// Brute force pattern

else if(payload.length()>30){

type="Suspicious Payload";

desc="Unusually long input detected.";

solution="Apply rate limiting.";

severity="Medium";

risk=60;

}


return new Object[]{type,desc,solution,severity,risk};

}

}