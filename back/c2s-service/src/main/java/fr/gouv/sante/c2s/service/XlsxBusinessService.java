package fr.gouv.sante.c2s.service;

import fr.gouv.sante.c2s.model.GroupeEnum;
import fr.gouv.sante.c2s.model.TypeMembreEnum;
import fr.gouv.sante.c2s.model.entity.MembreEntity;
import fr.gouv.sante.c2s.repository.MembreRepository;
import fr.gouv.sante.c2s.xlsx.XlsxService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.util.Arrays;

@AllArgsConstructor
@Slf4j
@Service
@Transactional
public class XlsxBusinessService extends XlsxService {

    private final MembreRepository membreRepository;

    public Long exportOCReferents(File file) throws Exception {
        log.info("Demande du CSV des référents Gestion C2S");
        String[] headers = new String[]{"Organisme", "Adresse", "CP", "Ville", "Nom", "Prénom", "Mail", "Téléphone"};
        int[] widths = new int[]{6000, 4000, 2500, 3000, 4000, 4000, 4500, 3000};
        return createXlsx(file, "Référents", widths, headers, membreRepository.getMembreActifByGroupe(GroupeEnum.ORGANISME_COMPLEMENTAIRE).stream()
                .filter(it -> it.getEntreprise()!=null)
                .filter(it -> it.getTypes()!=null && it.getTypes().length>0),
                this::convertMembreToReferentLine
        );
    }

    public Long exportOCReferentsToModerateur(File file) throws Exception {
        log.info("Demande du CSV des référents Gestion C2S");
        int[] widths = new int[]{5000, 5000, 1500, 4000, 5000, 5000, 5000, 3200, 3500, 4500, 5500};
        String[] headers = new String[]{"Organisme", "Adresse", "CP", "Ville", "Nom", "Prénom", "Mail", "Téléphone", "Gestion", "Statistiques", "Déclaration TSA"};
        return createXlsx(file, "Réferents", widths, headers, membreRepository.getMembreActifByGroupe(GroupeEnum.ORGANISME_COMPLEMENTAIRE).stream()
                        .filter(it -> it.getEntreprise()!=null)
                        .filter(it -> it.getTypes()!=null && it.getTypes().length>0),
                this::convertMembreToReferentLineToModerateur
        );
    }

    private String[] convertMembreToReferentLine(MembreEntity membreEntity) {
        String[] array = new String[8];
        array[0] = membreEntity.getSociete();
        array[1] = membreEntity.getEntreprise().getAdresse();
        array[2] = membreEntity.getEntreprise().getCodePostal();
        array[3] = membreEntity.getEntreprise().getVille();
        array[4] = membreEntity.getNom();
        array[5] = membreEntity.getPrenom();
        array[6] = membreEntity.getEmail();
        array[7] = membreEntity.getTelephone();
        return array;
    }

    private String[] convertMembreToReferentLineToModerateur(MembreEntity membreEntity) {
        String[] array = new String[11];
        array[0] = membreEntity.getSociete();
        array[1] = membreEntity.getEntreprise().getAdresse();
        array[2] = membreEntity.getEntreprise().getCodePostal();
        array[3] = membreEntity.getEntreprise().getVille();
        array[4] = membreEntity.getNom();
        array[5] = membreEntity.getPrenom();
        array[6] = membreEntity.getEmail();
        array[7] = membreEntity.getTelephone();
        array[8] = Arrays.stream(membreEntity.getTypes()).anyMatch(it -> it == TypeMembreEnum.GESTION) ? "Oui" : "Non";
        array[9] = Arrays.stream(membreEntity.getTypes()).anyMatch(it -> it == TypeMembreEnum.STATISTIQUES) ? "Oui" : "Non";
        array[10] = Arrays.stream(membreEntity.getTypes()).anyMatch(it -> it == TypeMembreEnum.DECLARATION_TSA) ? "Oui" : "Non";
        return array;
    }
}
