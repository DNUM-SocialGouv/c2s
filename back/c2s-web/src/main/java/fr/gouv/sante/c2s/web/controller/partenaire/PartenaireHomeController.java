package fr.gouv.sante.c2s.web.controller.partenaire;

import fr.gouv.sante.c2s.model.GroupeEnum;
import fr.gouv.sante.c2s.model.dto.WelcomePartenaireDTO;
import fr.gouv.sante.c2s.service.partenaire.PartenaireService;
import fr.gouv.sante.c2s.web.WebConstants;
import fr.gouv.sante.c2s.web.session.MembreSessionManager;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "[Partenaire] Organisme complémentaire ou caisse", description = "Page d'accueil partenaire")
@RestController
@RequestMapping("/"+ WebConstants.PARTENAIRE_PREFIX_URL)
public class PartenaireHomeController {

    @Autowired
    MembreSessionManager membreSessionManager;

    @Autowired
    PartenaireService partenaireService;

    @Operation(description = "Renvoi le message d'accueil et les ressources en lien avec le type du partenaire connecté")
    @GetMapping("/welcome")
    public WelcomePartenaireDTO getWelcomePartenaire(HttpServletRequest request) {
        GroupeEnum groupe = membreSessionManager.getMembre(request).getGroupe();
        return partenaireService.getWelcomePartenaire(groupe);
    }

}
