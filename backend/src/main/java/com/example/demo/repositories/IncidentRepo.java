package com.example.demo.repositories;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.models.Incident;

public interface IncidentRepo extends JpaRepository<Incident, Long> {

    @Query(nativeQuery = true, value = """
            select * from incident
            """)
    List<Map<String, Object>> getIncidentData();
}
