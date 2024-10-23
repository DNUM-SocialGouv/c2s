package fr.gouv.sante.c2s.model.dto;

import fr.gouv.sante.c2s.model.entity.EntrepriseEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;

@Data
@SuperBuilder(builderMethodName = "ocInfoWithPointAccueilCountBuilder")
@AllArgsConstructor
@NoArgsConstructor
public class OrganismeComplementaireWithPointAccueilCountDTO extends OrganismeComplementaireDTO {

    private Long pointAccueilCount;

    public OrganismeComplementaireWithPointAccueilCountDTO(EntrepriseEntity entrepriseEntity, Long count) {
        this.setId(entrepriseEntity.getId());
        this.setNom(entrepriseEntity.getNom());
        this.setAdresse(entrepriseEntity.getAdresse());
        this.setCodePostal(entrepriseEntity.getCodePostal());
        this.setVille(entrepriseEntity.getVille());
        this.setLocSiren(entrepriseEntity.getSiren());
        this.setSiteWeb(entrepriseEntity.getSiteWeb());
        this.setTelephone(entrepriseEntity.getTelephone());
        this.setDateCrea(DateTimeFormatter.ofLocalizedDate(FormatStyle.MEDIUM).format(entrepriseEntity.getDateCrea()));
        this.setDateMaj(DateTimeFormatter.ofLocalizedDate(FormatStyle.MEDIUM).format(entrepriseEntity.getDateMaj()));
        this.setEmail(entrepriseEntity.getEmail());
        this.setGroupe(entrepriseEntity.getGroupe());
        this.setPointAccueilCount(count);
    }
}
