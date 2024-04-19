package Medcontroller.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class NoDocumentException extends RuntimeException {
	
	private String message;
	
	public NoDocumentException(String message)
	{
		super(message);
	}
	
	

}
