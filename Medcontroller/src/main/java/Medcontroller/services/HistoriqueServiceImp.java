package Medcontroller.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Medcontroller.entities.Historique;
import Medcontroller.entities.User;
import Medcontroller.repository.HistoriqueRepository;

@Service
public class HistoriqueServiceImp implements HistoriqueService {
	@Autowired
	HistoriqueRepository historiqueRepository;

	
	@Override
	public Historique saveHistorique(Historique historique) {
	
	    return historiqueRepository.save(historique);
	}
	
	@Override
	public Historique findHistoriqueById(Long id) {
		
		return  historiqueRepository.findById(id).get();
	}

	@Override
	public List<Historique> findAllHistorys() {
	
		return historiqueRepository.findAll();
	}

	
	
	
}
