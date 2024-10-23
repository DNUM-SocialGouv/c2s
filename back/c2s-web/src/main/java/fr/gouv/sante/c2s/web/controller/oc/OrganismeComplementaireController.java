package fr.gouv.sante.c2s.web.controller.oc;

import fr.gouv.sante.c2s.model.dto.OrganismeComplementaireDTO;
import fr.gouv.sante.c2s.model.dto.session.MembreSessionDTO;
import fr.gouv.sante.c2s.service.partenaire.PartenaireService;
import fr.gouv.sante.c2s.web.WebConstants;
import fr.gouv.sante.c2s.web.session.MembreSessionManager;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@Tag(name = "[OC] \"Read\" ou \"Update\" ", description = "Permets de récupérer ou d'éditer un organisme complémentaire")
@RestController
@RequestMapping("/"+ WebConstants.OC_PREFIX_URL)
@RequiredArgsConstructor
public class OrganismeComplementaireController {

    @Autowired
    private PartenaireService partenaireService;

    @GetMapping
    public ResponseEntity<OrganismeComplementaireDTO> getOcInfoByEmail(@RequestParam("email") String email) {
        if (email.isBlank()) {
            return ResponseEntity.badRequest().build();
        }
        OrganismeComplementaireDTO ocLoc = partenaireService.findOrganismeComplementaireByEmail(email);
        return ocLoc != null ? ResponseEntity.ok(ocLoc) : ResponseEntity.notFound().build();
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateOcInfo(@Valid @RequestBody OrganismeComplementaireDTO ocInfo,
                                               @Parameter(hidden = true) @SessionAttribute(MembreSessionManager.MEMBRE_SESSION_KEY) MembreSessionDTO membreSession) {
        partenaireService.updatePartenaireInfo(ocInfo, membreSession);
        return ResponseEntity.ok("OC est mis à jour");
    }
}
