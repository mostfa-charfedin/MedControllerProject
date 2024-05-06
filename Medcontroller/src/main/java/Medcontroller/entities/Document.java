package Medcontroller.entities;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
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
public class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nomOrdenance;
    
    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] ordenance;

    private String nomBulletin;
    
    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] bulletin;
    
    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] rapport;
  
    
    private boolean etat;
    private boolean paye;
    private boolean facturer;
    private String dateAffectation;
    private String dateTraitement;
  
    
      private String matriculeAssure;
	  private String nomAssure;
	  private String nomBenificiaire;
	  private String qualiteBinificiaire;
	  final double montant=20.000 ;
	 
	  
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "medecin_id")
    private User user;
    
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "agent_id")
    private User agent;

    


}