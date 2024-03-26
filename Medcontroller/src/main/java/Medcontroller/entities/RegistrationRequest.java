package Medcontroller.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor @NoArgsConstructor
public class RegistrationRequest {
	private String username;
    private String password;
    private String firstName;
    private String lastName;
    private String matricule;
    private String tel;
    private String localisation;
    private String specialite;
    private Boolean isActive;
	private String email;

}
