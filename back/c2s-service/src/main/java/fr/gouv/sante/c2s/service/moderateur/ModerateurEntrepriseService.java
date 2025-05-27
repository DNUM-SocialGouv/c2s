package fr.gouv.sante.c2s.service.moderateur;

import fr.gouv.sante.c2s.model.EtatEnum;
import fr.gouv.sante.c2s.model.GroupeEnum;
import fr.gouv.sante.c2s.model.dto.EntrepriseDTO;
import fr.gouv.sante.c2s.model.dto.session.MembreSessionDTO;
import fr.gouv.sante.c2s.model.entity.EntrepriseEntity;
import fr.gouv.sante.c2s.model.entity.EtablissementEntity;
import fr.gouv.sante.c2s.model.helper.DepartementRegionHelper;
import fr.gouv.sante.c2s.repository.EntrepriseRepository;
import fr.gouv.sante.c2s.repository.EtablissementRepository;
import fr.gouv.sante.c2s.repository.mapper.Mapper;
import fr.gouv.sante.c2s.service.MembreService;
import fr.gouv.sante.c2s.service.history.moderateur.SilentHistoryModerateurService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Slf4j
@Transactional
public class ModerateurEntrepriseService {

    SilentHistoryModerateurService silentHistoryModerateurService;
    MembreService membreService;
    EntrepriseRepository entrepriseRepository;
    EtablissementRepository etablissementRepository;
    Mapper mapper;

    @Autowired
    public ModerateurEntrepriseService(SilentHistoryModerateurService silentHistoryModerateurService, MembreService membreService, EntrepriseRepository entrepriseRepository, EtablissementRepository etablissementRepository, Mapper mapper) {
        this.silentHistoryModerateurService = silentHistoryModerateurService;
        this.membreService = membreService;
        this.entrepriseRepository = entrepriseRepository;
        this.etablissementRepository = etablissementRepository;
        this.mapper = mapper;
    }

    public EntrepriseDTO createEntreprise(MembreSessionDTO membreSession,
                                          String societe, String ville, String codePostal, String adresse,
                                          GroupeEnum groupe, String siren, String emailEntreprise, String siteWeb,
                                          String telephone) {

        EntrepriseEntity entreprise = new EntrepriseEntity();
        entreprise.setNom(societe);
        entreprise.setVille(ville);
        entreprise.setCodePostal(codePostal);
        entreprise.setAdresse(adresse);
        entreprise.setGroupe(groupe);
        entreprise.setSiren(siren);
        entreprise.setEmail(emailEntreprise);
        entreprise.setSiteWeb(siteWeb);
        entreprise.setTelephone(telephone);
        entreprise.setEtat(EtatEnum.ACTIF);
        if (codePostal!=null) {
            entreprise.setDepartement(DepartementRegionHelper.getDepartement(codePostal));
            entreprise.setRegion(DepartementRegionHelper.getRegion(codePostal));
        }

        entreprise = entrepriseRepository.save(entreprise);

        silentHistoryModerateurService.saveAjoutEtablissement(membreSession, entreprise.getNom());

        return mapper.mapEntrepriseToEntrepriseDto(entreprise);
    }

    public boolean isEntrepriseExistsBySiren(String siren) {
        List<EntrepriseEntity> entreprises = entrepriseRepository.findEntreprisesBySiren(siren);
        return entreprises!=null && entreprises.size()==1;
    }

    public EntrepriseDTO editEntreprise(MembreSessionDTO membreSession, String societe, String ville, String codePostal, String adresse,
                                        GroupeEnum groupe, String siren, String emailEntreprise, String siteWeb,
                                        String telephone, Boolean pointAccueil) {

        EntrepriseEntity exists = entrepriseRepository.findEntrepriseBySiren(siren);

        EntrepriseDTO entreprise = EntrepriseDTO.builder()
                        .societe(societe)
                        .emailEntreprise(emailEntreprise)
                        .nom(exists.getNom())
                        .adresse(adresse)
                        .codePostal(codePostal)
                        .ville(ville)
                        .siren(siren)
                        .groupe(groupe.name())
                        .siteWeb(siteWeb)
                        .telephone(telephone)
                        .pointAccueil(pointAccueil)
                        .build();
        exists.setNom(societe);
        exists.setVille(ville);
        exists.setCodePostal(codePostal);
        exists.setAdresse(adresse);
        exists.setGroupe(groupe);
        exists.setSiren(siren);
        exists.setEmail(emailEntreprise);
        exists.setSiteWeb(siteWeb);
        exists.setTelephone(telephone);
        exists.setEtat(EtatEnum.ACTIF);
        exists.setDepartement(DepartementRegionHelper.getDepartement(codePostal));
        exists.setRegion(DepartementRegionHelper.getRegion(codePostal));

        exists = entrepriseRepository.save(exists);

        silentHistoryModerateurService.saveModificationEntreprise(membreSession, entreprise.getNom());

        return mapper.mapEntrepriseToEntrepriseDto(exists);
    }

    public boolean deleteEntreprise(MembreSessionDTO membreSession, String siren) {
        try {
            EntrepriseEntity entreprise = entrepriseRepository.findEntrepriseBySiren(siren);
            if (entreprise != null) {
                List<EtablissementEntity> etablissements = etablissementRepository.getByEntreprise(entreprise);
                etablissements.forEach(it -> {
                    it.setEtat(EtatEnum.ARCHIVE);
                    etablissementRepository.save(it);
                });
                entreprise.setEtat(EtatEnum.ARCHIVE);
                membreService.applySoftDelete(entreprise);
                entrepriseRepository.save(entreprise);
                silentHistoryModerateurService.saveSuppressionEntreprise(membreSession, entreprise.getNom());
                return true;
            }

        } catch (Exception e) {
            log.error("Problème à la suppression de l'entreprise", e);
        }
        return false;
    }


}
