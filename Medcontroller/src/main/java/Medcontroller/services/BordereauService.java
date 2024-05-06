package Medcontroller.services;

import java.util.List;

import Medcontroller.entities.Bordereau;



public interface BordereauService {

	Bordereau saveBordereau(Bordereau bordereau);
	Bordereau findBordereauById(Long id);
	List<Bordereau> findAllBordereaux();
	void deleteBordereau(Long id);
	List<Bordereau> findBordereauByUserId (Long id);

}
