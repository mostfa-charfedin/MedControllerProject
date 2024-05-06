package Medcontroller.services;

import java.util.List;


import Medcontroller.entities.Reclamation;

public interface ReclamationService {
	

	Reclamation findReclamationById (Long id);
	List<Reclamation> findAllReclamations();
	Reclamation saveReclamation(Reclamation reclamation);

}
