package fr.gouv.sante.c2s.model.dto;

import fr.gouv.sante.c2s.model.dto.resource.RessourceFichierDTO;
import fr.gouv.sante.c2s.model.dto.resource.RessourceThematiqueDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AllRessourcesDTO {

    private List<RessourceThematiqueDTO> thematiques;
    private List<RessourceFichierDTO> fichiers;
    private String dateMiseAJour;

}
