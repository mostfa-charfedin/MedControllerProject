package Medcontroller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import Medcontroller.entities.Role;
import Medcontroller.entities.User;
import Medcontroller.services.UserService;
import jakarta.annotation.PostConstruct;

@SpringBootApplication
public class MedcontrollerApplication {

	
	@Autowired
	UserService userService;

	public static void main(String[] args) {
		SpringApplication.run(MedcontrollerApplication.class, args);
	}
	
	
/*
	@PostConstruct
	void init_users() {
		//ajouter les rôles
		userService.addRole(new Role(null,"ADMIN"));
		userService.addRole(new Role(null,"USER"));}
		/*
		//ajouter les users
		userService.saveUser(new User(null, "admin","123",null,null, null, null, null, null, null, true,null));
		userService.saveUser(new User(null, "nadhem","123",null,null, null, null, null, null, null, true,null));
		userService.saveUser(new User(null, "yassine","123",null,null, null, null, null, null, null, true,null));
		
		//ajouter les rôles aux users
		userService.addRoleToUser("admin", "ADMIN");
		userService.addRoleToUser("admin", "USER");
		
		userService.addRoleToUser("nadhem", "USER");
		userService.addRoleToUser("yassine", "USER");		
	} 

*/
	
	

}
