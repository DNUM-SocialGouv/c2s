package fr.gouv.sante.c2s.web.controller;

import fr.gouv.sante.c2s.model.dto.membre.MembrePasswordToResetDTO;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.junit.jupiter.api.Test;

import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class PasswordComplexityTest {
	@Test
    public void registerPasswordTest() {
		MembrePasswordToResetDTO form = new MembrePasswordToResetDTO();
		form.setPassword("poiDFG159*$=");
		form.setEmail("toto@yahoo.fr");
		form.setToken("alpha");

		ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
		Validator validator = validatorFactory.getValidator();

		Set<ConstraintViolation<MembrePasswordToResetDTO>> violations = validator.validate(form);
		for (ConstraintViolation cv : violations) {
			System.out.println(cv.getPropertyPath()+" "+cv.getMessage());
		}
        assertEquals(1, violations.size());
	}
}
