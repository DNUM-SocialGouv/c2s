package fr.gouv.sante.c2s.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AdresseInfoDTO {
    private String label;
    private String context;
    private String codePostal;
    private String ville;
    private String adresse;
}
