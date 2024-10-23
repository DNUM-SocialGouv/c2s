package fr.gouv.sante.c2s.service.partenaire;

import fr.gouv.sante.c2s.model.EtatEnum;
import fr.gouv.sante.c2s.model.GroupeEnum;
import fr.gouv.sante.c2s.model.SectionEnum;
import fr.gouv.sante.c2s.model.dto.*;
import fr.gouv.sante.c2s.model.dto.drupal.EtablissementDTO;
import fr.gouv.sante.c2s.model.dto.resource.RessourceFichierDTO;
import fr.gouv.sante.c2s.model.dto.session.MembreSessionDTO;
import fr.gouv.sante.c2s.model.entity.MessageAccueilEntity;
import fr.gouv.sante.c2s.model.entity.EntrepriseEntity;
import fr.gouv.sante.c2s.model.entity.EtablissementEntity;
import fr.gouv.sante.c2s.repository.*;
import fr.gouv.sante.c2s.repository.mapper.Mapper;
import fr.gouv.sante.c2s.service.history.HistoryEntrepriseService;
import fr.gouv.sante.c2s.service.history.HistoryEtablissementService;
import fr.gouv.sante.c2s.service.history.SilentHistoryServiceWrapper;
import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Slf4j
@Transactional
public class PartenaireService {

    // l instanciation d'un silent history service wrapper est un peu particulière compte tenu de sa généricité,
    // d'ou l'utilisation de PostConstruct
    @Autowired
    HistoryEntrepriseService historyEntrepriseService;

    SilentHistoryServiceWrapper<EntrepriseDTO, EntrepriseEntity, HistoryEntrepriseService> silentHistoryServiceWrapper;

    private final MessageAccueilRepository messageAccueilRepository;
    private final RessourceFichierRepository ressourceFichierRepository;
    private final EntrepriseRepository entrepriseRepository;
    private final MembreRepository membreRepository;
    private final EtablissementRepository etablissementRepository;
    private final Mapper mapper;
    @Autowired
    private HistoryEtablissementService historyEtablissementService;

    @PostConstruct
    void initService() {
        this.silentHistoryServiceWrapper = new SilentHistoryServiceWrapper(historyEntrepriseService);
    }

    public WelcomePartenaireDTO getWelcomePartenaire(GroupeEnum groupe) {
        WelcomePartenaireDTO welcomePartenaire = new WelcomePartenaireDTO();
        welcomePartenaire.setMessageAccueil(getMessageAccueil(groupe));
        welcomePartenaire.setRessourceFiles(getResourceFiles(groupe));
        return welcomePartenaire;
    }

    public List<EtablissementDTO> findEtablissementByCriteria(String departement, String ville, String region, String organisme, EtatEnum etat) {
        if (ville!=null) {
            ville = "%" + ville.toLowerCase();
        }
        if (organisme!=null) {
            organisme = "%" + organisme.toLowerCase() + "%";
        }
        return etablissementRepository.findEtablissementByCriteria(departement, ville, region, organisme, etat).stream()
                .map(mapper::mapEtablissementToDrupalEtablissement)
                .collect(Collectors.toList());
    }

    public List<OrganismeComplementairePublicDTO> getOrganismeComplementairesActifsForDrupal() {
        List<OrganismeComplementairePublicDTO> infos = entrepriseRepository.findOrganismeComplementairesByEtat(EtatEnum.ACTIF)
                .stream()
                .map(it -> mapper.mapOcToInfoDto(it, true))
                .filter(it -> it.getNom()!=null && it.getAdresse()!=null && it.getCodePostal()!=null && it.getVille()!=null)
                .collect(Collectors.toList());
        return infos;
    }


    public OrganismeComplementaireDTO findOrganismeComplementaireByEmail(String email) {
        EntrepriseEntity organismeComplementaire = membreRepository.findOrganismeComplementaireByEmail(email);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd MMMM yyyy", Locale.FRENCH);
        if (organismeComplementaire != null) {
            String formattedDate = organismeComplementaire.getDateMaj()!=null ? organismeComplementaire.getDateMaj().format(formatter) : organismeComplementaire.getDateCrea().format(formatter);
            boolean paLPAExists= !etablissementRepository.findAllByNomAndAdresse1AndCodePostalAndDepartementAndRegionAndEntreprise_siren(organismeComplementaire.getNom(), organismeComplementaire.getAdresse(), organismeComplementaire.getCodePostal(), organismeComplementaire.getDepartement(), organismeComplementaire.getRegion(), organismeComplementaire.getSiren()).isEmpty();
            return OrganismeComplementaireDTO.ocInfoBuilder()
                    .locSiren(organismeComplementaire.getSiren())
                    .nom(organismeComplementaire.getNom())
                    .adresse(organismeComplementaire.getAdresse())
                    .codePostal(organismeComplementaire.getCodePostal())
                    .ville(organismeComplementaire.getVille())
                    .siteWeb(organismeComplementaire.getSiteWeb())
                    .ocAddedtoLPA(paLPAExists)
                    .groupe(GroupeEnum.ORGANISME_COMPLEMENTAIRE)
                    .email(organismeComplementaire.getEmail())
                    .telephone(organismeComplementaire.getTelephone())
                    .dateMaj(formattedDate)
                    .build();
        }

        return null;
    }


