package fr.gouv.sante.c2s.dto;

import fr.gouv.sante.c2s.model.dto.membre.MembrePasswordToResetDTO;
import org.hibernate.validator.messageinterpolation.ParameterMessageInterpolator;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;

import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class MembrePasswordToResetDTOTest {

    @InjectMocks
    private MembrePasswordToResetDTO membrePasswordToResetDTO;

    private Validator validator;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        ValidatorFactory factory = Validation
                .byDefaultProvider()
                .configure()
                .messageInterpolator(new ParameterMessageInterpolator())
                .buildValidatorFactory();

        validator = factory.getValidator();
    }

    @Test
    public void whenBlankEmail_thenOneConstraintViolation() {
        membrePasswordToResetDTO.setEmail("");
        Set<ConstraintViolation<MembrePasswordToResetDTO>> violations = validator.validate(membrePasswordToResetDTO);
        assertEquals(2, violations.size());
        for (ConstraintViolation<MembrePasswordToResetDTO> violation : violations) {
            if (violation.getPropertyPath().toString().equals("email")) {
                assertEquals("L'email n'est pas renseigné", violation.getMessage());
            }
        }
    }

    @Test
    public void whenInvalidPasswordPattern_thenOneConstraintViolation() {
        membrePasswordToResetDTO.setPassword("abcdefg");
        Set<ConstraintViolation<MembrePasswordToResetDTO>> violations = validator.validate(membrePasswordToResetDTO);

        for (ConstraintViolation<MembrePasswordToResetDTO> violation : violations) {
            if (violation.getPropertyPath().toString().equals("password")) {
                assertTrue(violation.getMessage().contains("complexe"));
            }
        }
        assertEquals(3, violations.size());
    }

    @Test
    public void whenEmptyToken_thenOneConstraintViolation() {
        membrePasswordToResetDTO.setToken("");
        Set<ConstraintViolation<MembrePasswordToResetDTO>> violations = validator.validate(membrePasswordToResetDTO);
        for (ConstraintViolation<MembrePasswordToResetDTO> violation : violations) {
            if (violation.getPropertyPath().toString().equals("token")) {
                assertTrue(violation.getMessage().contains("Votre lien n'est plus valide. Veuillez passer par la procédure \"Mot de passe oublié\""));
            }
        }
        assertEquals(2, violations.size());
    }

    @Test
    public void whenValidMembrePasswordToResetDto_thenNoConstraintViolations() {
        membrePasswordToResetDTO.setEmail("test@example.com");
        membrePasswordToResetDTO.setPassword("Ac1$Efghijkl");
        membrePasswordToResetDTO.setToken("123456");
        Set<ConstraintViolation<MembrePasswordToResetDTO>> violations = validator.validate(membrePasswordToResetDTO);
        assertTrue(violations.isEmpty());
    }


}
