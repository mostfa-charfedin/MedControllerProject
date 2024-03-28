package Medcontroller.restController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import Medcontroller.entities.Pdf;
import Medcontroller.repository.PdfRepository;

@RestController
public class PdfController {
	  @Autowired
	    private PdfRepository pdfRepository;

	    @PostMapping("/save-pdf")
	    public ResponseEntity<?> savePdf(@RequestBody byte[] pdfData) {
	        Pdf newPdf = new Pdf();
	        newPdf.setData(pdfData);
	        pdfRepository.save(newPdf);
	        return ResponseEntity.ok().build();
	    }

}
