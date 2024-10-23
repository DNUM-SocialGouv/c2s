package fr.gouv.sante.c2s.service.moderateur;

import fr.gouv.sante.c2s.model.EtatEnum;
import fr.gouv.sante.c2s.model.GroupeEnum;
import fr.gouv.sante.c2s.model.dto.OrganismeComplementaireWithPointAccueilCountDTO;
import fr.gouv.sante.c2s.model.dto.PointAccueilReponseDTO;
import fr.gouv.sante.c2s.repository.EntrepriseRepository;
import fr.gouv.sante.c2s.repository.EtablissementRepository;
import fr.gouv.sante.c2s.repository.mapper.Mapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@Slf4j
@Transactional
public class ModerateurEtablissementService {

    EntrepriseRepository entrepriseRepository;
    EtablissementRepository etablissementRepository;
    Mapper mapper;

    @Autowired
    public ModerateurEtablissementService(EntrepriseRepository entrepriseRepository,
                                          EtablissementRepository etablissementRepository,
                                          Mapper mapper) {
        this.entrepriseRepository = entrepriseRepository;
        this.etablissementRepository = etablissementRepository;
        this.mapper = mapper;
    }

    public List<String> getRegions() {
        return entrepriseRepository.getRegions()
                .stream()
                .filter(Objects::nonNull)
                .filter(it -> !it.isEmpty())
                .collect(Collectors.toList());
    }

    public List<String> getDepartements() {
        return entrepriseRepository.getDepartements()
                .stream()
                .filter(Objects::nonNull)
                .filter(it -> !it.isEmpty())
                .collect(Collectors.toList());
    }

    public Long getPointsAccueilCount() {
        return etablissementRepository.getPointAccueilActifOnOcActifCount();
    }

    public Long getOrganismeComplementairesActifsCount() {
        return entrepriseRepository.getOrganismeComplementairesActifsCount();
    }

    public List<OrganismeComplementaireWithPointAccueilCountDTO> searchPartenaire(String search, GroupeEnum groupe, String region, String departement, EtatEnum etat, Pageable pageable) {
        if (search!=null) {
            search = "%"+search+"%";
        }
        List<GroupeEnum> groupes = new ArrayList<>();
        if (groupe != null) {
            groupes.add(groupe);
        } else {
            groupes.add(GroupeEnum.ORGANISME_COMPLEMENTAIRE);
            groupes.add(GroupeEnum.CAISSE);
        }
        return entrepriseRepository.searchEntreprise(search, groupes, region, departement, etat, pageable);
    }

    public Long countPartenaire(String search, GroupeEnum groupe, String region, String departement, EtatEnum etat) {
        if (search!=null) {
            search = "%"+search+"%";
        }
        List<GroupeEnum> groupes = new ArrayList<>();
        if (groupe != null) {
            groupes.add(groupe);
        } else {
            groupes.add(GroupeEnum.ORGANISME_COMPLEMENTAIRE);
            groupes.add(GroupeEnum.CAISSE);
        }
        return entrepriseRepository.countEntreprise(search, groupes, region, departement, etat);
    }

    public List<PointAccueilReponseDTO> getEtablissements(Long entrepriseId, Pageable pageable) {
        return etablissementRepository.getEtablissementsActifsByEntreprise(entrepriseId, pageable).stream().map(mapper::mapPaLpaToPaLPAReponseDTO).collect(Collectors.toList());
    }

    public Long getEtablissementsCount(Long entrepriseId) {
        return etablissementRepository.getEtablissementsActifsCountByEntreprise(entrepriseId);
    }

}