    public void updatePartenaireInfo(OrganismeComplementaireDTO ocDTO, MembreSessionDTO membreSessionDTO) {
        if (ocDTO == null) {
            log.error("OCInfoReponseDTO is null");
            return;
        }

        String siren = membreSessionDTO.getSiren();

        if (siren == null || ocDTO.getLocSiren()==null || !ocDTO.getLocSiren().equals(siren)) {
            log.error("SIREN error");
            return;
        }

        EntrepriseEntity entrepriseEntity = entrepriseRepository.findEntrepriseBySiren(siren);
        if (entrepriseEntity == null) {
            log.error("OcLoc not found with SIREN: {}", siren);
            return;
        }

        // Mise à jour de OcLoc
        entrepriseEntity.setSiteWeb(ocDTO.getSiteWeb());
        entrepriseEntity.setDateMaj(LocalDateTime.now());
        entrepriseEntity.setTelephone(ocDTO.getTelephone());
        entrepriseEntity.setEmail(ocDTO.getEmail());

        // Gestion de PaLpa
        manageRelationSiegePointAccueil(entrepriseEntity, ocDTO.isOcAddedtoLPA(), membreSessionDTO);

        entrepriseRepository.save(entrepriseEntity);
    }


    private void manageRelationSiegePointAccueil(EntrepriseEntity entrepriseEntity, boolean ocAddedtoLPA, MembreSessionDTO membreSession) {

        if (ocAddedtoLPA) { // le siege est un point d'accueil

            boolean newInstance = entrepriseEntity.getEtablissementId()==null || etablissementRepository.existsById(entrepriseEntity.getEtablissementId()) == false;

            EtablissementEntity etablissement = entrepriseEntity.getEtablissementId()!=null && etablissementRepository.existsById(entrepriseEntity.getEtablissementId()) ? etablissementRepository.findById(entrepriseEntity.getEtablissementId()).orElseThrow() : EtablissementEntity.builder().build();

            if (newInstance) {
                etablissement.setEntreprise(entrepriseEntity);
                etablissement.setNom(entrepriseEntity.getNom());
                etablissement.setAdresse1(entrepriseEntity.getAdresse());
                etablissement.setCodePostal(entrepriseEntity.getCodePostal());
                etablissement.setDepartement(entrepriseEntity.getDepartement());
                etablissement.setVille(entrepriseEntity.getVille());
                etablissement.setRegion(entrepriseEntity.getRegion());
                etablissement.setEtat(EtatEnum.ACTIF);
                etablissement.setDateCrea(LocalDateTime.now());
            } else {
                etablissement.setDateMaj(LocalDateTime.now());
            }

            if (etablissement.getDateCrea()==null) {
                etablissement.setDateCrea(LocalDateTime.now());
                newInstance = true;
            } else {
                etablissement.setDateMaj(LocalDateTime.now());
            }

            etablissement = etablissementRepository.save(etablissement);

            if (newInstance) {
                entrepriseEntity.setEtablissementId(etablissement.getId());
                historyEtablissementService.saveSpecificObjectOperation(SectionEnum.MES_ETABLISSEMENTS, membreSession, "Le siège est maintenant un point d'accueil");
            }

        } else if (entrepriseEntity.getEtablissementId()!=null) { // le siege n'est pas un point d'accueil

            etablissementRepository.findById(entrepriseEntity.getEtablissementId()).ifPresent(etablissement -> {
                etablissementRepository.deleteById(etablissement.getId());
                entrepriseEntity.setEtablissementId(null);
                historyEtablissementService.saveSpecificObjectOperation(SectionEnum.MES_ETABLISSEMENTS, membreSession, "Le siège n'est plus un point d'accueil");
            });
        }
    }

    private List<RessourceFichierDTO> getResourceFiles(GroupeEnum groupe) {
        Pageable pageable = PageRequest.of(0, 7);
        return ressourceFichierRepository.getLastResourceFilesByGroupe("%"+groupe.name()+"%", pageable)
                .stream()
                .map(resourceFile -> mapper.mapRessourceFichierToDto(resourceFile, false))
                .collect(Collectors.toList());
    }

    private MessageAccueilDTO getMessageAccueil(GroupeEnum groupe) {
        Pageable pageable = PageRequest.of(0, 1);
        MessageAccueilEntity messageAccueilEntity = messageAccueilRepository.findFirstByGroupeOrderByIdDesc(groupe, pageable).get(0);
        return mapper.mapMessageAccueilToDto(messageAccueilEntity);
    }

}
