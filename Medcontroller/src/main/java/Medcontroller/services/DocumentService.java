package Medcontroller.services;

import java.util.List;

import Medcontroller.entities.Document;
import Medcontroller.entities.User;



public interface DocumentService {
Document saveDocument(Document document);
Document getById(Long id);
List<Document> findAllDocuments();
void deleteDocument(Long id);
List<Document> findDocumentByUserId (Long id);
}
