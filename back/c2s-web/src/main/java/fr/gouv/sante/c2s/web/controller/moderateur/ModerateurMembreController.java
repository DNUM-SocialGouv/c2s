package fr.gouv.sante.c2s.web.controller.moderateur;

import fr.gouv.sante.c2s.model.GroupeEnum;
import fr.gouv.sante.c2s.model.StatutMembreEnum;
import fr.gouv.sante.c2s.model.dto.MembreAndPartenaireDTO;
import fr.gouv.sante.c2s.model.dto.session.MembreSessionDTO;
import fr.gouv.sante.c2s.service.moderateur.ModerateurMembreService;
import fr.gouv.sante.c2s.web.WebConstants;
import fr.gouv.sante.c2s.web.application.ApplicationContextWrapper;
import fr.gouv.sante.c2s.web.controller.BaseController;
import fr.gouv.sante.c2s.web.model.form.ChangeStatutFormDTO;
import fr.gouv.sante.c2s.web.model.response.ModerateurMembreHomeDTO;
import fr.gouv.sante.c2s.web.model.response.PageableCountDTO;
import fr.gouv.sante.c2s.web.session.MembreSessionManager;
import io.swagger.v3.oas.annotations.Hidden;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "[Modérateur] Membres", description = "Contient tous les endpoints nécessaires à l'écran de modération des membres")
@RestController
@RequestMapping("/"+ WebConstants.MODERATEUR_PREFIX_URL+"/"+WebConstants.MEMBRE_NAME_URL)
public class ModerateurMembreController extends BaseController {

    @Value("${reset.url}")
    private String resetUrl;

    @Autowired
    ModerateurMembreService membreService;

    @Autowired
    private ApplicationContextWrapper applicationContextWrapper;

    @Operation(description = "Recherche des membres via 3 filtres optionnels.\nRenvoie une liste paginée et le nombre d'éléments au total.")
    @Parameter(name = "page", description = "Numéro de la page demandée (0 .. n)")
    @Parameter(name = "size", description = "Nombre de lignes demandées")
    @GetMapping
    public ResponseEntity<PageableCountDTO<MembreAndPartenaireDTO>> getMembres(@RequestParam(name = "statut", required = false) StatutMembreEnum statut,
                                                       @RequestParam(value = "groupe", required = false) GroupeEnum groupe,
                                                       @RequestParam(value = "search", required = false) String search,
                                                       @Parameter(hidden = true) @PageableDefault(page = 0, size = 20, sort = "id") Pageable pageable) {
        if (search!=null) {
            search = search.replaceAll(";", "");
            search = "%" + search + "%";
        }
        pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by("id").ascending());
        PageableCountDTO<MembreAndPartenaireDTO> pc = new PageableCountDTO<>();
        pc.setList(membreService.searchPartenaire(statut, groupe, search, pageable));
        pc.setCount(membreService.countPartenaire(statut, groupe, search));
        return ResponseEntity.ok(pc);
    }

    @Operation(description = "Endpoint utilitaire pour récupérer diverses infos nécessaires à la page de modération des membres :\n" +
            "- statuts : tous les statuts (id / libellé)\n" +
            "- groupes : tous les types d'organisations (clé / libellé)\n" +
            "- count : compte des partenaires")
    @GetMapping("/home")
    public ResponseEntity<ModerateurMembreHomeDTO> getModerateurMembreHome() {
        ModerateurMembreHomeDTO home = new ModerateurMembreHomeDTO();
        home.setMembreCount(membreService.countAllPartenaire());
        home.setGroupes(getGroupesAsPartenaires());
        return ResponseEntity.ok(home);
    }

    @Operation(description = "Permets au rôle modérateur de changer le statut d'un membre :\n- email : email du membre\n- statutId : ID du nouveau statut")
    @PostMapping("/statut")
    public ResponseEntity<Boolean> setStatut(@Parameter(hidden = true) @SessionAttribute(name = MembreSessionManager.MEMBRE_SESSION_KEY) MembreSessionDTO userSession,
                                             @RequestBody @Valid ChangeStatutFormDTO statutForm) {
        String token = applicationContextWrapper.createToken(statutForm.getEmail());
        Boolean result = membreService.changeStatut(userSession, statutForm.getEmail(), statutForm.getStatut(), token, resetUrl);
        return ResponseEntity.ok(result);
    }

}
