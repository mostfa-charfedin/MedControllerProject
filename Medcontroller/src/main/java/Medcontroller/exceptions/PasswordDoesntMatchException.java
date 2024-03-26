package Medcontroller.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class PasswordDoesntMatchException  extends RuntimeException {

	private String message;

	public PasswordDoesntMatchException(String message) {
		
		this.message = message;
	}
	
	
}