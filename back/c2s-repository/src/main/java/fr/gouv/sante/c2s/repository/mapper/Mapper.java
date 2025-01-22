package fr.gouv.sante.c2s.repository.mapper;

import fr.gouv.sante.c2s.model.GroupeEnum;
import fr.gouv.sante.c2s.model.dto.*;
import fr.gouv.sante.c2s.model.dto.drupal.EtablissementDTO;
import fr.gouv.sante.c2s.model.dto.membre.MembreEquipeDTO;
import fr.gouv.sante.c2s.model.dto.membre.MembreInfoDTO;
import fr.gouv.sante.c2s.model.dto.membre.moderateur.ModerateurDTO;
import fr.gouv.sante.c2s.model.dto.resource.RessourceFichierDTO;
import fr.gouv.sante.c2s.model.dto.resource.RessourceThematiqueDTO;
import fr.gouv.sante.c2s.model.entity.*;
import fr.gouv.sante.c2s.repository.MembreRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Component;

import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Component
public class Mapper {

    MembreRepository membreRepository;

    public Page<PointAccueilReponseDTO> mapListPaLpaToPaLPAReponseDTO(Page<EtablissementEntity> paLpaPage) {
        List<PointAccueilReponseDTO> dtoList = paLpaPage.stream()
                .map(this::mapPaLpaToPaLPAReponseDTO)
                .collect(Collectors.toList());

        return new PageImpl<>(dtoList, paLpaPage.getPageable(), paLpaPage.getTotalElements());
    }

    public PointAccueilReponseDTO mapPaLpaToPaLPAReponseDTO(EtablissementEntity etablissementEntity) {
        String adresseComplete = Stream.of(etablissementEntity.getAdresse1(), etablissementEntity.getAdresse2(), etablissementEntity.getAdresse3(), etablissementEntity.getCodePostal(), etablissementEntity.getVille())
                .filter(Objects::nonNull)
                .collect(Collectors.joining(", "));
        return PointAccueilReponseDTO.builder()
                .id(etablissementEntity.getId().toString())
                .nom(etablissementEntity.getNom())
                .email(etablissementEntity.getEmail())
                .telephone(etablissementEntity.getTelephone())
                .adresseComplete(adresseComplete)
                .adresse(etablissementEntity.getAdresse1())
                .adresse2(etablissementEntity.getAdresse2())
                .adresse3(etablissementEntity.getAdresse3())
                .ville(etablissementEntity.getVille())
                .codePostal(etablissementEntity.getCodePostal())
                .cedex(etablissementEntity.getCedex())
                .region(etablissementEntity.getRegion())
                .dateMaj(etablissementEntity.getDateMaj()==null ? etablissementEntity.getDateCrea().format(DateTimeFormatter.ofLocalizedDate(FormatStyle.MEDIUM)) : etablissementEntity.getDateMaj().format(DateTimeFormatter.ofLocalizedDate(FormatStyle.MEDIUM)))
                .departement(etablissementEntity.getDepartement())
                .build();
    }

    public RessourceThematiqueDTO mapRessourceThematiqueToDto(RessourceThematiqueEntity ressourceThematique) {
        return RessourceThematiqueDTO.builder()
                .id(ressourceThematique.getId())
                .description(ressourceThematique.getDescription())
                .titre(ressourceThematique.getTitre())
                .ordre(ressourceThematique.getOrdre())
                .groupes(ressourceThematique.getGroupes())
                .build();
    }

    public RessourceFichierDTO mapRessourceFichierToDto(RessourceFichierEntity ressourceFichier, boolean backUsageOnly) {
        RessourceFichierDTO fichier = RessourceFichierDTO.builder()
                .id(ressourceFichier.getId())
                .taille(ressourceFichier.getTaille())
                .nom(ressourceFichier.getNom())
                .extension(ressourceFichier.getExtension())
                .dateCrea(ressourceFichier.getDateCrea())
                .dateMaj(ressourceFichier.getDateMaj())
                .uuid(ressourceFichier.getUuid())
                .thematique(mapRessourceThematiqueToDto(ressourceFichier.getRessourceThematique()))
                .build();
        if (backUsageOnly) {
            fichier.setRepertoire(ressourceFichier.getRepertoire());
        }
        return fichier;
    }

    public MessageAccueilDTO mapMessageAccueilToDto(MessageAccueilEntity messageAccueil) {
        MessageAccueilDTO dto = MessageAccueilDTO.builder()
                .id(messageAccueil.getId())
                .dateCrea(messageAccueil.getDateCrea())
                .dateMaj(messageAccueil.getDateMaj())
                .contenu(messageAccueil.getContenu())
                .groupe(messageAccueil.getGroupe())
                .build();
        return dto;
    }

    public ModerateurDTO mapMembreToModerateurDto(MembreEntity membre) {
        return ModerateurDTO.builder().id(membre.getId())
                .nom(membre.getNom())
                .prenom(membre.getPrenom())
                .telephone(membre.getTelephone())
                .fonction(membre.getFonction())
                .email(membre.getEmail())
                .build();
    }

    public MembreEntity mapMembreToModerateurEntity(ModerateurDTO moderateurDTO) {
        return MembreEntity.builder().id(moderateurDTO.getId())
                .nom(moderateurDTO.getNom())
                .prenom(moderateurDTO.getPrenom())
                .groupe(GroupeEnum.MODERATEUR)
                .telephone(moderateurDTO.getTelephone())
                .fonction(moderateurDTO.getFonction())
                .email(moderateurDTO.getEmail())
                .build();
    }

