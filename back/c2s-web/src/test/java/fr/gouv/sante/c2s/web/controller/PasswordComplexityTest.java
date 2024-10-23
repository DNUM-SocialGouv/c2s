package fr.gouv.sante.c2s.web.controller;

import fr.gouv.sante.c2s.model.dto.MembrePasswordToResetDTO;
import fr.gouv.sante.c2s.model.dto.MembreToRegistertDTO;
import fr.gouv.sante.c2s.service.MembreService;
import fr.gouv.sante.c2s.web.controller.oc.OrganismeComplementaireMembreController;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

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
