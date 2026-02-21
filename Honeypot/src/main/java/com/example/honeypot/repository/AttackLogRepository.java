package com.example.honeypot.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.honeypot.model.AttackLog;

public interface AttackLogRepository extends JpaRepository<AttackLog,Integer>{

}