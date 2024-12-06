package fr.gouv.sante.c2s.service.moderateur.moderateurs.uow.command.create;

import fr.gouv.sante.c2s.keycloak.KeycloakMonoRealmService;
import fr.gouv.sante.c2s.model.GroupeEnum;
import fr.gouv.sante.c2s.model.dto.membre.moderateur.ModerateurDTO;
import fr.gouv.sante.c2s.model.dto.session.MembreSessionDTO;
import fr.gouv.sante.c2s.service.moderateur.moderateurs.uow.command.AbstractModerateurCommand;
import fr.gouv.sante.c2s.service.moderateur.moderateurs.uow.command.IModerateurCommand;
import fr.gouv.sante.c2s.service.moderateur.moderateurs.uow.command.ModerateurCommandException;
import org.springframework.stereotype.Component;

@Component
public class CreateModerateurKeycloakCommand extends AbstractModerateurCommand implements IModerateurCommand {

    private KeycloakMonoRealmService keycloakMonoRealmService;

    public CreateModerateurKeycloakCommand(KeycloakMonoRealmService keycloakMonoRealmService) {
        this.keycloakMonoRealmService = keycloakMonoRealmService;
    }

    @Override
    public ModerateurDTO executeWrapped(ModerateurDTO moderateurDTO, MembreSessionDTO membreSessionDTO) throws ModerateurCommandException {
        keycloakMonoRealmService.getAdminService().createUser(moderateurDTO.getEmail(), moderateurDTO.getNom(), moderateurDTO.getPrenom(), GroupeEnum.MODERATEUR);
        keycloakMonoRealmService.getAdminService().enableUser(moderateurDTO.getEmail());
        return moderateurDTO;
    }

    @Override
    protected String getExceptionMessage() {
        return "enregistrement sur Keycloak";
    }

    @Override
    protected void rollbackWrapped(ModerateurDTO moderateurDTO) {
        keycloakMonoRealmService.getAdminService().deleteUserByEmail(moderateurDTO.getEmail());
    }

}
