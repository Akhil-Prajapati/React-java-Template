package com.example.demo.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.Incident;
import com.example.demo.repositories.IncidentRepo;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.StringUtils;

import jakarta.transaction.Transactional;

import java.io.File;
import java.io.OutputStream;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.apache.tomcat.util.codec.binary.Base64;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/incident")
public class IncidentController {
    @Value("${folderpath}")
    String folderpath;

    @Autowired
    IncidentRepo incidentRepo;

    @PostMapping("/save-details")
    public String postMethodNameIncidentRepo(@RequestBody Incident req) throws Exception {
        System.out.println("files : " + req.getFile());
        if (StringUtils.isNotBlank(req.getFile())) {
            System.out.println("files1 : " + req.getFile());
            byte[] pdfBytes = Base64.decodeBase64(req.getFile().split(",")[1]);
            var uuid = UUID.randomUUID().toString();
            var filePath = folderpath + "/forum" + uuid + ".png";
            System.out.println("filePath : " + filePath);
            var file1 = new File(filePath);
            try (OutputStream stream = FileUtils.openOutputStream(file1)) {
                stream.write(pdfBytes);
            }
            req.setFile(filePath);
        }
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
