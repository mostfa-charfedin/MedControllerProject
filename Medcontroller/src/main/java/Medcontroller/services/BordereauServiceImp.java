package Medcontroller.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Medcontroller.entities.Bordereau;

import Medcontroller.repository.BordereauRepository;


@Service
public class BordereauServiceImp implements BordereauService{
	@Autowired
	BordereauRepository bordereauRepository;

	@Override
	public Bordereau saveBordereau(Bordereau bordereau) {
		
		return  bordereauRepository.save(bordereau);
	}

	@Override
	public Bordereau findBordereauById(Long id) {

		return bordereauRepository.findById(id).orElse(null);
	}
	
	@Override
	public List<Bordereau> findAllBordereaux() {
		return bordereauRepository.findAll();
	}
	

	
	@Override
	public void deleteBordereau(Long id) {
	    Optional<Bordereau> bordOptional = bordereauRepository.findById(id);
	
	    if (bordOptional.isPresent()) {
	    
	    	bordereauRepository.deleteById(id);

	        System.out.println("Document deleted");
	    } else {
	        System.out.println("Document not found");
	    }
}

	@Override
	public List<Bordereau> findBordereauByUserId(Long id) {
		return bordereauRepository.findBordereauByUserId(id);
	}
}
