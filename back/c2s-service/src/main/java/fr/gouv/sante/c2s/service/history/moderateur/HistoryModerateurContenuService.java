package fr.gouv.sante.c2s.service.history.moderateur;

import fr.gouv.sante.c2s.model.ActionTypeEnum;
import fr.gouv.sante.c2s.model.SectionEnum;
import fr.gouv.sante.c2s.model.dto.session.MembreSessionDTO;
import fr.gouv.sante.c2s.model.entity.HistoricOperationEntity;
import fr.gouv.sante.c2s.repository.HistoryOperationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Service
@Transactional(propagation = Propagation.REQUIRES_NEW)
public class HistoryModerateurContenuService {

    @Autowired
    HistoryOperationRepository historyOperationRepository;

    public void saveModificationMessageOC(MembreSessionDTO membre) {
        HistoricOperationEntity historicOperation = new HistoricOperationEntity();
        historicOperation.setMembreId(membre.getId());
        historicOperation.setActionType(ActionTypeEnum.MODIFICATION);
        historicOperation.setOperationDate(new Date());
        historicOperation.setSection(SectionEnum.MODERATION_CONTENU);
        historicOperation.setGroupe(membre.getGroupe());
        historicOperation.setActionLabel("Modification du message d'accueil des OC");
        historicOperation.setMembreInformations(membre.getPrenom() + " " + membre.getNom());
        historyOperationRepository.save(historicOperation);
    }

    public void saveModificationMessageCaisse(MembreSessionDTO membre) {
        HistoricOperationEntity historicOperation = new HistoricOperationEntity();
        historicOperation.setMembreId(membre.getId());
        historicOperation.setActionType(ActionTypeEnum.MODIFICATION);
        historicOperation.setOperationDate(new Date());
        historicOperation.setSection(SectionEnum.MODERATION_CONTENU);
        historicOperation.setGroupe(membre.getGroupe());
        historicOperation.setActionLabel("Modification du message d'accueil des caisses");
        historicOperation.setMembreInformations(membre.getPrenom() + " " + membre.getNom());
        historyOperationRepository.save(historicOperation);
    }

}