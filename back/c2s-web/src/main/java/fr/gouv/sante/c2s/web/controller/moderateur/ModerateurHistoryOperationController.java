package fr.gouv.sante.c2s.web.controller.moderateur;

import fr.gouv.sante.c2s.model.SectionEnum;
import fr.gouv.sante.c2s.model.dto.HistoryOperationDTO;
import fr.gouv.sante.c2s.model.exception.ManualConstraintViolationException;
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
        pc.setList(historicReaderService.getHistoricOperations(oc,null, pageable));
        pc.setCount(historicReaderService.countHistoricOperations(oc, null));
        return ResponseEntity.ok(pc);
    }


    @Operation(description = "Recherche des opérations historisées avec tri et filtres sur nom de l'OC et la section")
    @Parameter(name = "sortOrder", description = "Ordre de tri : 'asc' ou 'desc'")
    @Parameter(name = "sortField", description = "Champ de tri : 'date' ou 'membre' ou 'section'")
    @Parameter(name = "oc", description = "Nom de l'OC")
    @Parameter(name = "section", description = "Section de l'OC (MES_ETABLISSEMENTS, MON_EQUIPE, MODERATION_UTILISATEURS, MODERATION_ETABLISSEMENTS, MODERATION_MODERATEURS, MODERATION_CONTENU)")
    @Parameter(name = "page", description = "Numéro de la page demandée (0 .. n)")
    @Parameter(name = "size", description = "Nombre de lignes demandées")
    @GetMapping("/search")
    public ResponseEntity<PageableCountDTO<HistoryOperationDTO>> searchOperations(@RequestParam(value = "oc", required = false) String oc,
                                                                                  @RequestParam(value = "section", required = false) String section,
                                                                                  @RequestParam(value = "sortOrder", required = false) String sortOrder,
                                                                                  @RequestParam(value = "sortField", required = false) String sortField,
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
        pc.setList(historicReaderService.getHistoricOperations(oc, sectionEnum, pageable));
        pc.setCount(historicReaderService.countHistoricOperations(oc, sectionEnum));
        return ResponseEntity.ok(pc);
    }

    private SectionEnum getSection(String section) {
        try {
            return SectionEnum.valueOf(section);
        } catch (Exception e) {
            throw new ManualConstraintViolationException("section" , "La section " + section + " n'existe pas");
        }
    }
}