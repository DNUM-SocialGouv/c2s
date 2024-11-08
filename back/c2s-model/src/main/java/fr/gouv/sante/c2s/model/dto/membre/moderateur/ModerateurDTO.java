package fr.gouv.sante.c2s.model.dto.membre.moderateur;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ModerateurDTO {

    // validation gérée distinctement si update
    private Long id;

    @NotEmpty(message = "Le nom est requis")
    private String nom;

    @NotEmpty(message = "Le prénom est requis")
    private String prenom;

    @NotEmpty(message = "L'email est requis")
    @Email(message = "Le format de l'email n'est pas correct")
    private String email;

    @NotEmpty(message = "Le numéro de téléphone est requis")
    private String telephone;

    @NotEmpty(message = "La fonction est requise")
    private String fonction;

}