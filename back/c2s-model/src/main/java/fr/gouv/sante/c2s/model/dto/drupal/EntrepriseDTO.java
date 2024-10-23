package fr.gouv.sante.c2s.model.dto.drupal;

import fr.gouv.sante.c2s.model.EtatEnum;
import fr.gouv.sante.c2s.model.GroupeEnum;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Builder
@Data
public class EntrepriseDTO {

    private LocalDateTime dateCrea;
    private LocalDateTime dateMaj;
    private Long id;
    private String siren;
    private String nom;
    private String adresse;
    private String codePostal;
    private String ville;
    private String habilite;
    private String arrete;
    private String siteWeb;
    private EtatEnum etat;
    private String type;
    private String departement;
    private String region;
    private String telephone;
    private String email;
    private GroupeEnum groupe;
    private Long etablissementId;
}
