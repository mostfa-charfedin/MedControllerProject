package Medcontroller.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Medcontroller.entities.Bordereau;
import Medcontroller.entities.Document;
import Medcontroller.entities.Facture;
import Medcontroller.repository.DocumentRepository;
import Medcontroller.repository.FactureRepository;

@Service
public class FactureServiceImp implements FactureService{

	@Autowired
	FactureRepository facturetRepository;

	@Override
	public Facture saveFacture(Facture facture) {
		
		return  facturetRepository.save(facture);
	}

	@Override
	public Facture getById(Long id) {

		return facturetRepository.findById(id).orElse(null);
	}

	@Override
	public List<Facture> findAllFactures() {
		
		return facturetRepository.findAll();
	}


}
