package com.example.demo.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.Agri;
import com.example.demo.repositories.AgriRepo;

import jakarta.transaction.Transactional;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/agri")
public class AgriController {
    @Autowired
    AgriRepo AgriRepo;

    @PostMapping("/save-agri-details")
    public Map<String, String> postMethodName(@RequestBody Agri body) {
        System.out.println("savee" + body);
        AgriRepo.save(body);
        return Map.of("message", "data save successfully");

    }

    @PostMapping("/get-agri-details")
    public List<Map<String, Object>> getAgriData() {
        List<Map<String, Object>> list = AgriRepo.getdata();
        return list;
    }

    @Transactional
    @PostMapping("/delete-agri-details")
    public Map<String, String> deleteMethodName(@RequestBody Agri body) {
        System.out.println("groot" + body.getId());
        AgriRepo.deleteAgriData(Long.valueOf(body.getId()));
        return Map.of("message", "Delete Item");

    }

    @Transactional
    @PostMapping("/update-agri-details")
    public Map<String, String> updateMethodName(@RequestBody Agri body) {

        System.out.println("name" + body.getName() + "city" + body.getCity() + "mobile" + body.getMobile());
        // AgriRepo.updateData()
        return Map.of("message", "Data Update Successfully");
    }

}
