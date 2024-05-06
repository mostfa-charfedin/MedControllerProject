package Medcontroller.services;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import Medcontroller.entities.Historique;
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




@Transactional
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
		newUser.setTel(request.getTel());
		newUser.setStatut(false);
		
        newUser.setBirthday(request.getBirthday().toString());
		newUser.setCin(request.getCin());
		
		Role r = roleRep.findByRole("USER");
		List<Role> roles = new ArrayList<>();
		roles.add(r);
		newUser.setRoles(roles);
		
		//génerer code secret
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

	    VerificationToken token = verificationTokenRepo.findByToken(code);

	    if (token == null) {
	        throw new InvalidTokenException("Invalid Token: " + code);
	    }

	    User user = token.getUser();

	    Calendar calendar = Calendar.getInstance();
	    if (token.getTokenExpirationTime().getTime() <= calendar.getTime().getTime()) {

	        throw new ExpiredTokenException("Expired Token: " + code);
	    }

	    user.getVerificationTokens().clear();
	    verificationTokenRepo.deleteAllByUser(user);
	    


	    return user;
	}



	
	


	@Override
	public void deleteUserRole(Long id) {
	    Optional<User> userOptional = userRep.findById(id);

	    if (userOptional.isPresent()) {
	        User user = userOptional.get();
	        user.getVerificationTokens().clear(); // Clear verification tokens
	        user.getRoles().clear(); // Clear roles
	        // Delete dependent verification tokens
	        // (You need to implement this method in your repository)
	        verificationTokenRepo.deleteAllByUser(user);

	        userRep.deleteById(id); // Now delete the user
	        System.out.println("User deleted");
	    } else {
	        System.out.println("User not found");
	    }
	}

	
	@Override
	public void bloquerUtilisateur(Long id) {
	    Optional<User> userOptional = userRep.findById(id);

	    if (userOptional.isPresent()) {
	    	User user = userOptional.get();
	    	user.setIsActive(false);
	        System.out.println("User blocked");
	    } else {
	        System.out.println("User not found");
	    }
	}

	@Override
	public void validerUtilisateur(Long id) {
	    Optional<User> userOptional = userRep.findById(id);

	    if (userOptional.isPresent()) {
	    	User user = userOptional.get();
	    	user.setIsActive(true);
	        System.out.println("User activated");
	    } else {
	        System.out.println("User not found");
	    }
	}



	
	
	
	
	
	
	
}
		
	

