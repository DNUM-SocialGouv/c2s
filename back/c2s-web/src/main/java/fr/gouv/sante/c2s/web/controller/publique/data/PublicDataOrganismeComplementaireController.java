package fr.gouv.sante.c2s.web.controller.publique.data;

import fr.gouv.sante.c2s.model.EtatEnum;
import fr.gouv.sante.c2s.model.dto.OrganismeComplementairePublicDTO;
import fr.gouv.sante.c2s.model.dto.drupal.EtablissementDTO;
import fr.gouv.sante.c2s.service.partenaire.PartenaireService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@Tag(name = "[Public] Consommés par Drupal")
@RestController
@RequiredArgsConstructor
public class PublicDataOrganismeComplementaireController {

    @Autowired
    private PartenaireService partenaireService;

    @Operation(description = "Recherche multicritère sur les points d'accueil")
    @GetMapping("/public/search/points-accueil")
    public ResponseEntity<List<EtablissementDTO>> getOcInfo(
            @RequestParam(name = "departement", required = false) String departement,
            @RequestParam(name = "ville", required = false) String ville,
            @RequestParam(name = "region", required = false) String region,
            @RequestParam(name = "organisme", required = false) String organisme) {

        List<EtablissementDTO> etablissements = partenaireService.findEtablissementByCriteria(departement, ville, region, organisme, EtatEnum.ACTIF);
        return etablissements.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(etablissements);
    }

    @Operation(description = "Liste des organismes complémentaires")
    @GetMapping("/public/organismes-complementaires")
    public ResponseEntity<List<OrganismeComplementairePublicDTO>> getOcInfo() {
        List<OrganismeComplementairePublicDTO> partenaires = partenaireService.getOrganismeComplementairesActifsForDrupal();
        return partenaires.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(partenaires);
    }

}
