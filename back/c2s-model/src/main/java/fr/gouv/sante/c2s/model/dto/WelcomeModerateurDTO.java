package fr.gouv.sante.c2s.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class WelcomeModerateurDTO {

    private List<String> membresAModerer;

    private Long membresActifCount;
    private Long membresActifEvoPercent;

    private Long organisationsActifCount;
    private Long organisationsActifEvoPercent;

    private Long pointAccueilActifCount;
    private Long pointAccueilActifEvoPercent;

}
