package fr.gouv.sante.c2s.web.controller.moderateur;

import fr.gouv.sante.c2s.model.GroupeEnum;
import fr.gouv.sante.c2s.model.StatutMembreEnum;
import fr.gouv.sante.c2s.model.dto.MessageAccueilDTO;
import fr.gouv.sante.c2s.model.dto.session.MembreSessionDTO;
import fr.gouv.sante.c2s.service.moderateur.ModerateurMessageAccueilService;
import fr.gouv.sante.c2s.web.WebConstants;
import fr.gouv.sante.c2s.web.controller.BaseController;
import fr.gouv.sante.c2s.web.model.form.MessageAccueilFormDTO;
import fr.gouv.sante.c2s.web.session.MembreSessionManager;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "[Modérateur] Message d'accueil",  description = "Gestion des 2 messages d'accueil à destination des groupes OC et Caisse ")
@RestController
@RequestMapping("/"+ WebConstants.MODERATEUR_PREFIX_URL+"/"+WebConstants.MESSAGE_ACCUEIL_NAME_URL)
public class ModerateurMessageAccueilController extends BaseController {

    @Autowired
    ModerateurMessageAccueilService moderateurMessageAccueilService;

    @GetMapping
    public List<MessageAccueilDTO> getMessagesAccueil() {
        return moderateurMessageAccueilService.getMessagesAccueil();
    }

    @GetMapping("/{groupe}")
    public MessageAccueilDTO getMessageAccueilByGroupe(@PathVariable("groupe") GroupeEnum groupe) {
        return moderateurMessageAccueilService.getLastMessageAccueilByGroupe(groupe);
    }

    @PostMapping
    public ResponseEntity<MessageAccueilDTO> addMessage(@Parameter(hidden = true) @SessionAttribute(MembreSessionManager.MEMBRE_SESSION_KEY) MembreSessionDTO membreSession,
                                                        @Valid @RequestBody MessageAccueilFormDTO form) {
        return ResponseEntity.ok(moderateurMessageAccueilService.addMessage(membreSession, form.getContenu(), form.getGroupe()));
    }

}