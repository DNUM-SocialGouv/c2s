package fr.gouv.sante.c2s.service;

import fr.gouv.sante.c2s.model.entity.MembreEntity;
import fr.gouv.sante.c2s.repository.MembreRepository;
import fr.gouv.sante.c2s.service.mail.EmailBusinessService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.mail.javamail.JavaMailSender;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

class PasswordResetServiceTest {

	@InjectMocks
	private EmailBusinessService emailService;

	@Mock
	private MembreRepository membreRepository;

	@Mock
	private JavaMailSender mailSender;

	@BeforeEach
	void setUp() {
		MockitoAnnotations.initMocks(this);
	}

/*
	@Test
	void testResetPasswordSuccess() {
		List<MembreEntity> membreEntities = new ArrayList<>() {{
			add(MembreEntity.builder().build());
		}};
		when(membreRepository.findMembreByEmailOrLogin(anyString())).thenReturn(membreEntities);

		emailService.getMembreByMailOrLogin("test@example.com");

		verify(membreRepository, times(1)).findMembreByEmailOrLogin(anyString());
	}
*/
}
