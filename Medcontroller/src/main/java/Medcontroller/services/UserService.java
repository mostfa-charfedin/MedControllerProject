package Medcontroller.services;

import Medcontroller.entities.RegistrationRequest;
import Medcontroller.entities.Role;
import Medcontroller.entities.User;
import Medcontroller.entities.VerificationToken;

import jakarta.servlet.Registration;

import java.util.List;
public interface UserService {
	User saveUser(User user);
	User findUserByUsername (String username);
	Role addRole(Role role);
	User addRoleToUser(String username, String rolename);
	List<User> findAllUsers();
	User updateUser(User user);
	User getUserById(Long id);
	void deleteUserRole(Long id);
	
	User registerUser(RegistrationRequest request);
	public String generateCode();
	public void sendEmailUser(User u, String code);
	public User validateToken(String code);
	void bloquerUtilisateur(Long id);
	void validerUtilisateur(Long id);
	
	



	

}