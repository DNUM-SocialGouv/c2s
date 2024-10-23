package fr.gouv.sante.c2s.service.history.moderateur;

import fr.gouv.sante.c2s.model.ActionTypeEnum;
import fr.gouv.sante.c2s.model.SectionEnum;
import fr.gouv.sante.c2s.model.dto.session.MembreSessionDTO;
import fr.gouv.sante.c2s.model.entity.HistoricOperationEntity;
import fr.gouv.sante.c2s.repository.HistoryOperationRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Slf4j
@Service
@Transactional(propagation = Propagation.REQUIRES_NEW)
public class HistoryModerateurMembreService {

    @Autowired
    HistoryOperationRepository historyOperationRepository;

    public void saveMembreChangeStatut(MembreSessionDTO membre, String nomPrenomTarget, String entrepriseTarget, String ancienStatut, String nouveauStatut) {
        HistoricOperationEntity historicOperation = new HistoricOperationEntity();
        historicOperation.setMembreId(membre.getId());
        historicOperation.setActionType(ActionTypeEnum.STATUS);
        historicOperation.setOperationDate(new Date());
        historicOperation.setSection(SectionEnum.MODERATION_UTILISATEURS);
        historicOperation.setGroupe(membre.getGroupe());
        historicOperation.setActionLabel("Changement de statut du membre ["+nomPrenomTarget+"] : "+ancienStatut+" -> "+nouveauStatut+" ("+entrepriseTarget+")");
        historicOperation.setMembreInformations(membre.getPrenom() + " " + membre.getNom());
        historyOperationRepository.save(historicOperation);
    }

}