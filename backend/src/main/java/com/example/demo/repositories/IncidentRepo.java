package com.example.demo.repositories;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.models.Incident;

public interface IncidentRepo extends JpaRepository<Incident, Long> {

        @Query(nativeQuery = true, value = """
                        select * from incident order by id desc
                        """)
        List<Map<String, Object>> getIncidentData();

        @Modifying
        @Query(nativeQuery = true, value = """
                        DELETE FROM incident WHERE id=?1
                        """)
        void deleteIncidentData(Long id);

        @Modifying
        @Query(nativeQuery = true, value = """
                        UPDATE incident SET first_name=?2,city=?3, mobile=?4 WHERE id=?1
                        """)
        void updateIncidentData(Long id, String first_name, String city, String mobile);

}
