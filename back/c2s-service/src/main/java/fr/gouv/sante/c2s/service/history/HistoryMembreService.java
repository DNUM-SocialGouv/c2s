package fr.gouv.sante.c2s.service.history;

import fr.gouv.sante.c2s.model.ActionTypeEnum;
import fr.gouv.sante.c2s.model.SectionEnum;
import fr.gouv.sante.c2s.model.dto.membre.MembreInfoDTO;
import fr.gouv.sante.c2s.model.dto.session.MembreSessionDTO;
import fr.gouv.sante.c2s.model.entity.HistoricOperationEntity;
import fr.gouv.sante.c2s.model.entity.MembreEntity;
import fr.gouv.sante.c2s.model.helper.HistoricModificationHelper;
import fr.gouv.sante.c2s.model.service.IHistoryService;
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
public class HistoryMembreService implements IHistoryService<MembreInfoDTO, MembreEntity> {

    @Autowired
    HistoryOperationRepository historyOperationRepository;

    @Override
    public void saveCreateObjectOperation(MembreSessionDTO membre, MembreEntity membreCreated) {
        saveMembreOperation(membre, membreCreated, null);
    }

    @Override
    public void saveModifyObjectOperation(MembreSessionDTO membre, MembreEntity previous, MembreInfoDTO next) {
        saveMembreOperation(membre, previous, next);
    }

    @Override
    public void saveDeleteObjectOperation(MembreSessionDTO membre, MembreInfoDTO dto) {
        HistoricOperationEntity historicOperation = new HistoricOperationEntity();
        historicOperation.setMembreId(membre.getId());
        historicOperation.setActionType(ActionTypeEnum.SUPPRESSION);
        historicOperation.setOperationDate(new Date());
        historicOperation.setSection(SectionEnum.MON_EQUIPE);
        historicOperation.setGroupe(membre.getGroupe());
        historicOperation.setActionLabel("Suppression du membre : "+dto.getPrenom()+" "+dto.getNom());
        historicOperation.setMembreInformations(membre.getPrenom() + " " + membre.getNom());
        historyOperationRepository.save(historicOperation);
    }

    @Override
    public void saveStatusObjectChangeOperation(MembreSessionDTO membre, MembreInfoDTO membreInfoDTO, String previous, String next) {
        HistoricOperationEntity historicOperation = new HistoricOperationEntity();
        historicOperation.setMembreId(membre.getId());
        historicOperation.setActionType(ActionTypeEnum.STATUS);
        historicOperation.setOperationDate(new Date());
        historicOperation.setSection(SectionEnum.MON_EQUIPE);
        historicOperation.setGroupe(membre.getGroupe());
        historicOperation.setActionLabel("Modification des informations sur le membre : "+membreInfoDTO.getPrenom()+" "+membreInfoDTO.getNom()+" ("+membreInfoDTO.getEmail()+") : "+previous+" => "+next);
        historicOperation.setMembreInformations(membre.getPrenom() + " " + membre.getNom());
        historyOperationRepository.save(historicOperation);
    }

    private void saveMembreOperation(MembreSessionDTO membre, MembreEntity previous, MembreInfoDTO next) {
        HistoricOperationEntity historicOperation = new HistoricOperationEntity();
        historicOperation.setMembreId(membre.getId());
        historicOperation.setSection(SectionEnum.MON_EQUIPE);
        historicOperation.setGroupe(membre.getGroupe());
        historicOperation.setOperationDate(new Date());
        if (previous == null) {
            historicOperation.setActionType(ActionTypeEnum.CREATION);
            historicOperation.setActionLabel("Création du membre : "+next.getNom()+" "+next.getPrenom());
        } else {
            historicOperation.setActionType(ActionTypeEnum.MODIFICATION);
            historicOperation.setActionLabel(compileObjectModifications(previous, next));
        }
        historicOperation.setMembreInformations(membre.getPrenom() + " " + membre.getNom());
        if (historicOperation.getActionLabel()!=null) {
            historyOperationRepository.save(historicOperation);
        }
    }

    @Override
    public String compileObjectModifications(MembreEntity previous, MembreInfoDTO next) {
        HistoricModificationHelper helper = new HistoricModificationHelper();
        helper.checkField("nom", previous.getNom(), next.getNom());
        helper.checkField("prenom", previous.getPrenom(), next.getPrenom());
        helper.checkField("telephone", previous.getTelephone(), next.getTelephone());
        return helper.getResult();
    }

    @Override
    public void saveSpecificObjectOperation(SectionEnum section, MembreSessionDTO membre, String specificOperation) {
        HistoricOperationEntity historicOperation = new HistoricOperationEntity();
        historicOperation.setMembreId(membre.getId());
        historicOperation.setSection(section);
        historicOperation.setOperationDate(new Date());
        historicOperation.setGroupe(membre.getGroupe());
        historicOperation.setMembreInformations(membre.getPrenom() + " " + membre.getNom());
        historicOperation.setActionType(ActionTypeEnum.OTHER);
        historicOperation.setActionLabel(specificOperation);
        historyOperationRepository.save(historicOperation);
    }
}
