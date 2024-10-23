package fr.gouv.sante.c2s.web.controller.partenaire;

import fr.gouv.sante.c2s.model.dto.HistoryOperationDTO;
import fr.gouv.sante.c2s.model.dto.session.MembreSessionDTO;
import fr.gouv.sante.c2s.service.partenaire.PartenaireHistoricReaderService;
import fr.gouv.sante.c2s.web.WebConstants;
import fr.gouv.sante.c2s.web.controller.BaseController;
import fr.gouv.sante.c2s.web.model.response.PageableCountDTO;
import fr.gouv.sante.c2s.web.session.MembreSessionManager;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "[Partenaire] Historique des opérations", description = "Permets de consulter les opérations historisées effectuées par ses membres")
@RestController
@RequestMapping("/"+ WebConstants.PARTENAIRE_PREFIX_URL+"/"+WebConstants.HISTORIQUE_NAME_URL)
public class PartenaireHistoryOperationController extends BaseController {

    @Autowired
    PartenaireHistoricReaderService historicReaderService;

    @Operation(description = "Recherche des opérations historisées.")
    @Parameter(name = "page", description = "Numéro de la page demandée (0 .. n)")
    @Parameter(name = "size", description = "Nombre de lignes demandées")
    @GetMapping
    public ResponseEntity<PageableCountDTO<HistoryOperationDTO>> getOperations(
            @Parameter(hidden = true) @SessionAttribute(MembreSessionManager.MEMBRE_SESSION_KEY) MembreSessionDTO membreSession,
            @Parameter(hidden = true) @PageableDefault(page = 0, size = 20, sort = "id") Pageable pageable) {
        pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by("id").ascending());
        PageableCountDTO<HistoryOperationDTO> pc = new PageableCountDTO<>();
        System.out.println("Session SIREN : "+membreSession.getSiren());
        pc.setList(historicReaderService.getHistoricOperations(membreSession.getSiren(), pageable));
        pc.setCount(historicReaderService.countHistoricOperations(membreSession.getSiren()));
        return ResponseEntity.ok(pc);
    }
}