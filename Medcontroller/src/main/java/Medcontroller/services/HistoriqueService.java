package Medcontroller.services;

import java.util.List;


import Medcontroller.entities.Historique;
import Medcontroller.entities.User;


public interface HistoriqueService {

	Historique findHistoriqueById (Long id);
	List<Historique> findAllHistorys();
	Historique saveHistorique(Historique historique);

}
