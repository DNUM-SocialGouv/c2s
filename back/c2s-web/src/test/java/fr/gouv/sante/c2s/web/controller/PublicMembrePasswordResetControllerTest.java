package fr.gouv.sante.c2s.web.controller;

import fr.gouv.sante.c2s.keycloak.KeycloakMonoRealmService;
import fr.gouv.sante.c2s.service.mail.EmailBusinessService;
import fr.gouv.sante.c2s.web.controller.publique.membre.PublicMembrePasswordResetController;
import jakarta.servlet.http.HttpServletRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(MockitoExtension.class)
public class PublicMembrePasswordResetControllerTest {

	@InjectMocks
	private PublicMembrePasswordResetController publicMembrePasswordResetController;

	@Mock
	private EmailBusinessService emailService;

	@Mock
	private HttpServletRequest servletRequest;

	@Mock
	private KeycloakMonoRealmService keycloakService;

	// Set these values to match the expected ones in the controller
	private String resetUrl = "http://example.com/reset";
	private String senderEmail = "no-reply@example.com";

	@BeforeEach
	void setUp() {
		// Use ReflectionTestUtils to inject the private fields
		ReflectionTestUtils.setField(publicMembrePasswordResetController, "resetUrl", resetUrl);
		ReflectionTestUtils.setField(publicMembrePasswordResetController, "senderEmail", senderEmail);
	}
/*
	@Test
	public void requestResetPasswordTest() {
		// Correct the stubbing to reflect actual parameters expected
		doNothing().when(emailService).sendResetPasswordEmail(anyString(), eq(senderEmail), eq(resetUrl), "vvghvgghgjhghj");

		ResponseEntity<String> response = passwordResetController.requestResetPassword("test@test.com");

		assertEquals(204, response.getStatusCodeValue());

		// Verify the correct method call
		verify(emailService).sendResetPasswordEmail("test@test.com", senderEmail, resetUrl,"ghfjhghjgjhggjgh");
	}
*/
	/*
	@Test
	public void resetPasswordTest() {
		MembrePasswordToResetDTO resetPasswordDTO = MembrePasswordToResetDTO.builder()
				.email("test@gmail.com").password("123456").build();

		doNothing().when(keycloakService.getAdminService()).resetPassword(resetPasswordDTO.getEmail(), resetPasswordDTO.getPassword());
		ResponseEntity<String> response = passwordResetController.resetPassword(resetPasswordDTO);

		assertEquals(200, response.getStatusCodeValue());

		verify(keycloakService.getAdminService(), times(1)).resetPassword(resetPasswordDTO.getEmail(), resetPasswordDTO.getPassword());
	}*/

}
