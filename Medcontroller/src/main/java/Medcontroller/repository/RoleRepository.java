package Medcontroller.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import Medcontroller.entities.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

	Role findByRole(String role);
	
}