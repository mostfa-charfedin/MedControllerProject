package Medcontroller.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import Medcontroller.entities.Pdf;

public interface PdfRepository extends JpaRepository<Pdf, Long> {
}
