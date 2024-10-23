package fr.gouv.sante.c2s.service.moderateur;

import fr.gouv.sante.c2s.model.GroupeEnum;
import fr.gouv.sante.c2s.model.dto.MessageAccueilDTO;
import fr.gouv.sante.c2s.model.dto.session.MembreSessionDTO;
import fr.gouv.sante.c2s.model.entity.MessageAccueilEntity;
import fr.gouv.sante.c2s.repository.MessageAccueilRepository;
import fr.gouv.sante.c2s.repository.mapper.Mapper;
import fr.gouv.sante.c2s.service.history.moderateur.SilentHistoryModerateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ModerateurMessageAccueilService {

    MessageAccueilRepository messageAccueilRepository;
    SilentHistoryModerateurService silentHistoryModerateurService;
    Mapper mapper;

    @Autowired
    public ModerateurMessageAccueilService(MessageAccueilRepository messageAccueilRepository, SilentHistoryModerateurService silentHistoryModerateurService, Mapper mapper) {
        this.messageAccueilRepository = messageAccueilRepository;
        this.silentHistoryModerateurService = silentHistoryModerateurService;
        this.mapper = mapper;
    }

    public List<MessageAccueilDTO> getMessagesAccueil() {
        return messageAccueilRepository.findLasts().stream().map(mapper::mapMessageAccueilToDto).collect(Collectors.toList());
    }

    public MessageAccueilDTO getLastMessageAccueilByGroupe(GroupeEnum groupe) {
        return mapper.mapMessageAccueilToDto(messageAccueilRepository.findLastByGroupeOrderByDateCreaDesc(groupe));
    }

    public MessageAccueilDTO addMessage(MembreSessionDTO membre, String contenu, GroupeEnum groupe) {
        MessageAccueilEntity entity = new MessageAccueilEntity();
        entity.setContenu(contenu);
        entity.setGroupe(groupe);
        entity = messageAccueilRepository.save(entity);
        if (groupe == GroupeEnum.ORGANISME_COMPLEMENTAIRE) {
            silentHistoryModerateurService.saveModificationMessageOC(membre);
        } else if (groupe == GroupeEnum.CAISSE) {
            silentHistoryModerateurService.saveModificationMessageCaisse(membre);
        }
        return mapper.mapMessageAccueilToDto(entity);
    }

}

