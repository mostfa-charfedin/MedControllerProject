package Medcontroller.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import Medcontroller.entities.Historique;
import Medcontroller.entities.User;


public interface HistoriqueRepository extends JpaRepository<Historique, Long> {


}
