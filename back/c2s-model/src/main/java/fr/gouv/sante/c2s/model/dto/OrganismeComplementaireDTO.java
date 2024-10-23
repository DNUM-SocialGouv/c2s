package fr.gouv.sante.c2s.model.dto;

import fr.gouv.sante.c2s.model.GroupeEnum;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder(builderMethodName = "ocInfoBuilder")
@AllArgsConstructor
@NoArgsConstructor
public class OrganismeComplementaireDTO extends OrganismeComplementairePublicDTO {

    private GroupeEnum groupe;
    private boolean ocAddedtoLPA;
}
