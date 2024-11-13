package fr.gouv.sante.c2s.web.controller.oc;

import fr.gouv.sante.c2s.model.dto.membre.MembreInfoDTO;
import fr.gouv.sante.c2s.model.dto.PointAccueilReponseDTO;
import fr.gouv.sante.c2s.model.dto.PointAccueilToCreateDTO;
import fr.gouv.sante.c2s.service.MembreService;
import fr.gouv.sante.c2s.service.EtablissementService;
import fr.gouv.sante.c2s.web.WebConstants;
import fr.gouv.sante.c2s.model.dto.session.MembreSessionDTO;
import fr.gouv.sante.c2s.web.session.MembreSessionManager;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

@RestController
@Tag(name = "[OC] Gestion des points d'accueil", description = "Recherche paginée - regions - departements - création - get by ID - suppression")
@RequiredArgsConstructor
public class OrganismeComplementairePointAccueilController {

    @Autowired
    private final EtablissementService etablissementService;

    @Autowired
    private final MembreService membreService;

    // OC
    @GetMapping("/"+WebConstants.OC_PREFIX_URL+"/"+ WebConstants.POINT_ACCUEIL_NAME_URL)
    public ResponseEntity<Page<PointAccueilReponseDTO>> getFilteredPointAccueil(
            @RequestParam(value = "siren", required = false) String siren,
            @RequestParam(value = "nom", required = false) String nom,
            @RequestParam(value = "region", required = false) String region,
            @RequestParam(value = "departement", required = false) String departement,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "3") int size) {

        Sort sort = Sort.by(Sort.Direction.ASC, "codePostal");
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<PointAccueilReponseDTO> paLpas = etablissementService.findPointAccueils(siren, nom, region, departement, pageable);
        return ResponseEntity.ok(paLpas);
    }

    // OC
    @GetMapping("/"+WebConstants.OC_PREFIX_URL+"/"+WebConstants.POINT_ACCUEIL_NAME_URL+"/regions")
    public ResponseEntity<List<String>> getRegions(@RequestParam(value = "siren") String siren) {
        List<String> regions = etablissementService.getPointAccueilRegion(siren);
        return ResponseEntity.ok(regions);
    }

    // OC
    @GetMapping("/"+WebConstants.OC_PREFIX_URL+"/"+WebConstants.POINT_ACCUEIL_NAME_URL+"/departements")
    public ResponseEntity<List<String>> getDepartements(@RequestParam(value = "siren") String siren, @RequestParam(value = "region", required = false) String region) {
        List<String> departements = etablissementService.getPointAccueilDepartement(siren, region);
        return ResponseEntity.ok(departements);
    }

    // OC
    @PostMapping("/"+WebConstants.OC_PREFIX_URL+"/"+WebConstants.POINT_ACCUEIL_NAME_URL+"/create")
    public ResponseEntity<PointAccueilReponseDTO> createPointAccueil(@Valid @RequestBody PointAccueilToCreateDTO pointAccueilDTO,
                                                                     @Parameter(hidden = true) @SessionAttribute(name = MembreSessionManager.MEMBRE_SESSION_KEY) MembreSessionDTO userSession) {
        MembreInfoDTO membre = membreService.getMembreByEmail(userSession.getEmail());
        //System.out.println(membre);
        pointAccueilDTO.setLocSiren(membre.getSiren());
        //System.out.println(membre.getSiren());
        PointAccueilReponseDTO pointAccueilEntity = etablissementService.createPointAccueil(userSession, pointAccueilDTO);
        return new ResponseEntity<>(pointAccueilEntity, HttpStatus.CREATED);
    }

    // OC
    @DeleteMapping("/"+WebConstants.OC_PREFIX_URL+"/"+WebConstants.POINT_ACCUEIL_NAME_URL+"/{id}")
    public ResponseEntity<Void> deletePointAccueil(@PathVariable("id") String id,
                                                   @Parameter(hidden = true) @SessionAttribute(name = MembreSessionManager.MEMBRE_SESSION_KEY) MembreSessionDTO userSession) {
        etablissementService.deletePointAccueil(userSession, Long.parseLong(id));
        return ResponseEntity.noContent().build();
    }

    // OC
    @PutMapping("/"+WebConstants.OC_PREFIX_URL+"/"+WebConstants.POINT_ACCUEIL_NAME_URL+"/update")
    public ResponseEntity<String> updatePointAccueilInfo(@Valid @RequestBody PointAccueilReponseDTO pointAccueil,
                                                         @Parameter(hidden = true) @SessionAttribute(name = MembreSessionManager.MEMBRE_SESSION_KEY) MembreSessionDTO userSession) {
        etablissementService.updatePointAccueilById(userSession, pointAccueil);
        return ResponseEntity.ok("Le point d'accueil est mis à jour");
    }
}
