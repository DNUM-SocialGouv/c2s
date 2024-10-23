package fr.gouv.sante.c2s.model.dto;

import fr.gouv.sante.c2s.model.GroupeEnum;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MessageAccueilDTO {

    private Long id;
    private String contenu;
    private GroupeEnum groupe;
    private LocalDateTime dateCrea;
    private LocalDateTime dateMaj;

}
