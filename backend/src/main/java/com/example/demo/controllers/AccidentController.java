package com.example.demo.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.Accident;
import com.example.demo.repositories.AccidentRepo;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("accidentDetails")
public class AccidentController {

    @Autowired
    AccidentRepo accidentRepo;

    @PostMapping("/save-accident-details")
    public String postMethodName(@RequestBody Accident body) {
        accidentRepo.save(body);
        return "save the data";
    }

    @PostMapping("/get-accident-details")
    public List<Map<String, Object>> getAccidentDetails() {
        List<Map<String, Object>> list = accidentRepo.getAccidentDetails();
        return list;
    }

}
