package fr.gouv.sante.c2s.web.controller.moderateur;

import fr.gouv.sante.c2s.model.dto.WelcomeModerateurDTO;
import fr.gouv.sante.c2s.service.DailyStatistiqueService;
import fr.gouv.sante.c2s.web.WebConstants;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "[Modérateur] Homepage", description = "Page d'accueil du modérateur")
@RestController
@RequestMapping("/"+ WebConstants.MODERATEUR_PREFIX_URL)
public class ModerateurHomeController {

    DailyStatistiqueService dailyStatistiqueService;

    @Autowired
    public ModerateurHomeController(DailyStatistiqueService dailyStatistiqueService) {
        this.dailyStatistiqueService = dailyStatistiqueService;
    }

    @Operation(description = "Renvoi le message d'accueil et les ressources en lien avec le type du partenaire connecté")
    @GetMapping("/welcome")
    public WelcomeModerateurDTO getWelcomePartenaire() {
        return dailyStatistiqueService.getWelcomeModerateurDTO();
    }

}
