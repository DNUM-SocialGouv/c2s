package fr.gouv.sante.c2s.model.dto.membre;

import fr.gouv.sante.c2s.model.GroupeEnum;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MembreInfoDTO {
    private Long membreId;
    private String nom;
    private String prenom;
    private String fonction;
    private String email;
    private String telephone;
    private String password;
    private GroupeEnum groupe;
    private String societe;
    private String siren;
}
