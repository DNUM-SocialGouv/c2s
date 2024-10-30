package fr.gouv.sante.c2s.model.dto.membre;

import fr.gouv.sante.c2s.model.GroupeEnum;
import fr.gouv.sante.c2s.model.entity.MembreEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MembreWithPointAccueilCountDTO {

    private Long idMembre;
    private String nomPartenaire;
    private GroupeEnum typePartenaire;
    private String adressePartenaire;
    private String codePostalPartenaire;
    private String villePartenaire;
    private String emailPartenaire;
    private String telephonePartenaire;
    private String siteWebPartenaire;
    private Long countPointAccueil;

    public MembreWithPointAccueilCountDTO(MembreEntity membre, Long countPointAccueil) {
        idMembre = membre.getId();
        nomPartenaire = membre.getEntreprise().getNom();
        typePartenaire = membre.getGroupe();
        adressePartenaire = membre.getEntreprise().getAdresse();
        codePostalPartenaire = membre.getEntreprise().getCodePostal();
        villePartenaire = membre.getEntreprise().getVille();
        emailPartenaire = membre.getEntreprise().getEmail();
        telephonePartenaire = membre.getEntreprise().getTelephone();
        siteWebPartenaire = membre.getEntreprise().getSiteWeb();
        this.countPointAccueil = countPointAccueil;
    }
}
