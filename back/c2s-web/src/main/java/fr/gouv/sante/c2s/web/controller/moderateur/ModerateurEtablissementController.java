package fr.gouv.sante.c2s.web.controller.moderateur;

import fr.gouv.sante.c2s.model.EtatEnum;
import fr.gouv.sante.c2s.model.GroupeEnum;
import fr.gouv.sante.c2s.model.dto.*;
import fr.gouv.sante.c2s.model.dto.session.MembreSessionDTO;
import fr.gouv.sante.c2s.model.exception.ManualConstraintViolationException;
import fr.gouv.sante.c2s.service.EtablissementService;
import fr.gouv.sante.c2s.service.moderateur.ModerateurEntrepriseService;
import fr.gouv.sante.c2s.service.moderateur.ModerateurEtablissementService;
import fr.gouv.sante.c2s.web.WebConstants;
import fr.gouv.sante.c2s.web.controller.BaseController;
import fr.gouv.sante.c2s.web.model.response.ModerateurEtablissementHomeDTO;
import fr.gouv.sante.c2s.web.model.response.PageableCountDTO;
import fr.gouv.sante.c2s.web.session.MembreSessionManager;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "[Modérateur] Etablissements", description = "Contient tous les endpoints nécessaires à la gestion des établissements")
@RestController
@RequestMapping("/"+ WebConstants.MODERATEUR_PREFIX_URL+"/"+WebConstants.ETABLISSEMENT_NAME_URL)
public class ModerateurEtablissementController extends BaseController {

    EtablissementService etablissementService;
    ModerateurEtablissementService moderateurEtablissementService;
    ModerateurEntrepriseService moderateurEntrepriseService;

    @Autowired
    public ModerateurEtablissementController(EtablissementService etablissementService, ModerateurEntrepriseService moderateurEntrepriseService, ModerateurEtablissementService moderateurEtablissementService) {
        this.etablissementService = etablissementService;
        this.moderateurEtablissementService = moderateurEtablissementService;
        this.moderateurEntrepriseService = moderateurEntrepriseService;
    }

    @Operation(description = "Informations nécessaires pour la page de modération des établissements")
    @GetMapping("/home")
    public ResponseEntity<ModerateurEtablissementHomeDTO> getHomeInformations() {
        ModerateurEtablissementHomeDTO home = new ModerateurEtablissementHomeDTO();
        home.setRegions(moderateurEtablissementService.getRegions());
        home.setDepartements(moderateurEtablissementService.getDepartements());
        home.setEtablissementTypes(getGroupesAsPartenaires());
        home.setPointsAccueilCount(moderateurEtablissementService.getPointsAccueilCount());
        home.setOcActifsCount(moderateurEtablissementService.getOrganismeComplementairesActifsCount());
        return ResponseEntity.ok(home);
    }

    @Operation(description = "Recherche des établissements")
    @Parameter(name = "page", description = "Numéro de la page demandée (0 .. n)")
    @Parameter(name = "size", description = "Nombre de lignes demandées")
    @Parameter(name = "groupe", description = "CAISSE | ORGANISME_COMPLEMENTAIRE")
    @Parameter(name = "search", description = "Recherche texte sur le nom de l'entreprise")
    @GetMapping("/search")
    public ResponseEntity<PageableCountDTO<OrganismeComplementaireWithPointAccueilCountDTO>> search(@RequestParam(value = "search", required = false) String search,
                                                   @RequestParam(value = "groupe", required = false) String groupe,
                                                   @RequestParam(value = "region", required = false) String region,
                                                   @RequestParam(value = "departement", required = false) String departement,
                                                   @Parameter(hidden = true) @PageableDefault(page = 0, size = 20, sort = "id") Pageable pageableQuery) {
        EtatEnum etat = EtatEnum.ACTIF;
        GroupeEnum groupeEnum = null;
        if (groupe!=null) {
            groupeEnum = GroupeEnum.valueOf(groupe);
        }
        PageableCountDTO<OrganismeComplementaireWithPointAccueilCountDTO> pageable = new PageableCountDTO<>();
        pageable.setList(moderateurEtablissementService.searchPartenaire(search, groupeEnum, region,departement, etat, pageableQuery));
        pageable.setCount(moderateurEtablissementService.countPartenaire(search, groupeEnum, region, departement, etat));
        return ResponseEntity.ok(pageable);
    }

    @Operation(description = "Liste paginée des établissements d'une entreprises")
    @Parameter(name = "entrepriseId", description = "ID de l'entreprise (OC)")
    @Parameter(name = "page", description = "Numéro de la page demandée (0 .. n)")
    @Parameter(name = "size", description = "Nombre de lignes demandées")
    @GetMapping("/list")
    public ResponseEntity<PageableCountDTO<List<PointAccueilReponseDTO>>> getEtablissements(@RequestParam(value = "entrepriseId") Long entrepriseId,
                                                                                            @Parameter(hidden = true) @PageableDefault(page = 0, size = 20, sort = "id") Pageable pageableQuery) {
        PageableCountDTO pageableCountDTO = new PageableCountDTO<List<PointAccueilReponseDTO>>();
        pageableCountDTO.setCount(moderateurEtablissementService.getEtablissementsCount(entrepriseId));
        pageableCountDTO.setList(moderateurEtablissementService.getEtablissements(entrepriseId, pageableQuery));
        return ResponseEntity.ok(pageableCountDTO);
    }

    @Operation(description = "Création d'un établissement (Point d'accueil)")
    @PostMapping("/create")
    public ResponseEntity<PointAccueilReponseDTO> createEtablissement(@Valid @RequestBody PointAccueilToCreateDTO pointAccueilDTO,
                                                                      @Parameter(hidden = true) @SessionAttribute(name = MembreSessionManager.MEMBRE_SESSION_KEY) MembreSessionDTO userSession) {
        if (!moderateurEntrepriseService.isEntrepriseExistsBySiren(pointAccueilDTO.getLocSiren())) {
            throw new ManualConstraintViolationException("entreprise", "Ce SIREN n'est pas référencé");
        }
        PointAccueilReponseDTO pointAccueilEntity = etablissementService.createPointAccueil(userSession, pointAccueilDTO);
        return new ResponseEntity<>(pointAccueilEntity, HttpStatus.CREATED);
    }

    @Operation(description = "Suppression d'un établissement (Point d'accueil)")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEtablissement(@PathVariable("id") String id,
                                                    @Parameter(hidden = true) @SessionAttribute(name = MembreSessionManager.MEMBRE_SESSION_KEY) MembreSessionDTO userSession) {
        etablissementService.deletePointAccueil(userSession, Long.parseLong(id));
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateEtablissement(@Valid @RequestBody PointAccueilReponseDTO paLpa,
                                                      @Parameter(hidden = true) @SessionAttribute(name = MembreSessionManager.MEMBRE_SESSION_KEY) MembreSessionDTO userSession) {
        etablissementService.updatePointAccueilById(userSession, paLpa);
        return ResponseEntity.ok("Le point d'accueil est mis à jour");
    }
}
