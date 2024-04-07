package Medcontroller.restController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import lombok.extern.slf4j.Slf4j;
import Medcontroller.entities.Document;
import Medcontroller.entities.Historique;
import Medcontroller.entities.User;
import Medcontroller.repository.DocumentRepository;
import Medcontroller.repository.HistoriqueRepository;
import Medcontroller.security.SecParams;
import Medcontroller.services.DocumentService;
import Medcontroller.services.EmailSender;
import Medcontroller.services.UserService;
import java.util.Base64;
@Slf4j
@RestController
public class DocumentController {

    @Autowired
    private DocumentService documentService;
    @Autowired
    private UserService userService;
	@Autowired
	EmailSender emailSender;
    @Autowired
    private HistoriqueRepository historiqueRepository;
    
    @RequestMapping(path = "/allDocs",method = RequestMethod.GET)
	public List<Document> getAllUsers() {
		return documentService.findAllDocuments();
	 }

    @PostMapping("/uploadDoc")
    public ResponseEntity<String> uploadFiles(@RequestParam("file1") MultipartFile file1,
                                              @RequestParam("file2") MultipartFile file2,  
                                              @RequestParam("agentId") Long agentId,  
                                              @RequestParam("medecinId") Long medecinId) {
        try {
        	Document document =	Document.builder()
        	.nomBulletin(file2.getOriginalFilename())
        	.bulletin(file2.getBytes())
        	.nomOrdenance(file1.getOriginalFilename())
        	.ordenance(file1.getBytes())
        	.agentId(agentId)
        	.user(userService.getUserById(medecinId))
        	.Etat("En cours")
        	.build();
          /*  Document document = new Document();
            document.setNomOrdenance(file1.getOriginalFilename());
            document.setOrdenance(Base64.getEncoder().encode(file1.getBytes())); // Encode file1 content to Base64
            document.setNomBulletin(file2.getOriginalFilename());
            document.setBulletin(Base64.getEncoder().encode(file2.getBytes())); // Encode file2 content to Base64
            document.setAgentId(agentId);
            
            User medecin =  userService.getUserById(medecinId);
            document.setUser(medecin);
            */
            documentService.saveDocument(document);
            Historique historique = new Historique();
            historique.setAction("Ajout de document");
            historique.setTime(LocalDateTime.now());
            historique.setUser(userService.getUserById(medecinId));
            historique.setDocument(document);
            historiqueRepository.save(historique);
            
            return ResponseEntity.status(HttpStatus.CREATED).body("Files uploaded successfully");
        } catch (IOException e) {
            log.error("Error uploading files", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading files");
        }
    }
    @PostMapping("/updateDoc")
    public ResponseEntity<String> updateDocument(@RequestParam("file1") MultipartFile file1,
                                              @RequestParam("file2") MultipartFile file2,  
                                              @RequestParam("file3") MultipartFile file3,  
                                              @RequestParam("documentId") Long DocId) {
        try {
        	Document existingdocument = documentService.getById(DocId);
        
 
        	existingdocument.setFacture(Base64.getEncoder().encode(file1.getBytes())); 
        	existingdocument.setBordereau(Base64.getEncoder().encode(file2.getBytes())); 
        	existingdocument.setRapport(Base64.getEncoder().encode(file3.getBytes())); 
        	existingdocument.setEtat("Traité");
            documentService.saveDocument(existingdocument);
            Historique historique = new Historique();
            historique.setAction("Le medecin"+" "+existingdocument.getUser().getUsername()+" "+"a traité  le document.");
            historique.setTime(LocalDateTime.now());
            historique.setUser(existingdocument.getUser());
            historique.setDocument(existingdocument);
            historiqueRepository.save(historique);
            
            String emailBody ="Bonjour "+ "<br>"+
    		   		"Le médecin"+" " +existingdocument.getUser().getUsername()+" "+ "a traité le document."+"<br>"+"ID document :"+" "+existingdocument.getId();
    		    String subject ="Document traité";
    		   		emailSender.sendEmail(existingdocument.getUser().getEmail(), emailBody,subject);
            
            return ResponseEntity.status(HttpStatus.CREATED).body("Files uploaded successfully");
        } catch (IOException e) {
            log.error("Error uploading files", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading files");
        }
    }


    @GetMapping("/doc/{id}")
    public ResponseEntity<Document> getDocument(@PathVariable Long id) {
        Document document = documentService.getById(id);
        if (document == null) {
            return ResponseEntity.notFound().build();
        }
        
        return ResponseEntity.ok(document);
    }

   @GetMapping("/findDocumentByUserId/{id}")
    public List<Document> getDocumentByUserId(@PathVariable Long id) {
	   List<Document> documents = new ArrayList();
    	documents  = documentService.findDocumentByUserId(id);
    	
        if (documents.isEmpty()) {
            return (List<Document>) ResponseEntity.notFound().build();
        }
        
      
        return documents;
                
    }
   
}
