package Medcontroller.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import Medcontroller.entities.Document;

@Repository
public interface DocumentRepository extends JpaRepository<Document, Long> {
	List<Document> findDocumentByUserId (Long id); 
}