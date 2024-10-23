package fr.gouv.sante.c2s.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PointAccueilToCreateDTO {
    private String nom;
    private String adresse;
    private String adresse2;
    private String adresse3;
    private String email;
    private String telephone;
    private String codePostal;
    private String cedex;
    private String ville;
    private String locSiren;
}
