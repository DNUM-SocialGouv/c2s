package fr.gouv.sante.c2s.web.model.response;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ModerateurEtablissementHomeDTO {

    Long ocActifsCount;
    Long pointsAccueilCount;
    Map<String, String> etablissementTypes;
    List<String> regions;
    List<String> departements;

}
