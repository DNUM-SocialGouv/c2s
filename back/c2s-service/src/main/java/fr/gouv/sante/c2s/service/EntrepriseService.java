package fr.gouv.sante.c2s.service;

import fr.gouv.sante.c2s.model.GroupeEnum;
import fr.gouv.sante.c2s.model.entity.EntrepriseEntity;
import fr.gouv.sante.c2s.repository.EntrepriseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
public class EntrepriseService {

    @Autowired
    EntrepriseRepository entrepriseRepository;

    public EntrepriseService(EntrepriseRepository entrepriseRepository) {
        this.entrepriseRepository = entrepriseRepository;
    }

    public void createEntreprise(String siren, String raisonSociale, GroupeEnum group) {
        entrepriseRepository.save(EntrepriseEntity.builder()
                        .siren(siren)
                        .groupe(group)
                        .nom(raisonSociale).build());
    }

}
