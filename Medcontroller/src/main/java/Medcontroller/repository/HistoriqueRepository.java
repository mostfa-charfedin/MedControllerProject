package Medcontroller.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import Medcontroller.entities.Historique;


public interface HistoriqueRepository extends JpaRepository<Historique, Long> {

}
