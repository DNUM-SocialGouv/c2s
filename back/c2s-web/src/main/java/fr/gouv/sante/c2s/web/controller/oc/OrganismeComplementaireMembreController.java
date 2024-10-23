package fr.gouv.sante.c2s.web.controller.oc;

import fr.gouv.sante.c2s.model.dto.MembreInfoDTO;
import fr.gouv.sante.c2s.model.dto.MembreToDeleteDTO;
import fr.gouv.sante.c2s.service.MembreService;
import fr.gouv.sante.c2s.web.WebConstants;
import fr.gouv.sante.c2s.model.dto.session.MembreSessionDTO;
import fr.gouv.sante.c2s.web.session.MembreSessionManager;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "[OC] Gestion des membres de mon équipe")
@RestController
public class OrganismeComplementaireMembreController {

    @Autowired
    MembreService membreService;

    // OC
    @GetMapping("/"+WebConstants.OC_PREFIX_URL+"/"+WebConstants.MEMBRE_NAME_URL+"/search")
    public ResponseEntity<MembreInfoDTO> getMembreByEmail(@RequestParam(name = "email") String email) {

        if (email == null || email.trim().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        MembreInfoDTO membreInfoDTO = membreService.getMembreByEmail(email);
        if (membreInfoDTO != null) {
            return ResponseEntity.ok(membreInfoDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // OC
    @PutMapping("/"+WebConstants.OC_PREFIX_URL+"/"+WebConstants.MEMBRE_NAME_URL+"/update")
    public ResponseEntity<Void> updateMembreInfo(@Valid @RequestBody MembreInfoDTO membre, @SessionAttribute(name = MembreSessionManager.MEMBRE_SESSION_KEY) MembreSessionDTO userSession) {
        if (userSession.getEmail().equalsIgnoreCase(membre.getEmail())) {
            membreService.updateMembreInfo(userSession, membre);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(401).build();
        }
    }

    // OC
    @PostMapping("/"+WebConstants.OC_PREFIX_URL+"/"+WebConstants.MEMBRE_NAME_URL+"/delete")
    public ResponseEntity<String> deleteUserByEmail(@Valid @RequestBody MembreToDeleteDTO deleteObject, @SessionAttribute(name = MembreSessionManager.MEMBRE_SESSION_KEY) MembreSessionDTO userSession) {
        try {
            if (userSession.getEmail().equalsIgnoreCase(deleteObject.getEmail())) {
                membreService.deleteMembre(userSession, deleteObject.getEmail());
                return ResponseEntity.ok("Utilisateur supprimé avec succès.");
            } else {
                return ResponseEntity.status(401).build();
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Erreur lors de la suppression de l'utilisateur.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
