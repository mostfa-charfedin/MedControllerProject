package Medcontroller.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class InactiveUserException extends RuntimeException {
	
	private String message;
	
	public InactiveUserException(String message)
	{
		super(message);
	}
	
	

}