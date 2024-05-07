package Medcontroller.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import Medcontroller.entities.User;
import Medcontroller.entities.VerificationToken;
import jakarta.transaction.Transactional;


public interface VerificationTokenRepository extends JpaRepository<VerificationToken, Long> {
 VerificationToken findByToken(String token);
 VerificationToken findByUserId(Long userId);
void deleteAllByUser(User user);
void deleteAllTokensByUserId(Long id);
}