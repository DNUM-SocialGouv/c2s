package fr.gouv.sante.c2s.service.moderateur.moderateurs.uow.command.update;

import fr.gouv.sante.c2s.keycloak.KeycloakMonoRealmService;
import fr.gouv.sante.c2s.model.dto.membre.moderateur.ModerateurDTO;
import fr.gouv.sante.c2s.model.dto.session.MembreSessionDTO;
import fr.gouv.sante.c2s.service.moderateur.moderateurs.uow.command.AbstractModerateurCommand;
import fr.gouv.sante.c2s.service.moderateur.moderateurs.uow.command.IModerateurCommand;
import fr.gouv.sante.c2s.service.moderateur.moderateurs.uow.command.ModerateurCommandException;
import org.springframework.stereotype.Component;

@Component
public class UpdateModerateurKeycloakCommand extends AbstractModerateurCommand implements IModerateurCommand {

    private KeycloakMonoRealmService keycloakMonoRealmService;

    public UpdateModerateurKeycloakCommand(KeycloakMonoRealmService keycloakMonoRealmService) {
        this.keycloakMonoRealmService = keycloakMonoRealmService;
    }

    @Override
    public ModerateurDTO executeWrapped(ModerateurDTO moderateurDTO, MembreSessionDTO membreSessionDTO) throws ModerateurCommandException {
        keycloakMonoRealmService.getAdminService().updateUser(moderateurDTO.getEmail(), moderateurDTO.getNom(), moderateurDTO.getPrenom());
        return moderateurDTO;
    }

    @Override
    protected String getExceptionMessage() {
        return "mise à jour sur Keycloak";
    }

    @Override
    protected void rollbackWrapped(ModerateurDTO dto) {
        // nothing
    }
}
