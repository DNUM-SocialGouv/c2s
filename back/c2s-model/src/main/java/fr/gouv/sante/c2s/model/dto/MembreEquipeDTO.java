package fr.gouv.sante.c2s.model.dto;

import fr.gouv.sante.c2s.model.GroupeEnum;
import fr.gouv.sante.c2s.model.TypeMembreEnum;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MembreEquipeDTO {
    private Long id;
    private String nom;
    private String prenom;
    private String fonction;
    private String email;
    private String telephone;
    private String password;
    private GroupeEnum groupe;
    private String societe;
    private String siren;

    private TypeMembreEnum[] types;
}
