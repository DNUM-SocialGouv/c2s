package fr.gouv.sante.c2s.service.moderateur.moderateurs.uow.command;

import fr.gouv.sante.c2s.model.dto.membre.moderateur.ModerateurDTO;
import fr.gouv.sante.c2s.model.dto.session.MembreSessionDTO;

public interface IModerateurCommand {

    ModerateurDTO execute(ModerateurDTO moderateurDTO, MembreSessionDTO membreSessionDTO) throws ModerateurCommandException;

    void rollback(ModerateurDTO moderateurDTO);

}
