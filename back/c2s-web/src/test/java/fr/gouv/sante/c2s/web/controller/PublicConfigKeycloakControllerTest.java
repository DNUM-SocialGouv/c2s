package fr.gouv.sante.c2s.web.controller;

import fr.gouv.sante.c2s.model.dto.ConfigKeycloakDTO;
import fr.gouv.sante.c2s.web.controller.publique.keycloak.PublicConfigController;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.util.ReflectionTestUtils;

import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(MockitoExtension.class)
public class PublicConfigKeycloakControllerTest {

    @InjectMocks
    private PublicConfigController publicConfigController;

    @Test
    void configKeycloak() {
        // Use ReflectionTestUtils to set private fields
        ReflectionTestUtils.setField(publicConfigController, "baseUrl", "http://localhost:8080/auth");
        ReflectionTestUtils.setField(publicConfigController, "realm", "myRealm");
        ReflectionTestUtils.setField(publicConfigController, "clientId", "myClient");

        // Act
        ResponseEntity<ConfigKeycloakDTO> response = publicConfigController.config();

        // Assert
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().getBaseUrl()).isEqualTo("http://localhost:8080/auth");
        assertThat(response.getBody().getRealm()).isEqualTo("myRealm");
        assertThat(response.getBody().getClientId()).isEqualTo("myClient");
    }
}
