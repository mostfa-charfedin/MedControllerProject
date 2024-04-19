package Medcontroller.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class InvalidUsernameException  extends RuntimeException {

	private String message;

	public InvalidUsernameException(String message)
	{
		super(message);
	}
	

}
