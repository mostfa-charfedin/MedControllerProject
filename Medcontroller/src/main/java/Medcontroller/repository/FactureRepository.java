package Medcontroller.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import Medcontroller.entities.Facture;


@Repository
public interface FactureRepository extends JpaRepository<Facture, Long> {

}
