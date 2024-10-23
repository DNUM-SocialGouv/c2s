package fr.gouv.sante.c2s.model.service;

import fr.gouv.sante.c2s.model.SectionEnum;
import fr.gouv.sante.c2s.model.dto.session.MembreSessionDTO;

public interface IHistoryService<DTO, ENTITY> {

    void saveCreateObjectOperation(MembreSessionDTO membre, ENTITY entity);

    void saveModifyObjectOperation(MembreSessionDTO membre, ENTITY previous, DTO next);

    void saveStatusObjectChangeOperation(MembreSessionDTO membre, DTO dto, String previous, String next);

    void saveDeleteObjectOperation(MembreSessionDTO membre, DTO dto);

    String compileObjectModifications(ENTITY previous, DTO next);

    void saveSpecificObjectOperation(SectionEnum section, MembreSessionDTO membre, String specificOperation);

}
