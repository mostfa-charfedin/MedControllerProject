package Medcontroller.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
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
  
    
    private boolean Etat;
    private Long agentId;
    private String dateAffectation;
    private String dateTrete;
    
      private String matriculeAssure;
	  private String nomAssure;
	  private String nomBenificiaire;
	  private String qualiteBinificiaire;
	  private int montant ;
 
	    
    @ManyToOne
    @JoinColumn(name = "medecin_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "bordereau_id")
    private Bordereau bordereau;

}