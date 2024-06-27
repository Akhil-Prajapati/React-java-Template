package com.example.demo.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.Incident;
import com.example.demo.repositories.IncidentRepo;

import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/incident")
public class IncidentController {

    @Autowired
    IncidentRepo incidentRepo;

    @PostMapping("/save-details")
    public String postMethodNameIncidentRepo(@RequestBody Incident req) {

        incidentRepo.save(req);
        return "save the data";
    }

    @PostMapping("/get-details")
    public List<Map<String, Object>> getMethodName() {
        List<Map<String, Object>> list = incidentRepo.getIncidentData();
        return list;
    }

    @Transactional
    @PostMapping("/delete-details")
    public String deleteMethodName(@RequestBody Incident body) {
        incidentRepo.deleteIncidentData(body.getId());
        return "User Delete Successfully";
    }

    @Transactional
    @PostMapping("/update-details")
    public String updateMethodName(@RequestBody Incident body) {
        System.out.println("fisrtname" + body.getFirstName());
        incidentRepo.updateIncidentData(body.getId(), body.getFirstName(), body.getCity(), body.getMobile());
        return "Update Data Successfully";
    }

}
