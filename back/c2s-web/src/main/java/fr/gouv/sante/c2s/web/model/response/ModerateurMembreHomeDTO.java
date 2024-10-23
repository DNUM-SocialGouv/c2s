package fr.gouv.sante.c2s.web.model.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ModerateurMembreHomeDTO {

    private Long membreCount;

    private Map<String, String> groupes;

}
