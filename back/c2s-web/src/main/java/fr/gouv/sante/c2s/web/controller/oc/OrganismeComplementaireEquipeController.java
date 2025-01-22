package fr.gouv.sante.c2s.web.controller.oc;

import fr.gouv.sante.c2s.model.TypeMembreEnum;
import fr.gouv.sante.c2s.model.dto.EmailDTO;
import fr.gouv.sante.c2s.model.dto.membre.MembreEquipeDTO;
import fr.gouv.sante.c2s.service.MembreService;
import fr.gouv.sante.c2s.web.WebConstants;
import fr.gouv.sante.c2s.model.dto.session.MembreSessionDTO;
import fr.gouv.sante.c2s.web.session.MembreSessionManager;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Tag(name = "[OC] Gestion de mon équipe", description = "Liste des membres, associer un membre à un type, supprimer un membre")
@RequestMapping("/"+ WebConstants.OC_PREFIX_URL+"/"+WebConstants.EQUIPE_NAME_URL)
public class OrganismeComplementaireEquipeController {

    @Value("${reset.url}")
    private String baseUrl;

    @Autowired
    private MembreService membreService;

    @Operation(summary = "Retourne la liste des membres de mon SIREN")
    @GetMapping
    public ResponseEntity<List<MembreEquipeDTO>> getMembres(@Parameter(hidden = true) @SessionAttribute(MembreSessionManager.MEMBRE_SESSION_KEY) MembreSessionDTO membreSession) {
        return ResponseEntity.ok(membreService.getMembresActifs(membreSession.getSiren()));
    }

    @Operation(summary = "Permets d'associer un ou des types à un membre")
    @PutMapping
    public ResponseEntity<Boolean> setMembreTypes(@RequestParam(name = "email") String email,
                                                  @RequestParam(name = "types", required = false) TypeMembreEnum[] types,
                                                  @Parameter(hidden = true) @SessionAttribute(MembreSessionManager.MEMBRE_SESSION_KEY) MembreSessionDTO membreSession) {
        return ResponseEntity.ok(membreService.setMembreTypes(membreSession, email, types));
    }

    @Operation(summary = "Suppression logique d'un membre par email")
    @DeleteMapping
    public ResponseEntity<Boolean> deleteMembre(@RequestParam(name = "email") @Parameter(hidden = true) String email,
                                                @Parameter(hidden = true) @SessionAttribute(MembreSessionManager.MEMBRE_SESSION_KEY) MembreSessionDTO membreSession) {
        return ResponseEntity.ok(membreService.deleteMembre(membreSession, email));
    }

    @Operation(summary = "Envoyer un mail d'inscription")
    @PostMapping
    public ResponseEntity<Boolean> sendMailRejoindreEquipe(@RequestBody @Valid EmailDTO email,
                                                           @Parameter(hidden = true) @SessionAttribute(MembreSessionManager.MEMBRE_SESSION_KEY) MembreSessionDTO membreSession) {
        membreService.sendMailInvitation(membreSession.getEmail(), email.getEmail(), baseUrl);
        return ResponseEntity.ok(true);
    }
}
