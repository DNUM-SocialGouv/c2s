package fr.gouv.sante.c2s.service.history;

import fr.gouv.sante.c2s.model.SectionEnum;
import fr.gouv.sante.c2s.model.dto.session.MembreSessionDTO;
import fr.gouv.sante.c2s.model.service.IHistoryService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@Transactional
public class SilentHistoryServiceWrapper<DTO, ENTITY, HISTO_SERVICE extends IHistoryService<DTO, ENTITY>> implements IHistoryService<DTO, ENTITY> {

    private HISTO_SERVICE historicService;

    public SilentHistoryServiceWrapper() {
        this(null);
    }

    public SilentHistoryServiceWrapper(HISTO_SERVICE historicService) {
        this.historicService = historicService;
    }

    @Override
    public void saveModifyObjectOperation(MembreSessionDTO membre, ENTITY previous, DTO next) {
        try {
            historicService.saveModifyObjectOperation(membre, previous, next);
        } catch (Exception e) {
            log.error("Erreur historisation sur modification : "+next.getClass().getSimpleName(), e);
        }
    }

    @Override
    public void saveCreateObjectOperation(MembreSessionDTO membre, ENTITY object) {
        try {
            System.out.println("BEFORE SAVE");
            historicService.saveCreateObjectOperation(membre, object);
            System.out.println("AFTER SAVE");
        } catch (Exception e) {
            log.error("Erreur historisation sur création : "+object.getClass().getSimpleName(), e);
        }
    }

    @Override
    public void saveStatusObjectChangeOperation(MembreSessionDTO membre, DTO object, String previous, String next) {
        try {
            historicService.saveStatusObjectChangeOperation(membre, object, previous, next);
        } catch (Exception e) {
            log.error("Erreur historisation sur changement de statut : "+object.getClass().getSimpleName());
        }
    }

    @Override
    public void saveDeleteObjectOperation(MembreSessionDTO membre, DTO object) {
        try {
            historicService.saveDeleteObjectOperation(membre, object);
        } catch (Exception e) {
            log.error("Erreur historisation sur suppression : "+object.getClass().getSimpleName(), e);
        }
    }

    @Override
    public void saveSpecificObjectOperation(SectionEnum section, MembreSessionDTO membre, String specificOperation) {
        try {
            historicService.saveSpecificObjectOperation(section, membre, specificOperation);
        } catch (Exception e) {
            log.error("Erreur à l'enregistrement d'une opération spécifique : "+specificOperation, e);
        }
    }

    @Override
    public String compileObjectModifications(ENTITY previous, DTO next) {
        return historicService.compileObjectModifications(previous, next);
    }


}
