package fr.gouv.sante.c2s.model.dto;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import fr.gouv.sante.c2s.model.ActionTypeEnum;
import fr.gouv.sante.c2s.model.GroupeEnum;
import fr.gouv.sante.c2s.model.SectionEnum;
import fr.gouv.sante.c2s.model.entity.HistoricOperationEntity;
import fr.gouv.sante.c2s.model.json.DateToSpecificFormatSerializer;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class HistoryOperationDTO {

    private Long id;
    @JsonSerialize(converter = DateToSpecificFormatSerializer.class)
    private Date operationDate;
    private SectionEnum section;
    private GroupeEnum groupe;
    private String membreInformations;
    private ActionTypeEnum actionType;
    private String actionLabel;
    private Long membreId;
    private String entrepriseNom;

    public HistoryOperationDTO(HistoricOperationEntity operation, String entrepriseNom) {
        this.id = operation.getId();
        this.operationDate = operation.getOperationDate();
        this.section = operation.getSection();
        this.groupe = operation.getGroupe();
        this.membreInformations = operation.getMembreInformations();
        this.actionType = operation.getActionType();
        this.actionLabel = operation.getActionLabel();
        this.membreId = operation.getMembreId();
        this.entrepriseNom = entrepriseNom;
    }
}