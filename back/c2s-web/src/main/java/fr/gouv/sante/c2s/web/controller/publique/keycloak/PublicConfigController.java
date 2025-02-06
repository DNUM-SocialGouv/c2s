package fr.gouv.sante.c2s.web.controller.publique.keycloak;

import fr.gouv.sante.c2s.model.dto.ConfigKeycloakDTO;
import fr.gouv.sante.c2s.web.WebConstants;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
public class PublicConfigController {

    @Value("${keycloak.baseUrl}")
    private  String baseUrl;
    @Value("${keycloak.realm}")
    private String realm;
    @Value("${keycloak.clientId}")
    private String clientId;

    // public
    @Tag(name = "[Public] Permets de récupérer des variables de configuration")
    @GetMapping("/"+ WebConstants.PUBLIC_PREFIX_URL+"/config")
    public ResponseEntity<ConfigKeycloakDTO> config() {
        log.info("Appel API config");
        ConfigKeycloakDTO response = ConfigKeycloakDTO.builder()
                .baseUrl(baseUrl)
                .clientId(clientId)
                .realm(realm)
                .build();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
