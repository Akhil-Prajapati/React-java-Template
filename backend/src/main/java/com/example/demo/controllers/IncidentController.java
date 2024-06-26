package com.example.demo.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.Incident;
import com.example.demo.repositories.IncidentRepo;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/incident")
@CrossOrigin(origins = "*")
public class IncidentController {

    @Autowired
    IncidentRepo incidentRepo;

    @PostMapping("/save-details")
    public String postMethodName(@RequestBody Incident req) {
        System.out.println(req);
        incidentRepo.save(req);
        return "save the data";
    }

    @PostMapping("/get-details")
    public List<Map<String, Object>> getMethodName(@RequestBody Incident req) {
        System.out.println(req);
        List<Map<String, Object>> list = incidentRepo.getIncidentData();
        return list;
    }

}
