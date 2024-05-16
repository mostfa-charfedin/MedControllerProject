package Medcontroller.entities;


import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data @NoArgsConstructor @AllArgsConstructor
@Entity
public class Historique {
	  @Id 
	    @GeneratedValue(strategy = GenerationType.IDENTITY) 
	    private Long id;

	     
	    private String Action;
	    private  String Time;
	    
	    
	    @ManyToOne(cascade = CascadeType.ALL)
	    @JoinColumn(name = "medecin_id")
	    private User medecin;
	    
	    @ManyToOne(cascade = CascadeType.ALL)
	    @JoinColumn(name = "agent_id")
	    private User agent;
	    
	    @ManyToOne(cascade = CascadeType.ALL)
	    @JoinColumn(name = "admin_id")
	    private User admin;
	    
	    @ManyToOne(cascade = CascadeType.ALL)
	    @JoinColumn(name = "document_id")
	    private Document document;

	    @ManyToOne
	    @JoinColumn(name = "facture_id")
	    private Facture facture;
}