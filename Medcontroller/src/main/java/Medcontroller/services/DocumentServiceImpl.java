package Medcontroller.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Medcontroller.entities.Document;
import Medcontroller.entities.User;
import Medcontroller.repository.DocumentRepository;

@Service
public class DocumentServiceImpl implements DocumentService {
	
	@Autowired
	DocumentRepository documentRepository;

	@Override
	public Document saveDocument(Document document) {
		
		return  documentRepository.save(document);
	}

	@Override
	public Document getById(Long id) {

		return documentRepository.findById(id).orElse(null);
	}
	
	@Override
	public List<Document> findAllDocuments() {
		return documentRepository.findAll();
	}
	
	@Override
	public void deleteDocument(Long id) {
	    Optional<Document> docOptional = documentRepository.findById(id);

	    if (docOptional.isPresent()) {
	        Document doc = docOptional.get();
	        
	        documentRepository.deleteById(id);

	        System.out.println("Document deleted");
	    } else {
	        System.out.println("Document not found");
	    }
}

	@Override
	public List<Document> findDocumentByUserId(Long id) {
		return documentRepository.findDocumentByUserId(id);
	}
}
