package Medcontroller.exceptions;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class GlobalExceptionHandler {
	
	@ExceptionHandler(EmailAlreadyExistsException.class)
	 public ResponseEntity<ErrorDetails> handleEmailAlreadyExistsException(EmailAlreadyExistsException exception,
	 WebRequest webRequest){
		
	 ErrorDetails errorDetails = new ErrorDetails(
			 LocalDateTime.now(),
			 exception.getMessage(),
			 webRequest.getDescription(false),
			 "USER_EMAIL_ALREADY_EXISTS"
	 );
	 return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
	 }
	 
	@ExceptionHandler(UsernameAlreadyExistsException.class)
	 public ResponseEntity<ErrorDetails> handleUsernameAlreadyExistsException(UsernameAlreadyExistsException exception,
	 WebRequest webRequest){
		
	 ErrorDetails errorDetails = new ErrorDetails(
			 LocalDateTime.now(),
			 exception.getMessage(),
			 webRequest.getDescription(false),
			 "USER_USERNAME_ALREADY_EXISTS"
	 );
	 return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
	 }
	
	
	@ExceptionHandler(InvalidUsernameException.class)
	 public ResponseEntity<ErrorDetails> handleInvalidUsernameException(InvalidUsernameException exception,
	 WebRequest webRequest){
		
	 ErrorDetails errorDetails = new ErrorDetails(
			 LocalDateTime.now(),
			 exception.getMessage(),
			 webRequest.getDescription(false),
			 "INVALID_USER_USERNAME"
	 );
	 return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
	 }
	
	
	@ExceptionHandler(NoDocumentException.class)
	 public ResponseEntity<ErrorDetails> handleNoDocumentException(NoDocumentException exception,
	 WebRequest webRequest){
		
	 ErrorDetails errorDetails = new ErrorDetails(
			 LocalDateTime.now(),
			 exception.getMessage(),
			 webRequest.getDescription(false),
			 "NO_DOCUMENT_TO_LOAD"
	 );
	 return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
	 }
	
	
	
	@ExceptionHandler(ExpiredTokenException.class)
	public ResponseEntity<ErrorDetails>
	handleExpiredTokenException(ExpiredTokenException exception,
			WebRequest webRequest){
		ErrorDetails errorDetails = new ErrorDetails(
				LocalDateTime.now(),
				exception.getMessage(),
				webRequest.getDescription(false),
				"EXPIRED_TOKEN"
				);
		return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
	}
	
	
	@ExceptionHandler(InvalidTokenException.class)
	public ResponseEntity<ErrorDetails>
	handleInvalidTokenException(InvalidTokenException exception,
			WebRequest webRequest){
		ErrorDetails errorDetails = new ErrorDetails(
				LocalDateTime.now(),
				exception.getMessage(),
				webRequest.getDescription(false),
				"INVALID_TOKEN"
				);
		return new ResponseEntity<>(errorDetails, HttpStatus.NOT_FOUND);
	}
	
	
	@ExceptionHandler(InactiveUserException.class)
	public ResponseEntity<ErrorDetails>
	handleInactiveUserException(InactiveUserException exception,
			WebRequest webRequest){
		ErrorDetails errorDetails = new ErrorDetails(
				LocalDateTime.now(),
				exception.getMessage(),
				webRequest.getDescription(false),
				"INACTIVE_USER"
				);
		return new ResponseEntity<>(errorDetails, HttpStatus.NOT_FOUND);
	}
	 


}
