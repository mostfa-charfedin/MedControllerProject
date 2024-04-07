package Medcontroller.restController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import Medcontroller.entities.Historique;
import Medcontroller.repository.HistoriqueRepository;
import Medcontroller.services.HistoriqueService;


@RestController
public class HistoriqueController {
	
	@Autowired
	HistoriqueService historiqueService;
	@Autowired
	HistoriqueRepository historiqueRepository;
	
	
	@RequestMapping(path = "/allHistorys",method = RequestMethod.GET)
	public List<Historique> getAllHistorys() {
		return historiqueRepository.findAll();
	 }
	
}
