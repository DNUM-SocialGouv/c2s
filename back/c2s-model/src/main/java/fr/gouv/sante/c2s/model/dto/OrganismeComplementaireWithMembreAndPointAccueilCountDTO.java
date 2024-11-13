package fr.gouv.sante.c2s.model.dto;

import com.google.gson.Gson;
import fr.gouv.sante.c2s.model.TypeMembreEnum;
import fr.gouv.sante.c2s.model.dto.membre.MembreSimpleDTO;
import fr.gouv.sante.c2s.model.entity.EntrepriseEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@SuperBuilder(builderMethodName = "ocInfoWithMembreAndPointAccueilCountBuilder")
@AllArgsConstructor
@NoArgsConstructor
public class OrganismeComplementaireWithMembreAndPointAccueilCountDTO extends OrganismeComplementaireWithPointAccueilCountDTO {

    private List<MembreSimpleDTO> membres;

    public OrganismeComplementaireWithMembreAndPointAccueilCountDTO(EntrepriseEntity entrepriseEntity,
                                                                    Long count,
                                                                    Object membreIds,
                                                                    Object membreNoms,
                                                                    Object membrePrenoms,
                                                                    Object membreTypes) {
        this.setId(entrepriseEntity.getId());
        this.setNom(entrepriseEntity.getNom());
        this.setAdresse(entrepriseEntity.getAdresse());
        this.setCodePostal(entrepriseEntity.getCodePostal());
        this.setVille(entrepriseEntity.getVille());
        this.setLocSiren(entrepriseEntity.getSiren());
        this.setSiteWeb(entrepriseEntity.getSiteWeb());
        this.setTelephone(entrepriseEntity.getTelephone());
        this.setDateCrea(DateTimeFormatter.ofLocalizedDate(FormatStyle.MEDIUM).format(entrepriseEntity.getDateCrea()));
        if (entrepriseEntity.getDateMaj()!=null) {
            this.setDateMaj(DateTimeFormatter.ofLocalizedDate(FormatStyle.MEDIUM).format(entrepriseEntity.getDateMaj()));
        }
        this.setEmail(entrepriseEntity.getEmail());
        this.setGroupe(entrepriseEntity.getGroupe());
        this.setPointAccueilCount(count);
        this.setOcAddedtoLPA(entrepriseEntity.getEtablissementId()!=null);

        manageMembres(membreIds, membreNoms, membrePrenoms, membreTypes);
    }

    private void manageMembres(Object membreIds, Object membreNoms, Object membrePrenoms, Object membreTypes) {
        // conversion des STRING_AGG
        String[] membreIdsArray = membreIds!=null ? membreIds.toString().split("\\|") : null;
        String[] membreNomsArray = membreNoms!=null ? membreNoms.toString().split("\\|") : null;
        String[] membrePrenomsArray = membrePrenoms!=null ? membrePrenoms.toString().split("\\|") : null;
        String[] membreTypesArray = membreTypes!=null ? membreTypes.toString().split("\\|") : null;

        List<MembreSimpleDTO> simples = convertArraysToMembres(membreIdsArray, membreNomsArray, membrePrenomsArray, membreTypesArray);
        this.setMembres(simples);
    }

    private List<MembreSimpleDTO> convertArraysToMembres(String[] membreIdsArray, String[] membreNomsArray, String[] membrePrenomsArray, String[] membreTypesArray) {

        List<MembreSimpleDTO> simples = new ArrayList<>();

        Set<Long> ids = new HashSet<>();

        if (membreIdsArray!=null
                && membreNomsArray!=null
                && membrePrenomsArray!=null
                && membreTypesArray!=null
                && membreNomsArray.length<=membreIdsArray.length
                && membrePrenomsArray.length<=membreIdsArray.length) {

            for (int i = 0; i < membreIdsArray.length; i++) {

                if (membreIdsArray[i] == null) {
                    continue;
                }
                Long id = Long.parseLong(membreIdsArray[i]);
                if (ids.contains(id)) {
                    continue;
                }
                ids.add(id);
                TypeMembreEnum[] types = membreTypesArray[i] == null ? null : stringToType(membreTypesArray[i]);
                MembreSimpleDTO membreSimpleDTO = MembreSimpleDTO.builder().id(Long.parseLong(membreIdsArray[i]))
                        .nom(membreNomsArray[i])
                        .prenom(membrePrenomsArray[i])
                        .types(types)
                        .build();
                simples.add(membreSimpleDTO);
            }
        }

        return simples;
    }

    private TypeMembreEnum[] stringToType(String typeAgg) {
        Gson gson = new Gson();
        return gson.fromJson(typeAgg, TypeMembreEnum[].class);
    }
}