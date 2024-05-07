package Medcontroller.restController;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import Medcontroller.entities.Historique;
import Medcontroller.entities.RegistrationRequest;
import Medcontroller.entities.User;
import Medcontroller.entities.VerificationToken;
import Medcontroller.exceptions.InvalidUsernameException;
import Medcontroller.repository.UserRepository;
import Medcontroller.repository.VerificationTokenRepository;
import Medcontroller.security.SecParams;
import Medcontroller.services.EmailSender;
import Medcontroller.services.HistoriqueService;
import Medcontroller.services.UserService;





@RestController

public class UserRestController {
	@Autowired
	UserRepository userRep;
	
	@Autowired
	UserService userService;

	@Autowired
	EmailSender emailSender;
	
	@Autowired
	VerificationTokenRepository verificationTokenRepo;
	@Autowired
	HistoriqueService historiqueService;
	
	@Autowired
	BCryptPasswordEncoder bCryptPasswordEncoder;
	
	
	
	
	@RequestMapping(path = "/all",method = RequestMethod.GET)
	public List<User> getAllUsers() {
		return userRep.findAll();
	 }
	
	
	@PostMapping("/register")
	public User register(@RequestBody RegistrationRequest request) {
		return userService.registerUser(request);
		
	}
	
	
	@GetMapping("/verifyEmail/{token}")
	 public User verifyEmail(@PathVariable("token") String token){
		
			return userService.validateToken(token);
			
	 }
	
	
	@PutMapping(path="/updateUser")
	public ResponseEntity<User> updateUserById(@RequestBody User updatedUser) {
	    // Validate updatedUser
	    if (updatedUser.getId() == null) {
	        return ResponseEntity.badRequest().build();
	    }

	    Optional<User> optionalUser = userRep.findById(updatedUser.getId());

	    if (optionalUser.isPresent()) {
	        User existingUser = optionalUser.get();
	        // Update user information
	        existingUser.setUsername(updatedUser.getUsername());
	        existingUser.setFirstName(updatedUser.getFirstName());
	        existingUser.setLastName(updatedUser.getLastName());
	        existingUser.setMatricule(updatedUser.getMatricule());
	        existingUser.setTel(updatedUser.getTel());
	        existingUser.setEmail(updatedUser.getEmail());
	        existingUser.setLocalisation(updatedUser.getLocalisation());
	        existingUser.setSpecialite(updatedUser.getSpecialite());
	        existingUser.setIsActive(updatedUser.getIsActive());
	        existingUser.setDemandeMod(false);
	        existingUser.setBirthday(updatedUser.getBirthday());
	        existingUser.setCin(updatedUser.getCin());
	        existingUser.setRoles(updatedUser.getRoles());

	        try {
	            // Save updated user
	            userService.saveUser(existingUser);

	            LocalDateTime now = LocalDateTime.now();
	            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd   HH:mm");
	            String formattedDateTime = now.format(formatter);
	            
	            
	            Historique historique = new Historique();
	            historique.setAction("l'utilisateur a modifié son profil");
	            historique.setTime(formattedDateTime);
	            historique.setMedecin(existingUser);
	            historiqueService.saveHistorique(historique);

	            return ResponseEntity.ok(existingUser);
	        } catch (Exception e) {
	            // Handle database or other errors
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
	        }
	    } else {
	        return ResponseEntity.notFound().build();
	    }
	}

	
	
	
	@PutMapping(path="/verif")
	public ResponseEntity<User> verifyPassword(@RequestBody User user) {
	    User existingUser = userRep.findByUsername(user.getUsername());

	    if (existingUser == null) {
	        return ResponseEntity.notFound().build();
	    }

	  

	    // Assuming you have the hashed password retrieved from the database stored in a variable named hashedPassword
	    String hashedPassword = existingUser.getPassword();

	    // Check if the user's input password matches the hashed password retrieved from the database
	    boolean passwordMatches = bCryptPasswordEncoder.matches(user.getPassword(), hashedPassword);

	    if (passwordMatches) {
	        // If you need to persist any changes to the user, make sure the entity is managed within the current session
	        // Example: entityManager.merge(existingUser);
	        return ResponseEntity.ok(existingUser);
	    } else {
	        return ResponseEntity.notFound().build();
	    }
	}

	        
	      
	

	

