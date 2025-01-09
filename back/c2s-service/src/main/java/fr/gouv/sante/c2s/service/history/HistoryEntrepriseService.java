package fr.gouv.sante.c2s.service.history;

import fr.gouv.sante.c2s.model.ActionTypeEnum;
import fr.gouv.sante.c2s.model.GroupeEnum;
import fr.gouv.sante.c2s.model.SectionEnum;
import fr.gouv.sante.c2s.model.dto.EntrepriseDTO;
import fr.gouv.sante.c2s.model.dto.session.MembreSessionDTO;
import fr.gouv.sante.c2s.model.entity.EntrepriseEntity;
import fr.gouv.sante.c2s.model.entity.HistoricOperationEntity;
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
public class HistoryEntrepriseService implements IHistoryService<EntrepriseDTO, EntrepriseEntity> {

    @Autowired
    HistoryOperationRepository historyOperationRepository;

    @Override
    public void saveCreateObjectOperation(MembreSessionDTO membre, EntrepriseEntity entreprise) {
        saveEntrepriseOperation(membre, entreprise, null);
    }

    @Override
    public void saveModifyObjectOperation(MembreSessionDTO membre, EntrepriseEntity previous, EntrepriseDTO next) {
        saveEntrepriseOperation(membre, previous, next);
    }

    @Override
    public void saveDeleteObjectOperation(MembreSessionDTO membre, EntrepriseDTO dto) {
        HistoricOperationEntity historicOperation = new HistoricOperationEntity();
        historicOperation.setMembreId(membre.getId());
        historicOperation.setActionType(ActionTypeEnum.SUPPRESSION);
        historicOperation.setOperationDate(new Date());
        historicOperation.setSection(SectionEnum.MES_ETABLISSEMENTS);
        historicOperation.setGroupe(membre.getGroupe());
        if (dto.getGroupe().equals(GroupeEnum.ORGANISME_COMPLEMENTAIRE.name())) {
            historicOperation.setActionLabel("Suppression de l'organisme : " + dto.getNom());
        } else if (dto.getGroupe().equals(GroupeEnum.CAISSE.name())) {
            historicOperation.setActionLabel("Suppression de la caisse : " + dto.getNom());
        }
        historicOperation.setMembreInformations(membre.getPrenom() + " " + membre.getNom());
        historyOperationRepository.save(historicOperation);
    }

    @Override
    public void saveStatusObjectChangeOperation(MembreSessionDTO membre, EntrepriseDTO entrepriseDTO, String previous, String next) {
        HistoricOperationEntity historicOperation = new HistoricOperationEntity();
        historicOperation.setMembreId(membre.getId());
        historicOperation.setActionType(ActionTypeEnum.STATUS);
        historicOperation.setOperationDate(new Date());
        historicOperation.setSection(SectionEnum.MES_ETABLISSEMENTS);
        historicOperation.setGroupe(membre.getGroupe());
        if (entrepriseDTO.getGroupe().equals(GroupeEnum.ORGANISME_COMPLEMENTAIRE.name())) {
            historicOperation.setActionLabel("Changement d'état sur l'organisme : " + entrepriseDTO.getNom() + " : " + previous + " => " + next);
        } else if (entrepriseDTO.getGroupe().equals(GroupeEnum.CAISSE.name())) {
            historicOperation.setActionLabel("Changement d'état sur la caisse : " + entrepriseDTO.getNom() + " : " + previous + " => " + next);
        }
        historicOperation.setMembreInformations(membre.getPrenom() + " " + membre.getNom());
        historyOperationRepository.save(historicOperation);
    }

    private void saveEntrepriseOperation(MembreSessionDTO membre, EntrepriseEntity previous, EntrepriseDTO next) {
        HistoricOperationEntity historicOperation = new HistoricOperationEntity();
        historicOperation.setMembreId(membre.getId());
        historicOperation.setSection(SectionEnum.MES_ETABLISSEMENTS);
        historicOperation.setGroupe(membre.getGroupe());
        historicOperation.setOperationDate(new Date());
        if (next == null) {
            historicOperation.setActionType(ActionTypeEnum.CREATION);
            if (previous.getGroupe().equals(GroupeEnum.ORGANISME_COMPLEMENTAIRE.name())) {
                historicOperation.setActionLabel("Création de l'organisme : " + previous.getNom());
            } else if (previous.getGroupe().equals(GroupeEnum.CAISSE.name())) {
                historicOperation.setActionLabel("Création de la caisse : " + previous.getNom());
            }
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
    public void saveSpecificObjectOperation(SectionEnum section, MembreSessionDTO membre, String specificOperation) {
        HistoricOperationEntity historicOperation = new HistoricOperationEntity();
        historicOperation.setMembreId(membre.getId());
        historicOperation.setOperationDate(new Date());
        historicOperation.setActionType(ActionTypeEnum.OTHER);
        historicOperation.setGroupe(membre.getGroupe());
        historicOperation.setActionLabel(specificOperation);
        historicOperation.setSection(section);
        historicOperation.setMembreInformations(membre.getPrenom() + " " + membre.getNom());
        historyOperationRepository.save(historicOperation);
    }

    @Override
    public String compileObjectModifications(EntrepriseEntity previous, EntrepriseDTO next) {
        HistoricModificationHelper helper = new HistoricModificationHelper();
        helper.checkField("adresse", previous.getAdresse(), next.getAdresse());
        helper.checkField("code postal", previous.getCodePostal(), next.getCodePostal());
        helper.checkField("ville", previous.getVille(), next.getVille());
        helper.checkField("nom", previous.getNom(), next.getNom());
        //helper.checkField("siren", previous.getSiren(), next.getSiren());
        helper.checkField("email", previous.getEmail(), next.getEmailEntreprise());
        helper.checkField("telephone", previous.getTelephone(), next.getTelephone());
        helper.checkField("site web", previous.getSiteWeb(), next.getSiteWeb());
        helper.checkField("isPointAccueil", previous.getEtablissementId()!=null, next.getPointAccueil());
        return helper.getResult();
    }

}
