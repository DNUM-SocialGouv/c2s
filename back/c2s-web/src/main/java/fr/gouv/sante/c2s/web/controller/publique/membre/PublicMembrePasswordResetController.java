package fr.gouv.sante.c2s.web.controller.publique.membre;

import fr.gouv.sante.c2s.keycloak.KeycloakMonoRealmService;
import fr.gouv.sante.c2s.model.dto.EmailDTO;
import fr.gouv.sante.c2s.service.mail.EmailBusinessService;
import fr.gouv.sante.c2s.model.dto.MembrePasswordToResetDTO;
import fr.gouv.sante.c2s.web.WebConstants;
import fr.gouv.sante.c2s.web.application.ApplicationContextWrapper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Tag(name = "[Public] Procédure \"reset password\"")
public class PublicMembrePasswordResetController {

    @Autowired
    private EmailBusinessService emailService;

    @Value("${reset.url}")
    private String resetUrl;

    @Value("${spring.mail.username}")
    private String senderEmail;

    @Autowired
    private KeycloakMonoRealmService keycloakService;

    @Autowired
    private ApplicationContextWrapper applicationContextWrapper;

    // public
    @Operation(
            summary = "Demande l'envoi d'un mail pour la procédure \"reset password\"",
            description =
                    "Envoie un mail pour la procédure \"reset password\" à l'adresse mail renseignée dans le request body.<br/>" +
                    "Ce mail contient un lien avec un token en paramètre.<br/>" +
                    "Ce lien permets d'accéder au formulaire de redéfinition du mot de passe."
    )
    @PostMapping("/"+WebConstants.PUBLIC_PREFIX_URL+"/request-reset-password")
    public ResponseEntity<String> requestResetPassword(@RequestBody EmailDTO email) {
        String token = applicationContextWrapper.createToken(email.getEmail());
        emailService.sendResetPasswordEmail(email.getEmail(), senderEmail, resetUrl, token);
        return ResponseEntity.noContent().build();
    }

    // public
    @Operation(
            description = "Soumission du formulaire de la procédure \"reset password\"",
            summary = "Enregistre le nouveau de passe.\nDoit contenir le JWT reçu par mail."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "400", description = "Requête incorrecte"),
            @ApiResponse(responseCode = "200", description = "Requête bien reçue")
    })
    @PostMapping("/"+WebConstants.PUBLIC_PREFIX_URL+"/reset-password")
    public ResponseEntity<Boolean> resetPassword(@Valid @RequestBody MembrePasswordToResetDTO resetPasswordDTO) {
        String email = applicationContextWrapper.getEmailFromToken(resetPasswordDTO.getToken());
        if (email!=null && applicationContextWrapper.isValidToken(resetPasswordDTO.getToken())) {
            Boolean b = keycloakService.getAdminService().resetPassword(email, resetPasswordDTO.getPassword());
            return ResponseEntity.ok(b);
        }
        return ResponseEntity.badRequest().build();
    }
}
