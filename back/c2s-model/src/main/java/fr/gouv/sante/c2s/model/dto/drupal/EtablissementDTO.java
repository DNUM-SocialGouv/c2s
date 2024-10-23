package fr.gouv.sante.c2s.model.dto.drupal;

import fr.gouv.sante.c2s.model.EtatEnum;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Builder
@Data
public class EtablissementDTO {

    private LocalDateTime dateCrea;
    private LocalDateTime dateMaj;
    private Long id;
    private String nom;
    private String adresse1;
    private String adresse2;
    private String adresse3;
    private String codePostal;
    private String ville;
    private String cedex;
    private String telephone;
    private String email;
    private EtatEnum etat;
    private String region;
    private String departement;

    private EntrepriseDTO organismeComplementaire;

}
