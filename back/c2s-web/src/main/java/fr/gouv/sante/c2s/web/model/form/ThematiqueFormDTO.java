package fr.gouv.sante.c2s.web.model.form;

import jakarta.validation.constraints.NotBlank;
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
public class ThematiqueFormDTO {

    @NotBlank
    @Size(min = 4, max = 50)
    String titre;

    @NotBlank
    @Size(min = 10, max = 5000)
    String description;

    @NotNull
    String[] groupes;

    Integer ordre;

}
