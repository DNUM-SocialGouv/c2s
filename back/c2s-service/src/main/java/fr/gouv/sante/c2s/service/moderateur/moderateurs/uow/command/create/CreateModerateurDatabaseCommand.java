package fr.gouv.sante.c2s.service.moderateur.moderateurs.uow.command.create;

import fr.gouv.sante.c2s.model.StatutMembreEnum;
import fr.gouv.sante.c2s.model.dto.membre.moderateur.ModerateurDTO;
import fr.gouv.sante.c2s.model.dto.session.MembreSessionDTO;
import fr.gouv.sante.c2s.model.entity.MembreEntity;
import fr.gouv.sante.c2s.repository.MembreRepository;
import fr.gouv.sante.c2s.repository.mapper.Mapper;
import fr.gouv.sante.c2s.service.moderateur.moderateurs.uow.command.AbstractModerateurCommand;
import fr.gouv.sante.c2s.service.moderateur.moderateurs.uow.command.IModerateurCommand;
import fr.gouv.sante.c2s.service.moderateur.moderateurs.uow.command.ModerateurCommandException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
public class CreateModerateurDatabaseCommand extends AbstractModerateurCommand implements IModerateurCommand {

    private MembreRepository membreRepository;
    private Mapper mapper;

    public CreateModerateurDatabaseCommand(MembreRepository membreRepository, Mapper mapper) {
        this.membreRepository = membreRepository;
        this.mapper = mapper;
    }

    @Override
    public ModerateurDTO executeWrapped(ModerateurDTO moderateurDTO, MembreSessionDTO membreSessionDTO) throws ModerateurCommandException {
        List<MembreEntity> list = membreRepository.findMembreByEmail(moderateurDTO.getEmail());
        if (list!=null && !list.isEmpty()) {
            throw new ModerateurCommandException("email", "Cet email est déjà référencé ["+list.get(0).getStatut()+", "+list.get(0).getGroupe()+"]");
        }
        MembreEntity membre = mapper.mapMembreToModerateurEntity(moderateurDTO);
        membre.setStatut(StatutMembreEnum.ACTIF);
        membre.setCreateur(membreSessionDTO.getNom()+" "+membreSessionDTO.getPrenom());
        membre = membreRepository.save(membre);
        return mapper.mapMembreToModerateurDto(membre);
    }

    @Override
    protected String getExceptionMessage() {
        return "enregistrement en base de données";
    }

    @Override
    protected void rollbackWrapped(ModerateurDTO moderateurDTO) {
        List<MembreEntity> membres = membreRepository.findMembreByEmail(moderateurDTO.getEmail());
        if (membres != null && !membres.isEmpty()) {
            MembreEntity membre = membres.get(0);
            membreRepository.delete(membre);
        }
    }
}
