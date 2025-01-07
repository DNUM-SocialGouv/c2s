package fr.gouv.sante.c2s.service.history;

import fr.gouv.sante.c2s.model.ActionTypeEnum;
import fr.gouv.sante.c2s.model.SectionEnum;
import fr.gouv.sante.c2s.model.dto.PointAccueilReponseDTO;
import fr.gouv.sante.c2s.model.dto.session.MembreSessionDTO;
import fr.gouv.sante.c2s.model.entity.EtablissementEntity;
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
public class HistoryEtablissementService implements IHistoryService<PointAccueilReponseDTO, EtablissementEntity> {

    @Autowired
    HistoryOperationRepository historyOperationRepository;

    @Override
    public void saveCreateObjectOperation(MembreSessionDTO membre, EtablissementEntity etablissement) {
        saveEtablissementOperation(membre, etablissement, null);
    }

    @Override
    public void saveModifyObjectOperation(MembreSessionDTO membre, EtablissementEntity previous, PointAccueilReponseDTO next) {
        saveEtablissementOperation(membre, previous, next);
    }

    @Override
    public void saveDeleteObjectOperation(MembreSessionDTO membre, PointAccueilReponseDTO dto) {
        HistoricOperationEntity historicOperation = new HistoricOperationEntity();
        historicOperation.setMembreId(membre.getId());
        historicOperation.setActionType(ActionTypeEnum.SUPPRESSION);
        historicOperation.setOperationDate(new Date());
        historicOperation.setSection(SectionEnum.MES_ETABLISSEMENTS);
        historicOperation.setGroupe(membre.getGroupe());
        historicOperation.setActionLabel("Suppression du point d'accueil : "+dto.getNom()+" ("+dto.getCodePostal()+")");
        historicOperation.setMembreInformations(membre.getPrenom() + " " + membre.getNom());
        historyOperationRepository.save(historicOperation);
    }

    @Override
    public void saveStatusObjectChangeOperation(MembreSessionDTO membre, PointAccueilReponseDTO pointAccueil, String previous, String next) {
        HistoricOperationEntity historicOperation = new HistoricOperationEntity();
        historicOperation.setMembreId(membre.getId());
        historicOperation.setActionType(ActionTypeEnum.STATUS);
        historicOperation.setOperationDate(new Date());
        historicOperation.setSection(SectionEnum.MES_ETABLISSEMENTS);
        historicOperation.setGroupe(membre.getGroupe());
        historicOperation.setActionLabel("Modification du point d'accueil : "+pointAccueil.getNom()+"("+pointAccueil.getCodePostal()+") : "+previous+" => "+next);
        historicOperation.setMembreInformations(membre.getPrenom() + " " + membre.getNom());
        historyOperationRepository.save(historicOperation);
    }

    private void saveEtablissementOperation(MembreSessionDTO membre, EtablissementEntity previous, PointAccueilReponseDTO next) {
        HistoricOperationEntity historicOperation = new HistoricOperationEntity();
        historicOperation.setMembreId(membre.getId());
        historicOperation.setSection(SectionEnum.MES_ETABLISSEMENTS);
        historicOperation.setGroupe(membre.getGroupe());
        historicOperation.setOperationDate(new Date());
        if (next == null) {
            historicOperation.setActionType(ActionTypeEnum.CREATION);
            historicOperation.setActionLabel("Création du point d'accueil : "+previous.getNom()+" ("+previous.getCodePostal()+")");
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
        historicOperation.setSection(section);
        historicOperation.setGroupe(membre.getGroupe());
        historicOperation.setOperationDate(new Date());
        historicOperation.setActionType(ActionTypeEnum.OTHER);
        historicOperation.setActionLabel(specificOperation);
        historicOperation.setMembreInformations(membre.getPrenom() + " " + membre.getNom());
        historyOperationRepository.save(historicOperation);
    }

    @Override
    public String compileObjectModifications(EtablissementEntity previous, PointAccueilReponseDTO next) {
        HistoricModificationHelper helper = new HistoricModificationHelper();
        helper.checkField("nom", previous.getNom(), next.getNom());
        helper.checkField("adresse1", previous.getAdresse1(), next.getAdresse());
        helper.checkField("adresse2", previous.getAdresse2(), next.getAdresse2());
        helper.checkField("adresse3", previous.getAdresse3(), next.getAdresse3());
        helper.checkField("telephone", previous.getTelephone(), next.getTelephone());
        helper.checkField("codePostal", previous.getCodePostal(), next.getCodePostal());
        helper.checkField("cedex", previous.getCedex(), next.getCedex());
        helper.checkField("telephone", previous.getVille(), next.getVille());
        helper.checkField("email", previous.getEmail(), next.getEmail());
        helper.checkField("ville", previous.getVille(), next.getVille());
        return helper.getResult();
    }
}
