package fr.gouv.sante.c2s.web.model.form;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EntrepriseFormDTO {

    private String societe;

    @NotEmpty(message = "La ville est requise")
    private String ville;

    @NotEmpty(message = "Le code postal est requis")
    @Pattern(regexp = "^(?:0[1-9]|[1-8]\\d|9[0-8])\\d{3}$", message = "Le format du code postal n'est pas correct")
    private String codePostal;

    @NotEmpty(message = "L'adresse est requise")
    private String adresse;

    @NotEmpty(message = "Le SIREN est requis")
    @Pattern(regexp = "^[0-9]{9}$", message = "Le format du SIREN est incorrect")
    private String siren;

    //@NotEmpty(message = "L'adresse email de l'organisation est requise")
    private String emailEntreprise;
    private String siteWeb;
    private String telephone;
    private Boolean pointAccueil;

    @NotBlank
    @Pattern(regexp = "(ORGANISME_COMPLEMENTAIRE|CAISSE)", message = "Valeur attendue : ORGANISME_COMPLEMENTAIRE ou CAISSE")
    private String groupe;
}
