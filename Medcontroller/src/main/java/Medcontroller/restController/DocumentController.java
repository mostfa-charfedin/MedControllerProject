package Medcontroller.restController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.http.HttpStatus;

import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.Base64;
import lombok.extern.slf4j.Slf4j;
import Medcontroller.entities.Document;
import Medcontroller.repository.DocumentRepository;
@Slf4j
@RestController
public class DocumentController {

    @Autowired
    private DocumentRepository documentRepository;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFiles(@RequestParam("file1") MultipartFile file1,
                                              @RequestParam("file2") MultipartFile file2,  @RequestParam("agentId") Long agentId,  @RequestParam("medecinId") Long medecinId) {
        try {
            Document document = new Document();
            document.setNomOrdenance(file1.getOriginalFilename());
            document.setOrdenance(file1.getBytes());
            document.setNomBulletin(file2.getOriginalFilename());
            document.setBulletin(file2.getBytes());
            document.setMedecinId(medecinId);
            document.setAgentId(agentId);
            documentRepository.save(document);
            return ResponseEntity.status(HttpStatus.CREATED).body("Files uploaded successfully");
        } catch (IOException e) {
            // Log the error
            log.error("Error uploading files", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading files");
        }
    }
}
