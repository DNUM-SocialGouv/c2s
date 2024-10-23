package fr.gouv.sante.c2s.web.model.form;

import fr.gouv.sante.c2s.model.GroupeEnum;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MessageAccueilFormDTO {

    @Size(min = 5, max = 6000)
    String contenu;

    @NotNull
    GroupeEnum groupe;

}
