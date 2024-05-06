package Medcontroller.entities;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Bordereau {
	  @Id
	  @GeneratedValue(strategy = GenerationType.IDENTITY)
	  private Long id;
	  
	    @Lob
	    @Column(columnDefinition = "LONGBLOB")
	    private byte[] bordereau;
	    
	

	    @ManyToOne(cascade = CascadeType.ALL)
	    @JoinColumn(name = "user_id")
	    private User user;
	    

	    private List<String> documentIds;
	    
	    @OneToOne
	    @JoinColumn(name = "facture_id")
	    private Facture facture;
	    
	    private boolean paye;
	    private String dateFacturation;
	    private String dateTraitement;
}
