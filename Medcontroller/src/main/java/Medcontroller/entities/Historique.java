package Medcontroller.entities;


import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
	    private  LocalDateTime Time;
	    
	    @ManyToOne
	    @JoinColumn(name = "user_id")
	    private User user;
	    
	    @ManyToOne
	    @JoinColumn(name = "document_id")
	    private Document document;
}