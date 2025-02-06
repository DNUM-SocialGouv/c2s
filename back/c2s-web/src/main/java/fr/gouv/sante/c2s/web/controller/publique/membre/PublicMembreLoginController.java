package fr.gouv.sante.c2s.web.controller.publique.membre;

import fr.gouv.sante.c2s.keycloak.KeycloakMonoRealmService;
import fr.gouv.sante.c2s.keycloak.UserRepresentation;
import fr.gouv.sante.c2s.model.StatutMembreEnum;
import fr.gouv.sante.c2s.model.dto.membre.MembreInfoDTO;
import fr.gouv.sante.c2s.model.dto.session.MembreSessionDTO;
import fr.gouv.sante.c2s.service.MembreService;
import fr.gouv.sante.c2s.web.WebConstants;
import fr.gouv.sante.c2s.web.session.MembreSessionManager;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Tag(name = "[Public] Connexion / Déconnexion utilisateur")
@Slf4j
public class PublicMembreLoginController {

    @Autowired
    KeycloakMonoRealmService realmService;

    @Autowired
    MembreService membreService;

    @Autowired
    MembreSessionManager sessionManager;

    @Operation(description = "Login ")
    @PostMapping(value = "/"+WebConstants.PUBLIC_PREFIX_URL+"/login", consumes = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<Boolean> doLogin(HttpServletRequest request, @RequestBody String token) {

        try {

            log.debug("Login : [" + token + "]");
            UserRepresentation representation = realmService.getBaseService().getUserFromToken(token);

            if (representation != null && representation.isEmailVerified()) {
                log.debug(representation.getEmail());
                MembreInfoDTO membre = membreService.getMembreByEmail(representation.getEmail());
                if (membre!=null && membre.getStatut() == StatutMembreEnum.ACTIF) {
                    MembreSessionDTO membreSessionDTO = sessionManager.openSession(request, membre);
                    membreService.setLoginDate(membreSessionDTO, representation.getEmail());
                    log.info(membre.getEmail() + " is connected");
                    return ResponseEntity.ok(true);
                }
            }

        } catch (InterruptedException ie) {
            Thread.currentThread().interrupt();
            log.error("Le login d'un membre a été interrompu");
        } catch (Exception e) {
            log.error("La connection d'un membre a échoué : "+e.getMessage());
        }

        return ResponseEntity.ok(false);
    }

    @Operation(description = "Logout")
    @PostMapping("/"+ WebConstants.PUBLIC_PREFIX_URL+"/logout")
    public ResponseEntity<Boolean> doLogout(HttpServletRequest request, @RequestBody String token) {
        try {
            realmService.getBaseService().logout(token);
            sessionManager.closeSession(request);
            return ResponseEntity.ok(true);
        } catch (InterruptedException ie) {
            Thread.currentThread().interrupt();
            log.error("Le logout d'un membre a été interrompu");
        } catch (Exception e) {
            log.error("Le logout d'un membre a échoué");
        }
        return ResponseEntity.ok(false);
    }


}