    public MembreInfoDTO mapMembreToInfoDto(MembreEntity membre) {
        System.out.println(membre);
        return MembreInfoDTO.builder()
                .membreId(membre.getId())
                .nom(membre.getNom())
                .prenom(membre.getPrenom())
                .fonction(membre.getFonction())
                .telephone(membre.getTelephone())
                .email(membre.getEmail())
                .groupe(membre.getGroupe())
                .societe(membre.getSociete())
                .statut(membre.getStatut())
                .siren(membre.getEntreprise()!=null ? membre.getEntreprise().getSiren() : null)
                .build();
    }

    public EntrepriseDTO mapEntrepriseToEntrepriseDto(EntrepriseEntity entreprise) {
        return EntrepriseDTO.builder()
                .id(entreprise.getId())
                .siteWeb(entreprise.getSiteWeb())
                .emailEntreprise(entreprise.getEmail())
                .adresse(entreprise.getAdresse())
                .codePostal(entreprise.getCodePostal())
                .siren(entreprise.getSiren())
                .groupe(entreprise.getGroupe().name())
                .telephone(entreprise.getTelephone())
                .nom(entreprise.getNom())
                .ville(entreprise.getVille())
                // todo isPointAccueil
                .build();
    }

    public MembreEquipeDTO mapMembreToMembreEquipeDto(MembreEntity membre) {
        return MembreEquipeDTO.builder()
                .id(membre.getId())
                .nom(membre.getNom())
                .prenom(membre.getPrenom())
                .email(membre.getEmail())
                .telephone(membre.getTelephone())
                .fonction(membre.getFonction())
                .societe(membre.getSociete())
                .email(membre.getEmail())
                .telephone(membre.getTelephone())
                .types(membre.getTypes())
                .build();
    }

    public OrganismeComplementairePublicDTO mapOcToInfoDto(EntrepriseEntity partenaire, boolean publicView) {
        if (publicView) {
            return OrganismeComplementairePublicDTO.ocInfoPublicBuilder()
                    .ville(partenaire.getVille())
                    .dateMaj(partenaire.getDateMaj()==null ? partenaire.getDateCrea().format(DateTimeFormatter.ofLocalizedDate(FormatStyle.MEDIUM)) : partenaire.getDateMaj().format(DateTimeFormatter.ofLocalizedDate(FormatStyle.MEDIUM)))
                    .codePostal(partenaire.getCodePostal())
                    .nom(partenaire.getNom())
                    .email(partenaire.getEmail())
                    .adresse(partenaire.getAdresse())
                    .locSiren(partenaire.getSiren())
                    .siteWeb(partenaire.getSiteWeb())
                    .telephone(partenaire.getTelephone())
                    .build();
        } else {
            return OrganismeComplementaireDTO.ocInfoBuilder()
                    .ville(partenaire.getVille())
                    .codePostal(partenaire.getCodePostal())
                    .dateMaj(partenaire.getDateMaj()==null ? partenaire.getDateCrea().format(DateTimeFormatter.ofLocalizedDate(FormatStyle.MEDIUM)) : partenaire.getDateMaj().format(DateTimeFormatter.ofLocalizedDate(FormatStyle.MEDIUM)))
                    .ocAddedtoLPA(false)
                    .nom(partenaire.getNom())
                    .email(partenaire.getEmail())
                    .adresse(partenaire.getAdresse())
                    .locSiren(partenaire.getSiren())
                    .siteWeb(partenaire.getSiteWeb())
                    .telephone(partenaire.getTelephone())
                    .build();
        }
    }

    public EtablissementDTO mapEtablissementToDrupalEtablissement(EtablissementEntity etablissement) {
        EntrepriseEntity entreprise = etablissement.getEntreprise();
        fr.gouv.sante.c2s.model.dto.drupal.EntrepriseDTO entrepriseDto = fr.gouv.sante.c2s.model.dto.drupal.EntrepriseDTO.builder()
                .etat(entreprise.getEtat())
                .groupe(entreprise.getGroupe())
                .etablissementId(entreprise.getEtablissementId())
                .email(entreprise.getEmail())
                .telephone(entreprise.getTelephone())
                .region(entreprise.getRegion())
                .departement(entreprise.getDepartement())
                .type(entreprise.getType())
                .siteWeb(entreprise.getSiteWeb())
                .arrete(entreprise.getArrete())
                .habilite(entreprise.getHabilite())
                .ville(entreprise.getVille())
                .codePostal(entreprise.getCodePostal())
                .adresse(entreprise.getAdresse())
                .nom(entreprise.getNom())
                .siren(entreprise.getSiren())
                .id(entreprise.getId())
                .dateMaj(entreprise.getDateMaj())
                .dateCrea(entreprise.getDateCrea())
                .build();
        return EtablissementDTO.builder()
                .dateCrea(etablissement.getDateCrea())
                .dateMaj(etablissement.getDateMaj())
                .id(etablissement.getId())
                .nom(etablissement.getNom())
                .adresse1(etablissement.getAdresse1())
                .adresse2(etablissement.getAdresse2())
                .adresse3(etablissement.getAdresse3())
                .codePostal(etablissement.getCodePostal())
                .ville(etablissement.getVille())
                .cedex(etablissement.getCedex())
                .telephone(etablissement.getTelephone())
                .email(etablissement.getEmail())
                .etat(etablissement.getEtat())
                .region(etablissement.getRegion())
                .departement(etablissement.getDepartement())
                .organismeComplementaire(entrepriseDto)
                .build();
    }
}
