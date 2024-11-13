package fr.gouv.sante.c2s.service.moderateur.moderateurs.uow;

import fr.gouv.sante.c2s.model.dto.membre.moderateur.ModerateurDTO;
import fr.gouv.sante.c2s.model.dto.session.MembreSessionDTO;
import fr.gouv.sante.c2s.service.moderateur.moderateurs.uow.command.IModerateurCommand;
import fr.gouv.sante.c2s.service.moderateur.moderateurs.uow.command.ModerateurCommandException;

import java.util.List;

public class ModeratorUnitOfWork {

    private final List<IModerateurCommand> commands = new java.util.ArrayList<>();

    public void addCommand(IModerateurCommand command) {
        this.commands.add(command);
    }

    public ModerateurDTO execute(ModerateurDTO moderateurDTO, MembreSessionDTO membreSessionDTO) throws ModerateurCommandException {

        try {
            for (IModerateurCommand command : commands) {
                moderateurDTO = command.execute(moderateurDTO, membreSessionDTO);
            }
            return moderateurDTO;

        } catch (Exception e) {
            for (IModerateurCommand command : commands) {
                command.rollback(moderateurDTO);
            }
            if (e instanceof ModerateurCommandException) {
                throw e;
            } else
                throw new ModerateurCommandException("L'opération a échoué : "+e.getMessage());
        }
    }
}
