package fr.gouv.sante.c2s.web.controller;

import fr.gouv.sante.c2s.service.MembreService;
import fr.gouv.sante.c2s.web.controller.oc.OrganismeComplementaireMembreController;
import jakarta.servlet.http.HttpServletRequest;

import org.junit.jupiter.api.BeforeEach;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

public class MembreEntityControllerTest {

	@InjectMocks
	private OrganismeComplementaireMembreController organismeComplementaireMembreController;
	@Mock
	private MembreService membreService;
	@Mock
	private HttpServletRequest request;

	@BeforeEach
	void setUp() {
		MockitoAnnotations.initMocks(this);
	}

	/*
	@Test
    public void registerMemberTest() {
		MembreToRegistertDTO registerInputDTO = new MembreToRegistertDTO();

		// Configuration des mocks
		doNothing().when(membreService).registerMember(any(MembreToRegistertDTO.class));

		ResponseEntity<String> response = membreController.registerMember(request, registerInputDTO);

		// Appel de la méthode à tester
		assertEquals(200, response.getStatusCodeValue());
		assertEquals("Inscription réussie", response.getBody());

		verify(membreService, times(1)).registerMember(any(MembreToRegistertDTO.class));
	}*/
}
