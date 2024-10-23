package fr.gouv.sante.c2s.service;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import fr.gouv.sante.c2s.service.mail.EmailBusinessService;
import io.jsonwebtoken.security.Keys;
import org.junit.jupiter.api.Test;
import org.mockito.*;

import jakarta.mail.MessagingException;

import java.nio.charset.StandardCharsets;
import java.util.Collections;

import fr.gouv.sante.c2s.javamail.MailCoreService;
import fr.gouv.sante.c2s.model.entity.MembreEntity;
import fr.gouv.sante.c2s.repository.MembreRepository;

import org.mockito.junit.jupiter.MockitoExtension;
import org.junit.jupiter.api.extension.ExtendWith;

@ExtendWith(MockitoExtension.class)
public class EmailBusinessServiceTest {

    @Mock
    private MailCoreService mailService;

    @Mock
    private MembreRepository membreRepository;

    @InjectMocks
    private EmailBusinessService emailBusinessService;

/*
    @Test
    public void testGetMembreByMailOrLoginReturnsMembreWhenFound() {
        String email = "test@example.com";
        MembreEntity membre = new MembreEntity();
        membre.setEmail(email);
        membre.setPrenom("John");
        membre.setNom("Doe");

        when(membreRepository.findMembreByEmailOrLogin(email)).thenReturn(Collections.singletonList(membre));

        MembreEntity result = emailBusinessService.getMembreByMailOrLogin(email);

        assertNotNull(result);
        assertEquals("John", result.getPrenom());
        assertEquals("Doe", result.getNom());
    }*/

    /*
    @Test
    public void testGetMembreByMailOrLoginReturnsNullWhenNotFound() {
        String email = "nonexistent@example.com";
        when(membreRepository.findMembreByEmailOrLogin(email)).thenReturn(Collections.emptyList());

        MembreEntity result = emailBusinessService.getMembreByMailOrLogin(email);

        assertNull(result);
    }


    @Test
    public void testTestEmailSendsTextMessage() throws MessagingException {
        String email = "user@example.com";
        doNothing().when(mailService).sendTextMessage(anyString(), any(String[].class), anyString(), anyString());

        emailBusinessService.testEmail(email);

        verify(mailService, times(1)).sendTextMessage(eq(email), eq(new String[]{email}), eq("Test"), eq("Contenu du test"));
    }

    @Test
    public void testSendResetPasswordEmailSendsEmail() throws MessagingException {
        String email = "user@example.com";
        String emailSender = "noreply@example.com";
        String resetUrl = "http://example.com";

        MembreEntity membre = new MembreEntity();
        membre.setEmail(email);
        membre.setPrenom("Jane");
        membre.setNom("Doe");

        when(membreRepository.findMembreByEmailOrLogin(email)).thenReturn(Collections.singletonList(membre));
        doNothing().when(mailService).sendHtmlMessage(anyString(), any(String[].class), any(), anyString(), anyString());

        emailBusinessService.sendResetPasswordEmail(email, emailSender, resetUrl, "delkelfejflzejflm");

        String expectedHtmlMsgStart = "<html><body>Bonjour Jane Doe,<br><br>Vous avez demandé la réinitialisation du mot de passe vous permettant d’accéder à votre Espace connecté C2S";

        ArgumentCaptor<String> captor = ArgumentCaptor.forClass(String.class);
        verify(mailService, times(1)).sendHtmlMessage(eq(emailSender), eq(new String[]{email}), isNull(), eq("Réinitialisation de votre mot de passe"), captor.capture());

        assertTrue(captor.getValue().startsWith(expectedHtmlMsgStart));
    }

    @Test
    public void testSendResetPasswordEmailDoesNothingWhenEmailIsBlank() throws MessagingException {
        String email = "";
        String emailSender = "noreply@example.com";
        String resetUrl = "http://example.com";

        emailBusinessService.sendResetPasswordEmail(email, emailSender, resetUrl, "delkelfejflzejflm");

        verify(membreRepository, never()).findMembreByEmailOrLogin(anyString());
        verify(mailService, never()).sendHtmlMessage(anyString(), any(String[].class), any(), anyString(), anyString());
    }


    @Test
    public void testNotifyErrorOnExportSendsErrorEmail() throws MessagingException {
        Exception e = new Exception("Unexpected error");

        doNothing().when(mailService).sendHtmlMessage(anyString(), any(String[].class), any(), anyString(), anyString());

        emailBusinessService.notifyErrorOnExport(e);

        String title = "serveur complementaire-sante-solidaire.gouv.fr - Rapport CRON export CSV en erreur";

        ArgumentCaptor<String> messageCaptor = ArgumentCaptor.forClass(String.class);
        verify(mailService, times(1)).sendHtmlMessage(isNull(), eq(new String[]{"adresse.cnam.fr"}), isNull(), eq(title), messageCaptor.capture());

        assertTrue(messageCaptor.getValue().contains("Une erreur a été détectée lors de la génération des fichiers d'export CSV à destination de l'Assurance Maladie"));
        assertTrue(messageCaptor.getValue().contains("Unexpected error"));
    }*/

    /*
    @Test
    public void testGenerateResetToken() {
        MembreEntity membre = new MembreEntity();
        membre.setEmail("user@example.com");

        String token = emailBusinessService.generateResetToken(membre);

        assertNotNull(token);
        assertFalse(token.isEmpty());
    }*/

}
