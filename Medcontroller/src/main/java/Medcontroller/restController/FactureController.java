package Medcontroller.restController;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import Medcontroller.entities.Bordereau;
import Medcontroller.entities.Document;
import Medcontroller.entities.Facture;
import Medcontroller.entities.Historique;
import Medcontroller.exceptions.NoDocumentException;
import Medcontroller.repository.HistoriqueRepository;
import Medcontroller.services.EmailSender;
import Medcontroller.services.FactureService;
import Medcontroller.services.UserService;


@RestController
public class FactureController {
	
	   @Autowired
	    private FactureService factureService;
	   @Autowired
		EmailSender emailSender;
	    @Autowired
	    private HistoriqueRepository historiqueRepository;
	   
	   
	 @RequestMapping(path = "/allFactures",method = RequestMethod.GET)
		public List<Facture> getAllFactures() {
			return factureService.findAllFactures();
		 }

	 
	   

	
	   
}
