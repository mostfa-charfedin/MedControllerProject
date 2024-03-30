package Medcontroller.restController;

import java.util.List;
import java.util.Optional;


import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import Medcontroller.entities.RegistrationRequest;
import Medcontroller.entities.User;
import Medcontroller.entities.VerificationToken;
import Medcontroller.repository.UserRepository;
import Medcontroller.repository.VerificationTokenRepository;
import Medcontroller.services.EmailSender;
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
		
	    Optional<User> optionalUser = userRep.findById(updatedUser.getId());

	    if (optionalUser.isPresent()) {
	        User existingUser = optionalUser.get();
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
	        existingUser.setRoles(updatedUser.getRoles());
	        User updatedUtilisateur = userService.saveUser(existingUser);
	        return ResponseEntity.ok(updatedUtilisateur);
	    } else {
	        return ResponseEntity.notFound().build();
	    }
	}
	
	
	
	@PutMapping(path="/verif")
	public  ResponseEntity<User>  verifyPassword(@RequestBody User user) {
		
	    Optional<User> optionalUser = userRep.findUserByUsername(user.getUsername());

	    if (!optionalUser.isPresent()) {
	    	
	    	return ResponseEntity.notFound().build();
	    	}
	    
	        User existingUser = optionalUser.get();
	     // Assuming you have the hashed password retrieved from the database stored in a variable named hashedPassword
	        String hashedPassword = existingUser.getPassword();

	        // Check if the user's input password matches the hashed password retrieved from the database
	        boolean passwordMatches = bCryptPasswordEncoder.matches(user.getPassword(), hashedPassword);

	        if (passwordMatches) {
	        	
	        	
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
	
/*	@RequestMapping(path = "/deleteToken/{token}", method = RequestMethod.DELETE)
	public void deleteToken(@PathVariable String token) {
	    userService.deletetoken(token);
	}
	*/
	
	@GetMapping("/recuperer/{username}")
	public User recuperer ( @PathVariable(value = "username") String username) {
	    try {
	    	User user = userService.findUserByUsername(username);
	    	String code =userService.generateCode();
	    	
	    	userService.sendEmailUser(user,  code);
	    	 VerificationToken token = new VerificationToken(code, user);
			 verificationTokenRepo.save(token);
	    } catch (Exception e) {
	        System.out.println("An error occurred: " + e.getMessage());
	        
	    }
	    return userService.findUserByUsername(username);
	}
	
	@PutMapping("/acceptDm")
	public ResponseEntity<Object> accepterDemandeModification(@RequestBody User request) {
	    Long id = request.getId();
	    User user = userService.getUserById(id);
	    if (user != null) {
	    user.setDemandeMod(true);
	    userService.saveUser(user);
	    
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

	        String emailBody = "Bonjour " + " L'utilisateur " + user.getUsername() + " souhaite modifier son profil.";
	        String subject = "Demande de modification";
	        emailSender.sendEmail(user.getEmail(), emailBody, subject);
	        
	        // Return a JSON response with a success message
	        return ResponseEntity.status(HttpStatus.OK).body("{\"message\": \"User demandeMod attribute updated successfully.\"}");
	    } else {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\": \"User not found.\"}");
	    }
	}
}