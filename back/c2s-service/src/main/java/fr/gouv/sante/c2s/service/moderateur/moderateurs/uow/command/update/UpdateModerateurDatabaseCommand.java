package fr.gouv.sante.c2s.service.moderateur.moderateurs.uow.command.update;

import fr.gouv.sante.c2s.model.StatutMembreEnum;
import fr.gouv.sante.c2s.model.dto.membre.moderateur.ModerateurDTO;
import fr.gouv.sante.c2s.model.dto.session.MembreSessionDTO;
import fr.gouv.sante.c2s.model.entity.MembreEntity;
import fr.gouv.sante.c2s.repository.MembreRepository;
import fr.gouv.sante.c2s.repository.mapper.Mapper;
import fr.gouv.sante.c2s.service.moderateur.moderateurs.uow.command.AbstractModerateurCommand;
import fr.gouv.sante.c2s.service.moderateur.moderateurs.uow.command.IModerateurCommand;
import fr.gouv.sante.c2s.service.moderateur.moderateurs.uow.command.ModerateurCommandException;
import org.springframework.stereotype.Component;

@Component
public class UpdateModerateurDatabaseCommand extends AbstractModerateurCommand implements IModerateurCommand {

    private Mapper mapper;
    private MembreRepository membreRepository;

    public UpdateModerateurDatabaseCommand(Mapper mapper, MembreRepository membreRepository) {
        this.membreRepository = membreRepository;
        this.mapper = mapper;
    }

    @Override
    public ModerateurDTO executeWrapped(ModerateurDTO moderateurDTO, MembreSessionDTO membreSessionDTO) throws ModerateurCommandException {
        MembreEntity membre = mapper.mapMembreToModerateurEntity(moderateurDTO);
        membre.setStatut(StatutMembreEnum.ACTIF);
        return mapper.mapMembreToModerateurDto(membreRepository.save(membre));
    }

    @Override
    protected String getExceptionMessage() {
        return "mise à jour en base de données";
    }

    @Override
    protected void rollbackWrapped(ModerateurDTO dto) {
        // nothing
    }
}
