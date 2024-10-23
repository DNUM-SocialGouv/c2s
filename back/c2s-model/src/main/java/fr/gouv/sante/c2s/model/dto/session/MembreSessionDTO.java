package fr.gouv.sante.c2s.model.dto.session;

import fr.gouv.sante.c2s.model.GroupeEnum;
import lombok.Data;

@Data
public class MembreSessionDTO {

    // stocke le minimum
    Long id;
    String email;
    String nom;
    String prenom;
    String siren;
    GroupeEnum groupe;

}
