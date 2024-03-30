package Medcontroller.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
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
    
    private Long medecinId;
    private Long agentId;

}