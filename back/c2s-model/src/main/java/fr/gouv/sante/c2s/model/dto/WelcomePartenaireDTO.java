package fr.gouv.sante.c2s.model.dto;

import fr.gouv.sante.c2s.model.dto.resource.RessourceFichierDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class WelcomePartenaireDTO {

    private MessageAccueilDTO messageAccueil;

    private List<RessourceFichierDTO> ressourceFiles;

}
