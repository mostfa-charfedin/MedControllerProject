package Medcontroller.entities;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
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
public class Reclamation {

	
	    @Id 
	    @GeneratedValue(strategy = GenerationType.IDENTITY) 
	    private Long id;

	    private String objet;
	    
	    @Column(columnDefinition = "TEXT")
	    private String text;

	    private  String dateEnvoi;
	    private  String dateTraitement;
	    private  boolean statut;
	    
	    @ManyToOne(cascade = CascadeType.ALL)
	    @JoinColumn(name = "user_id")
	    private User user;
	    
}
