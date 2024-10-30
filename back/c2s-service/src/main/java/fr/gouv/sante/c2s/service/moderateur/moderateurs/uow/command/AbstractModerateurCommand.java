package fr.gouv.sante.c2s.service.moderateur.moderateurs.uow.command;

import fr.gouv.sante.c2s.model.dto.membre.moderateur.ModerateurDTO;
import fr.gouv.sante.c2s.model.dto.session.MembreSessionDTO;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public abstract class AbstractModerateurCommand implements IModerateurCommand {

    abstract protected ModerateurDTO executeWrapped(ModerateurDTO moderateurDTO, MembreSessionDTO membreSessionDTO);
    abstract protected void rollbackWrapped(ModerateurDTO dto);

    abstract protected String getExceptionMessage();

    @Override
    public ModerateurDTO execute(ModerateurDTO moderateurDTO, MembreSessionDTO membreSessionDTO) throws ModerateurCommandException {
        try {
            return executeWrapped(moderateurDTO, membreSessionDTO);
        } catch (ModerateurCommandException mce) {
            throw mce;
        } catch (Exception e) {
            throw new ModerateurCommandException("cause : "+getExceptionMessage()+", détails : {"+e.getMessage()+"}");
        }
    }

    @Override
    public void rollback(ModerateurDTO moderateurDTO) {
        try {
            rollbackWrapped(moderateurDTO);
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new ModerateurCommandException("Le rollback a également échoué : voir avec dev backend ou connectivité db/keycloak");
        }
    }
}
