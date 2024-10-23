package fr.gouv.sante.c2s.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder(builderMethodName = "ocInfoPublicBuilder")
@AllArgsConstructor
@NoArgsConstructor
public class OrganismeComplementairePublicDTO {
    private Long id;
    private String locSiren;
    private String dateCrea;
    private String dateMaj;
    private String nom;
    private String email;
    private String telephone;
    private String adresse;
    private String codePostal;
    private String ville;
    private String siteWeb;
}
