package fr.gouv.sante.c2s.service;

import fr.gouv.sante.c2s.model.EtatEnum;
import fr.gouv.sante.c2s.model.dto.session.MembreSessionDTO;
import fr.gouv.sante.c2s.model.entity.EntrepriseEntity;
import fr.gouv.sante.c2s.model.helper.DepartementRegionHelper;
import fr.gouv.sante.c2s.repository.EntrepriseRepository;
import fr.gouv.sante.c2s.repository.EtablissementRepository;
import fr.gouv.sante.c2s.model.dto.PointAccueilReponseDTO;
import fr.gouv.sante.c2s.model.dto.PointAccueilToCreateDTO;
import fr.gouv.sante.c2s.model.entity.EtablissementEntity;
import fr.gouv.sante.c2s.repository.mapper.Mapper;
import fr.gouv.sante.c2s.service.history.HistoryEtablissementService;
import fr.gouv.sante.c2s.service.history.SilentHistoryServiceWrapper;
import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Slf4j
@Service
@Transactional
public class EtablissementService {

    // l instanciation d'un silent history service wrapper est un peu particulière compte tenu de sa généricité,
    // d'ou l'utilisation de PostConstruct
    @Autowired
    HistoryEtablissementService historyEtablissementService;

    SilentHistoryServiceWrapper<PointAccueilReponseDTO, EtablissementEntity, HistoryEtablissementService> silentHistoryServiceWrapper;

    private final EtablissementRepository etablissementRepository;
    private final EntrepriseRepository entrepriseRepository;

    Mapper mapper;

    @PostConstruct
    void initService() {
        this.silentHistoryServiceWrapper = new SilentHistoryServiceWrapper(historyEtablissementService);
    }

    public Page<PointAccueilReponseDTO> findPointAccueils( String siren, String nom, String region, String departement, Pageable pageable) {
        Specification<EtablissementEntity> spec = Specification.where(null);
        if( siren != null)  spec = spec.and(withSiren(siren));
        if (nom != null) spec = spec.and(withNom(nom));
        if (region != null) spec = spec.and(withRegion(region));
        if (departement != null) spec = spec.and(withDepartement(departement));
        return mapper.mapListPaLpaToPaLPAReponseDTO(etablissementRepository.findAll(spec, pageable));

    }
    public static Specification<EtablissementEntity> withSiren(String siren) {
        return (root, query, criteriaBuilder) -> {
            if (siren == null || siren.isEmpty()) return null;
            return criteriaBuilder.like(criteriaBuilder.lower(root.join("entreprise").get("siren")),  siren);
        };
    }

    public static Specification<EtablissementEntity> withNom(String nom) {
        return (root, query, criteriaBuilder) -> {
            if (nom == null || nom.isEmpty()) return null;
            return criteriaBuilder.like(criteriaBuilder.lower(root.get("nom")), "%" + nom.toLowerCase() + "%");
        };
    }

    public static Specification<EtablissementEntity> withRegion(String region) {
        return (root, query, criteriaBuilder) -> {
            if (region == null || region.isEmpty()) return null;
            return criteriaBuilder.equal(root.get("region"), region);
        };
    }

    public static Specification<EtablissementEntity> withDepartement(String departement) {
        return (root, query, criteriaBuilder) -> {
            if (departement == null || departement.isEmpty()) return null;
            return criteriaBuilder.equal(root.get("departement"), departement);
        };
    }

    public PointAccueilReponseDTO createPointAccueil(MembreSessionDTO membreSessionDTO, PointAccueilToCreateDTO pointAccueilDTO) {

        EntrepriseEntity organismeComplementaire = entrepriseRepository.findEntrepriseBySiren(pointAccueilDTO.getLocSiren());
        log.info("Partenaire : "+organismeComplementaire.getId()+" "+organismeComplementaire.getNom());

        EtablissementEntity etablissementEntity = EtablissementEntity.builder()
                .nom(pointAccueilDTO.getNom())
                .adresse1(pointAccueilDTO.getAdresse())
                .adresse2(pointAccueilDTO.getAdresse2())
                .adresse3(pointAccueilDTO.getAdresse3())
                .email(pointAccueilDTO.getEmail())
                .codePostal(pointAccueilDTO.getCodePostal())
                .cedex(pointAccueilDTO.getCedex())
                .ville(pointAccueilDTO.getVille())
                .telephone(pointAccueilDTO.getTelephone())
                .entreprise(entrepriseRepository.findEntrepriseBySiren(pointAccueilDTO.getLocSiren()))
                .dateCrea(LocalDateTime.now())
                .etat(EtatEnum.ACTIF)
                .build();

        if (pointAccueilDTO.getCodePostal()!=null) {
            etablissementEntity.setDepartement(DepartementRegionHelper.getDepartement(pointAccueilDTO.getCodePostal()));
            etablissementEntity.setRegion(DepartementRegionHelper.getRegion(pointAccueilDTO.getCodePostal()));
        }

        silentHistoryServiceWrapper.saveCreateObjectOperation(membreSessionDTO, etablissementEntity);

        return mapper.mapPaLpaToPaLPAReponseDTO(etablissementRepository.save(etablissementEntity));
    }

    public List<String> getPointAccueilRegion(String siren){
        return  etablissementRepository.findDistinctRegions(siren);
    }
    public List<String> getPointAccueilDepartement(String siren, String region){
        return  etablissementRepository.findDepartementsByRegion(siren, region);
    }

    public void deletePointAccueil(MembreSessionDTO membreSession, Long id) {
        Optional<EtablissementEntity> etablissementOptional = etablissementRepository.findById(id);
        if (etablissementOptional.isPresent()) {
            EtablissementEntity etablissement = etablissementOptional.get();
            etablissementRepository.deleteById(id);
            silentHistoryServiceWrapper.saveDeleteObjectOperation(membreSession, mapper.mapPaLpaToPaLPAReponseDTO(etablissement));
        }
    }

    public void updatePointAccueilById(MembreSessionDTO membreSession, PointAccueilReponseDTO pointAccueil) {
        if (pointAccueil == null) {
            log.error("PA is null");
            return;
        }
        String departement = "";
        String region ="";
        if(pointAccueil.getCodePostal()!= null && !pointAccueil.getCodePostal().isBlank()){
            departement = DepartementRegionHelper.getDepartement(pointAccueil.getCodePostal());
            region = DepartementRegionHelper.getRegion(pointAccueil.getCodePostal());
        }

        Optional<EtablissementEntity> etablissementOptional = etablissementRepository.findById(Long.valueOf(pointAccueil.getId()));

        if (etablissementOptional.isPresent()) {

            EtablissementEntity etablissementEntity = etablissementOptional.get();

            silentHistoryServiceWrapper.saveModifyObjectOperation(membreSession, etablissementEntity, pointAccueil);

            etablissementEntity.setNom(pointAccueil.getNom());
            etablissementEntity.setEmail(pointAccueil.getEmail());
            etablissementEntity.setTelephone(pointAccueil.getTelephone());
            etablissementEntity.setAdresse1(pointAccueil.getAdresse());
            etablissementEntity.setAdresse2(pointAccueil.getAdresse2());
            etablissementEntity.setAdresse3(pointAccueil.getAdresse3());
            etablissementEntity.setVille(pointAccueil.getVille());
            etablissementEntity.setCodePostal(pointAccueil.getCodePostal());
            etablissementEntity.setCedex(pointAccueil.getCedex());
            etablissementEntity.setDepartement(departement);
            etablissementEntity.setRegion(region);

            etablissementRepository.save(etablissementEntity);
        }
    }

}
