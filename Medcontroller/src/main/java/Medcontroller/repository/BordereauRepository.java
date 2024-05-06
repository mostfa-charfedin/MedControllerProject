package Medcontroller.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import Medcontroller.entities.Bordereau;


@Repository
public interface BordereauRepository  extends JpaRepository<Bordereau, Long>  {

	List<Bordereau> findBordereauByUserId (Long id);
}
