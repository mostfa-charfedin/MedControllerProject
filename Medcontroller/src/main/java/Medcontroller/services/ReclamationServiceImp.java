package Medcontroller.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Medcontroller.entities.Historique;
import Medcontroller.entities.Reclamation;
import Medcontroller.repository.HistoriqueRepository;
import Medcontroller.repository.ReclamationRepository;

@Service
public class ReclamationServiceImp implements ReclamationService {

	
	
	@Autowired
	ReclamationRepository reclamationRepository;

	
	@Override
	public Reclamation saveReclamation(Reclamation reclamation) {
	
	    return reclamationRepository.save(reclamation);
	}
	
	@Override
	public Reclamation findReclamationById(Long id) {
		
		return  reclamationRepository.findById(id).get();
	}

	@Override
	public List<Reclamation> findAllReclamations() {
	
		return reclamationRepository.findAll();
	}

}
