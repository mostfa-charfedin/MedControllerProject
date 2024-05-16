package Medcontroller.restController;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import Medcontroller.entities.Document;
import Medcontroller.entities.Historique;
import Medcontroller.entities.Reclamation;
import Medcontroller.entities.User;
import Medcontroller.repository.HistoriqueRepository;
import Medcontroller.security.SecParams;
import Medcontroller.services.EmailSender;
import Medcontroller.services.ReclamationService;
import Medcontroller.services.UserService;
import lombok.extern.slf4j.Slf4j;



@Slf4j
@RestController
public class ReclamationController {

	@Autowired
	ReclamationService reclamationService;
	@Autowired
	EmailSender emailSender;
    @Autowired
    private HistoriqueRepository historiqueRepository;
    @Autowired
    private UserService userService;
	
	@RequestMapping(path = "/allReclamations",method = RequestMethod.GET)
	public List<Reclamation> getAllReclamations() {
		return reclamationService.findAllReclamations();
	 }
	
	@PostMapping("/sendReclamation")
    public ResponseEntity<String> envoiReclamation(@RequestParam("text") String text,
                                              @RequestParam("object") String object,  
                                              @RequestParam("userId") Long userId  ) throws IOException { 
                                         
        LocalDateTime now = LocalDateTime.now();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd   HH:mm");
		String formattedDateTime = now.format(formatter);
		
		User user = userService.getUserById(userId);
		
		Reclamation reclamation = new Reclamation();         
		reclamation.setObjet(object);
		reclamation.setStatut(false);
		reclamation.setMessage(text);
		reclamation.setDateEnvoi(formattedDateTime);
		reclamation.setUser(user);
		reclamationService.saveReclamation(reclamation);
		
		Historique historique = new Historique();     
		historique.setAction("Reclamation");
		historique.setTime(formattedDateTime);
		historique.setMedecin(user);
		historiqueRepository.save(historique);
		
	     String emailBody ="Bonjour "+ "<br>"+
 		   		user.getUsername()+" "+ "a passer une reclamation."+"<br>"+"Id reclamation :"+" "+reclamation.getId();
 		    String subject ="Reclamation";
 		   		emailSender.sendEmail(SecParams.Email_Agentassurance, emailBody,subject);
		
		
		return ResponseEntity.status(HttpStatus.CREATED).body("Reclamation uploaded successfully");
    }
	
	@PostMapping("/validerReclamation/{id}")
    public void validerReclamation( @PathVariable(value = "id") Long id  ) throws IOException { 
                                         
        LocalDateTime now = LocalDateTime.now();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd   HH:mm");
		String formattedDateTime = now.format(formatter);
		
		Reclamation reclamation = reclamationService.findReclamationById(id);
		
		reclamation.setStatut(true);
		reclamation.setDateTraitement(formattedDateTime);
		reclamationService.saveReclamation(reclamation);
		
		Historique historique = new Historique();     
		historique.setAction("Reclamation traité");
		historique.setTime(formattedDateTime);
		historique.setMedecin(reclamation.getUser());
		historiqueRepository.save(historique);
		
	     String emailBody ="Bonjour "+ reclamation.getUser().getUsername()+"<br>"+
	    		 "Un administrateur a traité votre reclamation "+"<br>"+"Id reclamation :"+" "+reclamation.getId();
 		    String subject ="Reclamation traité";
 		   		emailSender.sendEmail(reclamation.getUser().getEmail(), emailBody,subject);	
    }
	
}
