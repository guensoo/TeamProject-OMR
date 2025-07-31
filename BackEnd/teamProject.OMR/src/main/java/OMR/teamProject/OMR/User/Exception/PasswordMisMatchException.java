package OMR.teamProject.OMR.User.Exception;

public class PasswordMisMatchException extends RuntimeException {
	
	private static final long serialVersionUID = 1L;
	
	public PasswordMisMatchException(String message) {
		super(message);
	}
}
