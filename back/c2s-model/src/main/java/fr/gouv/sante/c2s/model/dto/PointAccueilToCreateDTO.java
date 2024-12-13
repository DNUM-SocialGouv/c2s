package fr.gouv.sante.c2s.model.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PointAccueilToCreateDTO {
    @NotEmpty(message = "Le nom de l'établissement est requis")
    @NotBlank(message = "Le nom de l'établissement est requis")
    private String nom;
    @NotEmpty(message = "L'adresse est requise")
    @NotBlank(message = "L'adresse est requise")
    private String adresse;
    private String adresse2;
    private String adresse3;
    @NotEmpty(message = "L'adresse email est requise")
    @Email(message = "Le format de l'email est incorrect")
    private String email;
    @NotEmpty(message = "Le numéro de téléphone est requis")
    @Pattern(regexp = "^\\d{3,10}$", message = "Le format du numéro de téléphone est incorrect")
    private String telephone;
    @NotEmpty(message = "Le code postal est requis")
    @Pattern(regexp = "^(0[1-9]|[1-8]\\d|9[0-5])\\d{3}$", message = "Le format du code postal est incorrect")
    private String codePostal;
    private String cedex;
    @NotEmpty(message = "La ville est requise")
    @NotBlank(message = "La ville est requise")
    private String ville;
    private String locSiren;
}
