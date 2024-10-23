package fr.gouv.sante.c2s.web.model.form;

import fr.gouv.sante.c2s.model.StatutMembreEnum;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChangeStatutFormDTO {

    @NotNull
    @Email
    private String email;

    @NotNull
    private StatutMembreEnum statut;

}
