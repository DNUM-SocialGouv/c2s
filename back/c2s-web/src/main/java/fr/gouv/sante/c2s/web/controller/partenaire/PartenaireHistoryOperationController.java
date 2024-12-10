package fr.gouv.sante.c2s.web.controller.partenaire;

import fr.gouv.sante.c2s.model.SectionEnum;
import fr.gouv.sante.c2s.model.dto.HistoryOperationDTO;
import fr.gouv.sante.c2s.model.dto.session.MembreSessionDTO;
import fr.gouv.sante.c2s.model.exception.ManualConstraintViolationException;
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
        pc.setList(historicReaderService.getHistoricOperations(membreSession.getSiren(), null, pageable));
        pc.setCount(historicReaderService.countHistoricOperations(membreSession.getSiren(), null));
        return ResponseEntity.ok(pc);
    }

    @Operation(description = "Recherche des opérations historisées avec tri et filtres.")
    @Parameter(name = "sortOrder", description = "Ordre de tri : 'asc' ou 'desc'")
    @Parameter(name = "sortField", description = "Champ de tri : 'date' ou 'membre' ou 'section'")
    @Parameter(name = "section", description = "Section de l'OC (MES_ETABLISSEMENTS, MON_EQUIPE)")
    @Parameter(name = "page", description = "Numéro de la page demandée (0 .. n)")
    @Parameter(name = "size", description = "Nombre de lignes demandées")
    @GetMapping("/search")
    public ResponseEntity<PageableCountDTO<HistoryOperationDTO>> searchOperations(
            @RequestParam(value = "section", required = false) String section,
            @RequestParam(value = "sortOrder", required = false) String sortOrder,
            @RequestParam(value = "sortField", required = false) String sortField,
            @Parameter(hidden = true) @SessionAttribute(MembreSessionManager.MEMBRE_SESSION_KEY) MembreSessionDTO membreSession,
            @Parameter(hidden = true) @PageableDefault(page = 0, size = 20, sort = "id") Pageable pageable) {

        SectionEnum sectionEnum = null;
        Sort sort = null;

        if (section!=null) {
            sectionEnum = getSection(section);
        }

        if (sortField!=null || sortOrder!=null) {
            if (sortField == null || sortOrder == null) {
                throw new ManualConstraintViolationException("sort", "Les 2 paramètres (sortField, sortOrder) doivent être renseignés pour le tri");
            }
            if (!sortField.equals("date") && !sortField.equals("membre") && !sortField.equals("section")) {
                throw new ManualConstraintViolationException("sort", "Le paramètre 'sortField' est incorrect (asc ou desc attendu)");
            }
            if (!sortOrder.equals("asc") && !sortOrder.equals("desc")) {
                throw new ManualConstraintViolationException("sort", "Le paramètre 'sortOrder' est incorrect (asc ou desc attendu)");
            }

            if (sortField.equals("membre")) {
                sortField = "membreInformations";
            } else if (sortField.equals("date")) {
                sortField = "operationDate";
            }

            sort = Sort.by(sortField);
            if (sortOrder.equals("desc")) {
                sort = sort.descending();
            } else {
                sort = sort.ascending();
            }
        } else {
            sort = Sort.by("id").ascending();
        }

        pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), sort);
        PageableCountDTO<HistoryOperationDTO> pc = new PageableCountDTO<>();
        pc.setList(historicReaderService.getHistoricOperations(membreSession.getSiren(), sectionEnum, pageable));
        pc.setCount(historicReaderService.countHistoricOperations(membreSession.getSiren(), sectionEnum));
        return ResponseEntity.ok(pc);
    }

    private SectionEnum getSection(String section) {
        try {
            SectionEnum sectionEnum = SectionEnum.valueOf(section);
            if (sectionEnum!=SectionEnum.MES_ETABLISSEMENTS && sectionEnum!=SectionEnum.MON_EQUIPE) {
                throw new ManualConstraintViolationException("section", "La section n'est pas correcte");
            }
            return sectionEnum;
        } catch (Exception e) {
            throw new ManualConstraintViolationException("section" , "La section " + section + " n'existe pas");
        }
    }
}