package Medcontroller.services;


import java.util.List;

import Medcontroller.entities.Facture;


public interface FactureService {
	List<Facture> findAllFactures();
	Facture saveFacture(Facture facture);
	Facture getById(Long id);
}
