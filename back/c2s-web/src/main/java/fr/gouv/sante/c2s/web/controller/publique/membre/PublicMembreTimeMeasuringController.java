package fr.gouv.sante.c2s.web.controller.publique.membre;

import fr.gouv.sante.c2s.web.WebConstants;
import fr.gouv.sante.c2s.web.controller.BaseController;
import fr.gouv.sante.c2s.web.session.AnonymousSessionManager;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.commons.lang3.tuple.Pair;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

//@Tag(name = "[Public] Mesure du temps", description = "Cette fonctionnalité sert à filtrer les bots qui soumettent trop rapidement un formulaire")
@RestController
@RequestMapping("/"+ WebConstants.PUBLIC_PREFIX_URL)
public class PublicMembreTimeMeasuringController extends BaseController {

    @Tag(name = "[Public] Time measuring : point d'entrée nécessaire pour le contrôle anti-bot")
    @Operation(description = "Créer un timestamp côté serveur pour un formulaire donné ")
    @GetMapping("/tm")
    public ResponseEntity<Pair> startTimeMeasuring(HttpServletRequest request, @RequestParam("formId") String formId) {
        AnonymousSessionManager sessionManager = new AnonymousSessionManager();
        sessionManager.startTimeMeasuring(request, formId);
        return ResponseEntity.ok().build();
    }

}