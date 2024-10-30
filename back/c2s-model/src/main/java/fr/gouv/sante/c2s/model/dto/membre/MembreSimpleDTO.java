package fr.gouv.sante.c2s.model.dto.membre;

import fr.gouv.sante.c2s.model.TypeMembreEnum;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MembreSimpleDTO {

    private Long id;
    private String nom;
    private String prenom;
    private TypeMembreEnum[] types;

}
