package fr.gouv.sante.c2s.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PointAccueilReponseDTO {

    private String id;
    private String nom;
    private String email;
    private String telephone;
    private String adresse;
    private String adresse2;
    private String adresse3;
    private String adresseComplete;
    private String cedex;
    private String codePostal;
    private String ville;
    private String region;
    private String departement;
    private String dateMaj;

}
