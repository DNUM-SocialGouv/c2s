package fr.gouv.sante.c2s.web.model.form;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FichierFormDTO {

    @NotNull
    Long ressourceThematiqueId;

}
