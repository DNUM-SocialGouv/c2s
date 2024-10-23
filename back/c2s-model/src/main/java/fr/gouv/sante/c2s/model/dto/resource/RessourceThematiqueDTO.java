package fr.gouv.sante.c2s.model.dto.resource;

import fr.gouv.sante.c2s.model.GroupeEnum;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RessourceThematiqueDTO {

    private Long id;
    private String titre;
    private String description;
    private List<GroupeEnum> groupes;
    private Integer ordre;

}
