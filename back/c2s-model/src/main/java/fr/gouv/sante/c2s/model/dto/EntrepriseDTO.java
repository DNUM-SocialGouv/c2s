package fr.gouv.sante.c2s.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class EntrepriseDTO {

    private Long id;
    private String nom;
    private String societe;
    private String ville;
    private String codePostal;
    private String adresse;
    private String siren;
    private String emailEntreprise;
    private String siteWeb;
    private String telephone;
    private Boolean pointAccueil;
    private String groupe;
}
