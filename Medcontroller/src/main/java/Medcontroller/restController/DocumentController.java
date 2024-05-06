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
import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.sql.Time;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import lombok.extern.slf4j.Slf4j;
import Medcontroller.entities.Bordereau;
import Medcontroller.entities.Document;
import Medcontroller.entities.Facture;
import Medcontroller.entities.Historique;
import Medcontroller.entities.User;
import Medcontroller.exceptions.NoDocumentException;
import Medcontroller.exceptions.UsernameAlreadyExistsException;
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
    public ResponseEntity<String> affecterDocument(@RequestParam("file1") MultipartFile file1,
                                              @RequestParam("file2") MultipartFile file2,  
                                              @RequestParam("agentId") Long agentId,  
                                              @RequestParam("medecinId") Long medecinId,  
                                              @RequestParam("QualiteBinificiaire") String QualiteBinificiaire,
                                              @RequestParam("nomBenificiaire") String nomBenificiaire,
                                              @RequestParam("nomAssure") String nomAssure,
                                              @RequestParam("matriculeAssure") String matriculeAssure) {
        try {
        	
        	LocalDateTime now = LocalDateTime.now();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd   HH:mm");
            String formattedDateTime = now.format(formatter);
            
            User agent = userService.getUserById(agentId);
            
        	Document document =	Document.builder()
        	.dateAffectation(formattedDateTime)
        	.nomBulletin(file2.getOriginalFilename())
        	.bulletin(file2.getBytes())
        	.nomOrdenance(file1.getOriginalFilename())
        	.ordenance(file1.getBytes())
        	.agent(agent).nomAssure(nomAssure)
        	.matriculeAssure(matriculeAssure)
        	.nomBenificiaire(nomBenificiaire)
        	.qualiteBinificiaire(QualiteBinificiaire)
        	.user(userService.getUserById(medecinId))
        	.etat(false).facturer(false).paye(false)
        	.build();
         
            documentService.saveDocument(document);
            Historique historique = new Historique();     
            historique.setAction("Ajout de document");
            historique.setTime(formattedDateTime);
            historique.setMedecin(userService.getUserById(medecinId));
            historique.setAgent(agent);
            historique.setDocument(document);
            historiqueRepository.save(historique);
            
            return ResponseEntity.status(HttpStatus.CREATED).body("Files uploaded successfully");
        } catch (IOException e) {
            log.error("Error uploading files", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading files");
        }
    }
    
    
    @PostMapping("/updateDoc")
    public ResponseEntity<String> ajouterRapport(
                                              @RequestParam("file1") MultipartFile file1,  
                                              @RequestParam("documentId") Long DocId) {
        try {
        	Document existingdocument = documentService.getById(DocId);
        
        	LocalDateTime now = LocalDateTime.now();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd   HH:mm");
            String formattedDateTime = now.format(formatter);  
            
            
            existingdocument.setDateTraitement(formattedDateTime);
        	existingdocument.setRapport(file1.getBytes()); 
        	existingdocument.setFacturer(false);
        	existingdocument.setEtat(true);
            documentService.saveDocument(existingdocument);
            Historique historique = new Historique();
            historique.setAction("Document traité.");
            
       
            
            historique.setTime(formattedDateTime);
            historique.setMedecin(existingdocument.getUser());
            historique.setDocument(existingdocument);
            historiqueRepository.save(historique);
            
            String emailBody ="Bonjour "+ "<br>"+
    		   		"Le médecin"+" " +existingdocument.getUser().getUsername()+" "+ "a traité le document."+"<br>"+"ID document :"+" "+existingdocument.getId();
    		    String subject ="Document traité";
    		   		emailSender.sendEmail(SecParams.Email_Agentassurance, emailBody,subject);
            
            return ResponseEntity.status(HttpStatus.CREATED).body("Files uploaded successfully");
        } catch (IOException e) {
            log.error("Error uploading files", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading files");
        }
    }

    


    
  

    @GetMapping("/doc/{id}")
    public ResponseEntity<Document> getDocumentById(@PathVariable Long id) {
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
    	if(documents.isEmpty())
			throw new NoDocumentException("no documents to load");
    	
      
        return documents;
                
    }
   
}
