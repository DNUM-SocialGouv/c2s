package fr.gouv.sante.c2s.model.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MembreToRegistertDTO {

    @NotEmpty(message = "Le nom est requis")
    private String nom;

    @NotEmpty(message = "Le prénom est requis")
    private String prenom;

    @NotEmpty(message = "L'adresse email est requise")
    @Email(message = "Le format de l'adresse email est incorrect")
    private String email;

    @Size(min = 10, max = 11, message = "Le format du numéro de téléphone est incorrect")
    private String telephone;

    @NotEmpty
    private String societe;

    @NotBlank
    @Pattern(regexp = "(ORGANISME_COMPLEMENTAIRE|CAISSE)", message = "Valeur attendue : ORGANISME_COMPLEMENTAIRE ou CAISSE")
    private String groupe;

    private String siren;

    @NotEmpty(message = "La fonction est requise")
    private String fonction;

    @NotEmpty
    private String formId;
}
