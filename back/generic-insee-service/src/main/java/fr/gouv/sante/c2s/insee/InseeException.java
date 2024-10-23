package fr.gouv.sante.c2s.insee;

public class InseeException extends Exception {

    private String errorMessage;

    public InseeException(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }
}
