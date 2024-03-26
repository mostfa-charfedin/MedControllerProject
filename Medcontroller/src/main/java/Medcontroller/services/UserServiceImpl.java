package Medcontroller.services;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import Medcontroller.entities.RegistrationRequest;
import Medcontroller.entities.Role;
import Medcontroller.entities.User;
import Medcontroller.entities.VerificationToken;
import Medcontroller.exceptions.EmailAlreadyExistsException;
import Medcontroller.exceptions.ExpiredTokenException;
import Medcontroller.exceptions.InvalidTokenException;
import Medcontroller.exceptions.UsernameAlreadyExistsException;
import Medcontroller.repository.RoleRepository;
import Medcontroller.repository.UserRepository;
import Medcontroller.repository.VerificationTokenRepository;






@Service
public class UserServiceImpl  implements UserService{

	@Autowired
	UserRepository userRep;
	
	@Autowired
	RoleRepository roleRep;
	
	
	@Autowired
	BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@Autowired
	VerificationTokenRepository verificationTokenRepo;
	
	@Autowired
	EmailSender emailSender;
	
	@Override
	public User saveUser(User user) {
	
	    return userRep.save(user);
	}


	@Override
	public User addRoleToUser(String username, String rolename) {
		User user = userRep.findByUsername(username);
		Role role = roleRep.findByRole(rolename);
		
		user.getRoles().add(role);
		return user;
	}

	
	@Override
	public Role addRole(Role role) {
		return roleRep.save(role);
	}

	
	
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
	
	@Override
	public User findUserByUsername(String username) {
		return userRep.findByUsername(username);
	}
	
	

	
	@Override
	public List<User> findAllUsers() {
		return userRep.findAll();
	}
	
	@Override
	public User updateUser(User user) {
		Optional<User> utOptional = userRep.findById(user.getId()); 
		if(utOptional.isEmpty() ) {
			return null;
		}else {
			return userRep.save(user);
		}
	}
	
	


	@Override
	public User getUserById(Long id) {
		
		return  userRep.findById(id).get();
	}

	
	@Override
	public User registerUser(RegistrationRequest request) {

		Optional<User>  optionalUser = userRep.findByEmail(request.getEmail());
		Optional<User>  optionalUser2 = userRep.findUserByUsername(request.getUsername());
		if(optionalUser.isPresent())
			throw new EmailAlreadyExistsException("Email déjà existe!");
		if(optionalUser2.isPresent())
			throw new UsernameAlreadyExistsException("Username déjà existe!");
		
		User newUser = new User();
		newUser.setUsername(request.getUsername());
		newUser.setEmail(request.getEmail());
		newUser.setPassword( bCryptPasswordEncoder.encode( request.getPassword() )  );
	
		newUser.setIsActive(false);
		newUser.setFirstName(request.getFirstName());
		newUser.setLastName(request.getLastName());
		newUser.setLocalisation(request.getLocalisation());
		newUser.setMatricule(request.getMatricule());
		newUser.setSpecialite(request.getSpecialite());
		newUser.setFirstName(request.getFirstName());
		
		
		
	
		
		Role r = roleRep.findByRole("USER");
		List<Role> roles = new ArrayList<>();
		roles.add(r);
		newUser.setRoles(roles);
		
		//génére le code secret
		 String code = this.generateCode();
         System.out.println(code);
		 VerificationToken token = new VerificationToken(code, newUser);
		 verificationTokenRepo.save(token);
		 
		 //envoyer le code par email à l'utilisateur
		  sendEmailUser(newUser,token.getToken());
		

		return userRep.save(newUser);
	}

	public String generateCode() {
		 Random random = new Random();
		 Integer code = 100000 + random.nextInt(900000);
		 return code.toString();

	}
	
	@Override
	public void sendEmailUser(User u, String code) {
		 String emailBody ="Bonjour "+ "<h1>"+u.getUsername() +"</h1>" +
		 " Votre code de validation est "+"<h1>"+code+"</h1>";
		 String subject ="Confirm your email";
		 System.out.println(code);
		emailSender.sendEmail(u.getEmail(), emailBody,subject);
		}



	

	@Override
	@Transactional
	public User validateToken(String code) {
	    // Find the verification token associated with the provided code
	    VerificationToken token = verificationTokenRepo.findByToken(code);
	    
	    // Check if the token is null (i.e., not found in the repository)
	    if (token == null) {
	        throw new InvalidTokenException("Invalid Token: " + code);
	    }

	    // Get the user associated with the token
	    User user = token.getUser();
	    
	    // Check if the token has expired
	    Calendar calendar = Calendar.getInstance();
	    if (token.getTokenExpirationTime().getTime() <= calendar.getTime().getTime()) {
	        // If expired, delete the token from the repository and throw an exception
	        throw new ExpiredTokenException("Expired Token: " + code);
	    }
	    
	    // If the token is valid and not expired, activate the user and update the repository
	    user.setIsActive(true);
	    userRep.save(user);
	   
	    // Clear the list of verification tokens associated with the user
	    user.getVerificationTokens().clear();
	    
	    // Delete all verification tokens associated with the user from the repository
	    verificationTokenRepo.deleteAllByUser(user);
	    
	    // Return the activated user
	    return user;
	}






	
	


@Override
public void deleteUserRole(Long id) {
    Optional<User> userOptional = userRep.findById(id);

    if (userOptional.isPresent()) {
        User user = userOptional.get();

        // Supprimer l'utilisateur et les relations dans la table de jointure
        user.getRoles().clear(); // Supprime toutes les relations ManyToMany

        // Supprimer le token de vérification s'il existe
        if (user.getVerificationTokens() != null) {
           // verificationTokenRepo.deleteById(user.getVerificationTokens().getId());
        	user.getVerificationTokens().clear();
        }

        // Supprimer l'utilisateur
        userRep.deleteById(id);

        System.out.println("User deleted");
    } else {
        System.out.println("User not found");
    }
}






	
	
	
	
	
	
	
}
		
	

