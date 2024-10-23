package fr.gouv.sante.c2s.web.model.response;

import fr.gouv.sante.c2s.model.dto.resource.RessourceThematiqueDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ModerateurRessourceHomeDTO {

    private List<RessourceThematiqueDTO> thematiques;

    private Map<String, String> groupes;

    private Long count;
}

