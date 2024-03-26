package Medcontroller.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import Medcontroller.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	
	User findByUsername(String username);
	Optional<User> findByEmail(String email);
	Optional<User> findUserByUsername(String username);
}
