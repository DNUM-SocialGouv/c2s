package fr.gouv.sante.c2s.web.controller.moderateur;

import fr.gouv.sante.c2s.model.StatutMembreEnum;
import fr.gouv.sante.c2s.model.dto.membre.moderateur.ModerateurDTO;
import fr.gouv.sante.c2s.model.dto.session.MembreSessionDTO;
import fr.gouv.sante.c2s.service.moderateur.ModerateurMembreService;
import fr.gouv.sante.c2s.web.WebConstants;
import fr.gouv.sante.c2s.web.session.MembreSessionManager;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "[Modérateur] Modérateurs", description = "Modération des comptes modérateur")
@RestController
@RequestMapping("/"+ WebConstants.MODERATEUR_PREFIX_URL+"/"+WebConstants.MODERATEUR_NAME_URL)
public class ModerateurModerateurController {

    private ModerateurMembreService moderateurMembreService;

    @Autowired
    public ModerateurModerateurController(ModerateurMembreService moderateurMembreService) {
        this.moderateurMembreService = moderateurMembreService;
    }

    @Operation(description = "Liste de tous les modérateurs")
    @GetMapping
    public List<ModerateurDTO> getModerateurs() {
        return moderateurMembreService.getModerateurs(new StatutMembreEnum[]{StatutMembreEnum.ACTIF});
    }

    @Operation(description = "Création d'un modérateur")
    @PostMapping
    public ModerateurDTO addModerateur(@Valid @RequestBody ModerateurDTO moderateur,
                                             @Parameter(hidden = true) @SessionAttribute(name = MembreSessionManager.MEMBRE_SESSION_KEY) MembreSessionDTO userSession) {
        return moderateurMembreService.addModerateur(moderateur, userSession);
    }

    @Operation(description = "Modification d'un modérateur")
    @PutMapping
    public ModerateurDTO updateModerateur(@Valid @RequestBody ModerateurDTO moderateur,
                                                @Parameter(hidden = true) @SessionAttribute(name = MembreSessionManager.MEMBRE_SESSION_KEY) MembreSessionDTO userSession) {
        return moderateurMembreService.updateModerateur(moderateur, userSession);
    }

    @Operation(description = "Suppression d'un modérateur")
    @DeleteMapping
    public boolean deleteModerateur(@RequestParam(name = "email") String email) {
        return moderateurMembreService.deleteModerateur(email);
    }

}