	@PutMapping(path="/updatePassword")
	public ResponseEntity<User> updatePassword(@RequestBody User updatedUser) {
		
	    Optional<User> optionalUser = userRep.findById(updatedUser.getId());

	    if (optionalUser.isPresent()) {
	        User existingUser = optionalUser.get();
	        // Check if the password is provided in the user object
		    if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
		        // Encode and update the password
		    	existingUser.setPassword(bCryptPasswordEncoder.encode(updatedUser.getPassword()));
		    }
	        User updatedUtilisateur = userService.saveUser(existingUser);
	       
		   
	        return ResponseEntity.ok(updatedUtilisateur);
	    } else {
	        return ResponseEntity.notFound().build();
	    }
	}
	
	@GetMapping("/getbyid/{id}")
	public User getUserById(@PathVariable("id") Long id) {	
		return userService.getUserById(id);
    }
	
	@GetMapping("/getbyUsername/{username}")
	public User getUserByUsername(@PathVariable("username") String username) {	
		return userService.findUserByUsername(username);
    }
	
	
	@PostMapping("/addUser")
	public User createUser(@RequestBody User user) {
		return userService.saveUser(user);
	}

	@RequestMapping(path = "/delete/{user_id}", method = RequestMethod.DELETE)
	public void deleteUser(@PathVariable Long user_id) {
	    userService.deleteUserRole(user_id);
	
	}
	@RequestMapping(path = "/bloquer/{user_id}", method = RequestMethod.DELETE)
	public void bloquerUtilisateur(@PathVariable Long user_id) {
	    userService.bloquerUtilisateur(user_id);
	
	}
	@RequestMapping(path = "/validerCompte/{user_id}", method = RequestMethod.DELETE)
	public void validerUtilisateur(@PathVariable Long user_id) {
	    userService.validerUtilisateur(user_id);
	
	}

	
	@GetMapping("/recuperer/{username}")
	public User recuperer ( @PathVariable(value = "username") String username) {
	    try {
	    
	    	User user = userService.findUserByUsername(username);
	    	if(user != null) {
	    	String code =userService.generateCode();
	    	userService.sendEmailUser(user,  code);
	    	 VerificationToken token = new VerificationToken(code, user);
			 verificationTokenRepo.save(token);
			 }
	    	else {
	    		throw new InvalidUsernameException("invalid username");
	    	}
	    } catch (Exception e) {
	        System.out.println("An error occurred: " + e.getMessage());
	        throw new InvalidUsernameException("invalid username");
	    }
	    return userService.findUserByUsername(username);
	}
	
	@PutMapping("/acceptDm")
	public ResponseEntity<Object> accepterDemandeModification(@RequestParam("adminId") Long adminId,
                                                              @RequestParam("userId") Long userId) {
		
	    User admin = userService.getUserById(adminId);
	    User user = userService.getUserById(userId);
	    if (user != null) {
	    user.setDemandeMod(true);
	    userService.saveUser(user);
	    Historique historique = new Historique();
        historique.setAction("Un administrateur a accepter une demande de modification");
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd   HH:mm");
        String formattedDateTime = now.format(formatter);
        historique.setTime(formattedDateTime);
        historique.setAdmin(admin);
        
        if(user.getSpecialite()=="agent") {historique.setAgent(user);}
        else{historique.setMedecin(user);}
        historiqueService.saveHistorique(historique);
	    
	    String emailBody ="Bonjour "+  user.getUsername()+"."+ "<br>"+
		   		" Un administrateur a accepté votre demande de modification.";
		    String subject ="Demande de modification";
		   		emailSender.sendEmail(user.getEmail(), emailBody,subject);
		        // Return a JSON response with a success message
		        return ResponseEntity.status(HttpStatus.OK).body("{\"message\": \"User demandeMod attribute updated successfully.\"}");
		    } else {
		        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\": \"User not found.\"}");
		    }
	}
	
	@PutMapping("/demande")
	public ResponseEntity<Object> demandeModification(@RequestBody User request) {
	    User user = userService.getUserById(request.getId());
	    
	    if (user != null) {
	        user.setDemandeMod(false); // Update DemandeMod to true
	        userService.saveUser(user);
	        Historique historique = new Historique();
	        historique.setAction("l'utilisateur "+" "+user.getUsername()+" "+"a passer une demande de modification de profil");
	        LocalDateTime now = LocalDateTime.now();
	        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd   HH:mm");
	        String formattedDateTime = now.format(formatter);
	        historique.setTime(formattedDateTime);  
	        if(user.getSpecialite()=="agent") {historique.setAgent(user);}
	        else{historique.setMedecin(user);}
	        historiqueService.saveHistorique(historique);
	        String emailBody = "Bonjour " + " L'utilisateur " + user.getUsername() + " souhaite modifier son profil.";
	        String subject = "Demande de modification";
	        emailSender.sendEmail(SecParams.Email_Admin, emailBody, subject);
	        
	        // Return a JSON response with a success message
	        return ResponseEntity.status(HttpStatus.OK).body("{\"message\": \"User demandeMod attribute updated successfully.\"}");
	    } else {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\": \"User not found.\"}");
	    }
	}
}