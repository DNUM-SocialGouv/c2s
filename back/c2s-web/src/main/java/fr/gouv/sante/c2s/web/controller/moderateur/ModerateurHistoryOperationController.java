package fr.gouv.sante.c2s.web.controller.moderateur;

import fr.gouv.sante.c2s.model.dto.HistoryOperationDTO;
import fr.gouv.sante.c2s.service.moderateur.ModerateurHistoricReaderService;
import fr.gouv.sante.c2s.web.WebConstants;
import fr.gouv.sante.c2s.web.controller.BaseController;
import fr.gouv.sante.c2s.web.model.response.PageableCountDTO;
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

@Tag(name = "[Modérateur] Historiques des opérations", description = "Permets de consulter les opérations historisées effectuées par les membres")
@RestController
@RequestMapping("/"+ WebConstants.MODERATEUR_PREFIX_URL+"/"+WebConstants.HISTORIQUE_NAME_URL)
public class ModerateurHistoryOperationController extends BaseController {

    ModerateurHistoricReaderService historicReaderService;

    @Autowired
    public ModerateurHistoryOperationController(ModerateurHistoricReaderService historicReaderService) {
        this.historicReaderService = historicReaderService;
    }

    @Operation(description = "Recherche des opérations historisées avec filtre sur nom de l'OC.")
    @Parameter(name = "page", description = "Numéro de la page demandée (0 .. n)")
    @Parameter(name = "size", description = "Nombre de lignes demandées")
    @GetMapping
    public ResponseEntity<PageableCountDTO<HistoryOperationDTO>> getOperations(@RequestParam(value = "oc", required = false) String oc,
                                                                               @Parameter(hidden = true) @PageableDefault(page = 0, size = 20, sort = "id") Pageable pageable) {

        pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by("id").ascending());
        PageableCountDTO<HistoryOperationDTO> pc = new PageableCountDTO<>();
        pc.setList(historicReaderService.getHistoricOperations(oc, pageable));
        pc.setCount(historicReaderService.countHistoricOperations(oc));
        return ResponseEntity.ok(pc);
    }
}