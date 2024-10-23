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
public class HistoryModerateurEntrepriseService {

    @Autowired
    HistoryOperationRepository historyOperationRepository;

    public void saveAjoutEntreprise(MembreSessionDTO membre, String entrepriseTarget) {
        HistoricOperationEntity historicOperation = new HistoricOperationEntity();
        historicOperation.setMembreId(membre.getId());
        historicOperation.setActionType(ActionTypeEnum.CREATION);
        historicOperation.setOperationDate(new Date());
        historicOperation.setSection(SectionEnum.MODERATION_ETABLISSEMENTS);
        historicOperation.setGroupe(membre.getGroupe());
        historicOperation.setActionLabel("Ajout de l'OC ["+entrepriseTarget+"]");
        historicOperation.setMembreInformations(membre.getPrenom() + " " + membre.getNom());
        historyOperationRepository.save(historicOperation);
    }

    public void saveSuppressionEntreprise(MembreSessionDTO membre, String entrepriseTarget) {
        HistoricOperationEntity historicOperation = new HistoricOperationEntity();
        historicOperation.setMembreId(membre.getId());
        historicOperation.setActionType(ActionTypeEnum.SUPPRESSION);
        historicOperation.setOperationDate(new Date());
        historicOperation.setSection(SectionEnum.MODERATION_ETABLISSEMENTS);
        historicOperation.setGroupe(membre.getGroupe());
        historicOperation.setActionLabel("Suppression de l'OC ["+entrepriseTarget+"]");
        historicOperation.setMembreInformations(membre.getPrenom() + " " + membre.getNom());
        historyOperationRepository.save(historicOperation);
    }

    public void saveModificationEntreprise(MembreSessionDTO membre, String entrepriseTarget) {
        HistoricOperationEntity historicOperation = new HistoricOperationEntity();
        historicOperation.setMembreId(membre.getId());
        historicOperation.setActionType(ActionTypeEnum.MODIFICATION);
        historicOperation.setOperationDate(new Date());
        historicOperation.setSection(SectionEnum.MODERATION_ETABLISSEMENTS);
        historicOperation.setGroupe(membre.getGroupe());
        historicOperation.setActionLabel("Modification de l'OC ["+entrepriseTarget+"]");
        historicOperation.setMembreInformations(membre.getPrenom() + " " + membre.getNom());
        historyOperationRepository.save(historicOperation);
    }

}