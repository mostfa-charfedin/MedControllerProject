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
	
/*	*/
	

}
