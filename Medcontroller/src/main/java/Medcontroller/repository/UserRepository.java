package Medcontroller.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import Medcontroller.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	@Query(value = "SELECT * FROM user WHERE BINARY username = :username", nativeQuery = true)
	User findByUsername(String username);
	Optional<User> findByEmail(String email);
	Optional<User> findUserByUsername(String username);
}
