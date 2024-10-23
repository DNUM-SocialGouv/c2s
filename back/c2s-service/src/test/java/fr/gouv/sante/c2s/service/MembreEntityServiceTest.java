package fr.gouv.sante.c2s.service;

import fr.gouv.sante.c2s.keycloak.AdminService;
import fr.gouv.sante.c2s.keycloak.KeycloakMonoRealmService;
import fr.gouv.sante.c2s.repository.EntrepriseRepository;
import fr.gouv.sante.c2s.repository.MembreRepository;
import fr.gouv.sante.c2s.repository.mapper.Mapper;
import org.junit.jupiter.api.BeforeEach;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

class MembreEntityServiceTest {

	@Mock
	private MembreRepository membreRepository;

	@Mock
	private EntrepriseRepository entrepriseRepository;

	@Mock
	private Mapper mapper;

	@Mock
	private KeycloakMonoRealmService keycloakService;

	@Mock
	private AdminService adminService;

	@InjectMocks
	private MembreService membreService;

	@BeforeEach
	void setUp() {
		MockitoAnnotations.initMocks(this);
	}

	/*

	@Test
	void testRegisterMemberSuccess() {

		String maSociete = "maSociete";

		MembreToRegistertDTO registerInputDTO = new MembreToRegistertDTO();
		registerInputDTO.setPrenom("John");
		registerInputDTO.setEmail("john.doe@example.com");
		registerInputDTO.setNom("Doe");
		registerInputDTO.setTelephone("0123456789");
		registerInputDTO.setSociete("SocieteX");
		registerInputDTO.setGroupe("ORGANISME_COMPLEMENTAIRE");
		registerInputDTO.setSiren("123456789");

		when(groupeRepository.findGroupeByNom(anyString())).thenReturn(new GroupeEntity());
		when(entrepriseRepository.findEntrepriseBySiren(anyString())).thenReturn(null);

		membreService.registerMembre(registerInputDTO, maSociete);

		verify(membreRepository, times(1)).save(any(MembreEntity.class));
	}
*/
}
