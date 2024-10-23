package fr.gouv.sante.c2s.web.controller.moderateur;

import fr.gouv.sante.c2s.insee.InseeException;
import fr.gouv.sante.c2s.insee.InseeService;
import fr.gouv.sante.c2s.model.GroupeEnum;
import fr.gouv.sante.c2s.model.dto.EntrepriseDTO;
import fr.gouv.sante.c2s.model.dto.session.MembreSessionDTO;
import fr.gouv.sante.c2s.model.exception.ManualConstraintViolationException;
import fr.gouv.sante.c2s.service.moderateur.ModerateurEntrepriseService;
import fr.gouv.sante.c2s.service.moderateur.ModerateurEtablissementService;
import fr.gouv.sante.c2s.web.WebConstants;
import fr.gouv.sante.c2s.web.controller.BaseController;
import fr.gouv.sante.c2s.web.model.form.EntrepriseFormDTO;
import fr.gouv.sante.c2s.web.session.MembreSessionManager;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "[Modérateur] Entreprises", description = "Contient tous les endpoints nécessaires à la modération des entreprises (OC & caisse)")
@RestController
@RequestMapping("/"+ WebConstants.MODERATEUR_PREFIX_URL+"/"+WebConstants.ENTREPRISE_NAME_URL)
public class ModerateurEntrepriseController extends BaseController {

    @Autowired
    ModerateurEntrepriseService moderateurEntrepriseService;

    @Autowired
    InseeService inseeService;

    @Operation(description = "Création d'une entreprise (Organisme complémentaire / Caisse)")
    @PostMapping("/create")
    public ResponseEntity<EntrepriseDTO> createEntreprise(@Parameter(hidden = true) @SessionAttribute(name = MembreSessionManager.MEMBRE_SESSION_KEY) MembreSessionDTO userSession,
                                                          @Valid @RequestBody EntrepriseFormDTO entrepriseFormDTO) {
        if (moderateurEntrepriseService.isEntrepriseExistsBySiren(entrepriseFormDTO.getSiren())) {
            throw new ManualConstraintViolationException("entreprise", "Ce SIREN est déjà utilisé");
        }

        String denomination;

        try {
            denomination = inseeService.getDenomination(entrepriseFormDTO.getSiren());
        } catch (InseeException ie) {
            throw new ManualConstraintViolationException("insee", "Le nom de l'entreprise correspondante n'est pas trouvé");
        }

        return ResponseEntity.ok(moderateurEntrepriseService.createEntreprise(userSession,
                denomination,
                entrepriseFormDTO.getVille(),
                entrepriseFormDTO.getCodePostal(),
                entrepriseFormDTO.getAdresse(),
                GroupeEnum.valueOf(entrepriseFormDTO.getGroupe()),
                entrepriseFormDTO.getSiren(),
                entrepriseFormDTO.getEmailEntreprise(),
                entrepriseFormDTO.getSiteWeb(),
                entrepriseFormDTO.getTelephone()
        ));
    }

    @Operation(description = "Suppression d'une entreprise (Organisme complémentaire / Caisse)")
    @DeleteMapping("/delete/{siren}")
    public ResponseEntity<Boolean> deleteEntreprise(@Parameter(hidden = true) @SessionAttribute(name = MembreSessionManager.MEMBRE_SESSION_KEY) MembreSessionDTO userSession,
                                                    @PathVariable(name = "siren") String siren) {
        return ResponseEntity.ok(moderateurEntrepriseService.deleteEntreprise(userSession, siren));
    }

    @Operation(description = "Edition d'une entreprise (Organisme complémentaire / Caisse)")
    @PutMapping("/update")
    public ResponseEntity<EntrepriseDTO> editEntreprise(@Parameter(hidden = true) @SessionAttribute(name = MembreSessionManager.MEMBRE_SESSION_KEY) MembreSessionDTO userSession,
                                                        @Valid @RequestBody EntrepriseFormDTO entrepriseFormDTO) {

        if (!moderateurEntrepriseService.isEntrepriseExistsBySiren(entrepriseFormDTO.getSiren())) {
            throw new ManualConstraintViolationException("entreprise", "Ce SIREN ne corresponds pas");
        }

        return ResponseEntity.ok(moderateurEntrepriseService.editEntreprise(
                userSession,
                entrepriseFormDTO.getSociete(),
                entrepriseFormDTO.getVille(),
                entrepriseFormDTO.getCodePostal(),
                entrepriseFormDTO.getAdresse(),
                GroupeEnum.valueOf(entrepriseFormDTO.getGroupe()),
                entrepriseFormDTO.getSiren(),
                entrepriseFormDTO.getEmailEntreprise(),
                entrepriseFormDTO.getSiteWeb(),
                entrepriseFormDTO.getTelephone(),
                entrepriseFormDTO.getPointAccueil()
        ));
    }
}
