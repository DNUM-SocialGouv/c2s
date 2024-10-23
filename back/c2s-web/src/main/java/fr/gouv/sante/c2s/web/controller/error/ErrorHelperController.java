package fr.gouv.sante.c2s.web.controller.error;


import fr.gouv.sante.c2s.model.exception.ManualConstraintViolationException;
import fr.gouv.sante.c2s.web.exception.IllegalWebRoleAccessException;
import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@io.swagger.v3.oas.annotations.Hidden
@RestControllerAdvice
public class ErrorHelperController {

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler({MethodArgumentNotValidException.class, ConstraintViolationException.class})
    public Map<String, String> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return errors;
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(ManualConstraintViolationException.class)
    public Map<String, String> handleManualValidationExceptions(ManualConstraintViolationException ex) {
        return ex.getError();
    }

    @ExceptionHandler(IllegalWebRoleAccessException.class)
    public ResponseEntity handleIllegalAccessByRoleExceptions() {
        return ResponseEntity.status(401).build();
    }
}
