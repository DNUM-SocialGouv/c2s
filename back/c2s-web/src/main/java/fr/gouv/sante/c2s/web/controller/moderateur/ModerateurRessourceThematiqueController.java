package fr.gouv.sante.c2s.web.controller.moderateur;

import fr.gouv.sante.c2s.model.GroupeEnum;
import fr.gouv.sante.c2s.model.dto.resource.RessourceThematiqueDTO;
import fr.gouv.sante.c2s.service.moderateur.ModerateurRessourceService;
import fr.gouv.sante.c2s.web.WebConstants;
import fr.gouv.sante.c2s.web.controller.BaseController;
import fr.gouv.sante.c2s.web.model.form.ThematiqueFormDTO;
import fr.gouv.sante.c2s.web.model.response.ModerateurRessourceHomeDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

@Tag(name = "[Modérateur] Thématique des ressources", description = "get / getById / add / update / delete / setOrder / home")
@RestController
@RequestMapping("/"+ WebConstants.MODERATEUR_PREFIX_URL+"/"+WebConstants.THEMATIQUE_NAME_URL)
public class ModerateurRessourceThematiqueController extends BaseController {

    @Autowired
    ModerateurRessourceService moderateurRessourceService;

    @GetMapping
    public List<RessourceThematiqueDTO> getThematiques() {
        return moderateurRessourceService.getRessourceThematiques();
    }

    @GetMapping("/{id}")
    public RessourceThematiqueDTO getThematique(@PathVariable("id") Long id) {
        return moderateurRessourceService.getRessourceThematique(id);
    }

    @PostMapping
    public ResponseEntity<RessourceThematiqueDTO> addThematique(@Valid @RequestBody ThematiqueFormDTO form) {
        validate(form);
        RessourceThematiqueDTO dto = moderateurRessourceService.addThematique(form.getTitre(),
                                                                              form.getDescription(),
                                                                              Arrays.stream(form.getGroupes()).map(GroupeEnum::valueOf).collect(Collectors.toList()));
        return ResponseEntity.ok(dto);
    }

    @Operation(description = "Permets l'ordonnancement des thématiques.\n\n" +
            "Le endpoint ne contrôle pas la cohérence des positions.")
    @PostMapping("/order")
    public ResponseEntity<Boolean> setThematiqueOrder(@RequestBody @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "[[12, 0], [4, 1], [16, 2]]\n\n[[234, 1], [23, 2], [23, 4]]\n\n[[idThematiqueA, ordreThematiqueA],[idThematiqueB, ordreThematiqueB],[idThematiqueC, ordreThematiqueC]]", required = true) Long[][] allThematiqueIdWithOrder) {
        boolean done = moderateurRessourceService.updateRessourceThematiquesOrders(allThematiqueIdWithOrder);
        return ResponseEntity.ok(done);
    }

    @Operation(description = "Update d'une thématique.\n\nLe champs 'ordre' n'est pas obligatoire sur cette opération.")
    @PutMapping("/{id}")
    public ResponseEntity<RessourceThematiqueDTO> updateThematique(@PathVariable("id") Long id,  @Valid @RequestBody ThematiqueFormDTO form) {
        validate(form);
        RessourceThematiqueDTO dto = moderateurRessourceService.updateThematique(id, form.getTitre(), form.getDescription(), Arrays.stream(form.getGroupes()).map(GroupeEnum::valueOf).collect(Collectors.toList()), form.getOrdre());
        return ResponseEntity.ok(dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteThematique(@PathVariable("id") Long id) {
        boolean result = moderateurRessourceService.deleteThematique(id);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/home")
    public ResponseEntity<ModerateurRessourceHomeDTO> getHomeInformations() {
        List<RessourceThematiqueDTO> thematiques = moderateurRessourceService.getRessourceThematiques();
        ModerateurRessourceHomeDTO homeDTO = new ModerateurRessourceHomeDTO();
        homeDTO.setThematiques(thematiques);
        homeDTO.setCount(moderateurRessourceService.getFichierCount());
        homeDTO.setGroupes(getTrioGroupes());
        return ResponseEntity.ok(homeDTO);
    }
}
