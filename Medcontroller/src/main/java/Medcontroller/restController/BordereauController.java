package Medcontroller.restController;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Base64;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;

import Medcontroller.entities.Bordereau;
import Medcontroller.entities.Document;
import Medcontroller.entities.Facture;
import Medcontroller.entities.Historique;
import Medcontroller.entities.User;
import Medcontroller.repository.HistoriqueRepository;
import Medcontroller.security.SecParams;
import Medcontroller.services.BordereauService;
import Medcontroller.services.DocumentService;
import Medcontroller.services.EmailSender;
import Medcontroller.services.FactureService;
import Medcontroller.services.UserService;
import lombok.extern.slf4j.Slf4j;
import java.io.IOException;

@Slf4j
@RestController
public class BordereauController {
	
	@Autowired
	EmailSender emailSender;
    @Autowired
    private HistoriqueRepository historiqueRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private BordereauService bordereauService;
    @Autowired
    private DocumentService documentService;
    @Autowired
    private FactureService factureService;
    
    @RequestMapping(path = "/allBordereaux",method = RequestMethod.GET)
	public List<Bordereau> getAllBordereaux() {
		return bordereauService.findAllBordereaux();
	 }
    
	@GetMapping("/findBordereauxByUserId/{id}")
	public List<Bordereau> findBordereauByUserId(@PathVariable("id") Long id) {	
		return bordereauService.findBordereauByUserId(id);
    }
    
     @PostMapping("/saveBoredereau")
    public ResponseEntity<String> facturerDocument(
                                              @RequestParam("file1") MultipartFile file1,  
                                              @RequestParam("file2") MultipartFile file2,  
                                              @RequestParam("list") List<String> list,  
                                              @RequestParam("total") String total,
                                              @RequestParam("medecinId") Long medId) {
        try {
        	
        	for (String id : list) {
        	   
        	    String cleanedId = id.replace("[", "").replace("]", "");
        	    long longId = Long.parseLong(cleanedId);
        	    Document document = documentService.getById(longId);
        	    document.setFacturer(true);
        	}
        	LocalDateTime now = LocalDateTime.now();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd   HH:mm");
            String formattedDateTime = now.format(formatter);  
                       
          User medecin =  userService.getUserById(medId);
            
            Facture facture = new Facture();
            facture.setFacture(file2.getBytes());
            double totale = Double.parseDouble(total);
            facture.setTotal(totale);
            
            Bordereau bordereau = new Bordereau();      
            bordereau.setBordereau(file1.getBytes());
            bordereau.setUser(medecin);
            bordereau.setFacture(facture);
            bordereau.setDocumentIds(list);
            bordereau.setPaye(false);
            bordereau.setDateTraitement(formattedDateTime);
            factureService.saveFacture(facture);
            bordereauService.saveBordereau(bordereau);
            
       
            Historique historique = new Historique();
            historique.setAction("demande de facturation");
        
            historique.setTime(formattedDateTime);
            historique.setMedecin(medecin);
            historique.setFacture(facture);
            historiqueRepository.save(historique);
            
            String emailBody ="Bonjour "+ "<br>"+
    		   		"Le médecin"+" " +medecin.getUsername()+" "+ " a passé une demande de facturation.";
    		    String subject ="Demande de facturation";
    		   		emailSender.sendEmail(SecParams.Email_Agentassurance, emailBody,subject);
            
            return ResponseEntity.status(HttpStatus.CREATED).body("Files uploaded successfully");
        } catch (IOException e) {
            log.error("Error uploading files", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading files");
        }
    }
     
     
     @PostMapping("/payerFacture")
     @ResponseBody
     public ResponseEntity<String> payerFacture(@RequestParam("bordereauId") Long bordereauId,   
                                                @RequestParam("adminId") Long adminId) {
	        Bordereau bordereau = bordereauService.findBordereauById(bordereauId);

	        
	        if (bordereau == null) {
	            return ResponseEntity.notFound().build();
	        }
     	LocalDateTime now = LocalDateTime.now();
         DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd   HH:mm");
         String formattedDateTime = now.format(formatter);  
	      
             bordereau.getFacture().setDateFacturation(formattedDateTime);
             bordereau.setDateFacturation(formattedDateTime);
             bordereau.getFacture().setDateFacturation(formattedDateTime);
             bordereau.setPaye(true);
	        Historique historique = new Historique();
         historique.setAction("facture N° "+bordereau.getFacture().getId()+" payé");
       
         
         historique.setTime(formattedDateTime);
         historique.setAdmin(userService.getUserById(adminId));
         historique.setFacture( bordereau.getFacture());
         historiqueRepository.save(historique);
         
         String emailBody ="Bonjour "+ "<br>"+
 		   		"Mr / mme "+" " +bordereau.getUser().getUsername()+" "+ " votre facture N° "+bordereau.getFacture().getId()+" payé";
 		    String subject ="Facture payé";
 		   		emailSender.sendEmail(bordereau.getUser().getEmail(), emailBody,subject);
	        
 	
 		   	return ResponseEntity.ok("Bill paid successfully");
	    }

}
