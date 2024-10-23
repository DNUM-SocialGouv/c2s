package fr.gouv.sante.c2s.model.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MembrePasswordToResetDTO {

    @Email(message = "Le format de l'email n'est pas correct")
    @NotEmpty(message = "L'email n'est pas renseigné")
    private String email;

    @Pattern(regexp = "(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{12,}", message = "Le mot de passe n'est pas assez complexe (12 caractères minimum, doit contenir une minuscule, une majuscule, un chiffre, un caractère spécial (@$!%*#?&)")
    private String password;

    @NotEmpty(message = "Votre lien n'est plus valide. Veuillez passer par la procédure \"Mot de passe oublié\"")
    private String token;

}
