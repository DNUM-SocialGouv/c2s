package fr.gouv.sante.c2s.service;

import fr.gouv.sante.c2s.csv.CsvService;
import fr.gouv.sante.c2s.csv.CsvWriterConfig;
import fr.gouv.sante.c2s.model.GroupeEnum;
import fr.gouv.sante.c2s.model.entity.MembreEntity;
import fr.gouv.sante.c2s.model.entity.EntrepriseEntity;
import fr.gouv.sante.c2s.model.entity.EtablissementEntity;
import fr.gouv.sante.c2s.repository.MembreRepository;
import fr.gouv.sante.c2s.repository.EntrepriseRepository;
import fr.gouv.sante.c2s.repository.EtablissementRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.nio.charset.StandardCharsets;

@AllArgsConstructor
@Slf4j
@Service
@Transactional
public class CsvBusinessService extends CsvService {

    private final EntrepriseRepository entrepriseRepository;
    private final EtablissementRepository etablissementRepository;
    private final MembreRepository membreRepository;

    public Long exportOcListActif(File file) throws Exception {
        log.info("Export des oc actifs : "+file.getAbsolutePath());
        String[] headers = new String[]{"ID", "SIREN", "NOM", "ADRESSE", "CODE POSTAL", "VILLE", "HABILITE", "SITE WEB"};
        return createCsv(file, StandardCharsets.ISO_8859_1, getCsvConfig(), headers, entrepriseRepository.findOrganismeComplementairesForCnam().stream(), this::convertPartenaireToLine);
    }

    public Long exportOCReferents(File file) throws Exception {
        log.info("Demande du CSV des référents Gestion C2S");
        String[] headers = new String[]{"Organisme", "Adresse", "CP", "Ville", "Nom", "Prénom"};
        return createCsv(file, getCsvConfig(), headers, membreRepository.getMembreActifByGroupe(GroupeEnum.ORGANISME_COMPLEMENTAIRE).stream()
                .filter(it -> it.getEntreprise()!=null)
                .filter(it -> it.getTypes()!=null && it.getTypes().length>0),
                this::convertMembreToReferentLine);
    }

    public String specificCnamCleanValue(String value) {

        if (value == null)
            return "";

        value = StringUtils.normalizeSpace(value);

        // custom
        value = value.replaceAll("\\\\", "");
        value = value.replaceAll("\"", "");

        // converti le caractere ‘ en '
        value = value.replace("&lsquo;", "'");
        value = value.replace("‘", "'");
        value = value.replace(String.valueOf((char) 145), "'");

        // converti le caractere ’ en '
        value = value.replace("&rsquo;", "'");
        value = value.replace("’", "'");
        value = value.replace(String.valueOf((char) 146), "'");

        // converti le caractere « et » en "
        value = value.replace("&laquo;", "\"");
        value = value.replace(String.valueOf((char) 171), "\""); // non-ASCII latin1
        value = value.replace("&raquo;", "\""); // »
        value = value.replace(String.valueOf((char) 187), "\""); // non-ASCII latin1

        // action sur retour de ligne
        value = value.replaceAll("\n\r", " - ");
        value = value.replaceAll("\r", " - ");
        value = value.replaceAll(System.lineSeparator(), " - ");
        value = value.replace(" -  - "," - ");

        // autres caractères
        value = value.replace("  ", " ");
        value = value.replace("–", "-"); // attention, le premier tiret est particulier à word
        value = value.replace("&hellip;", "...");
        value = value.replace("&euro;", "€");
        value = value.replace("&ndash;", "-");
        value = value.replace("&bull;", "*");
        value = value.replace("&ldquo;", "\"");
        value = value.replace("&rdquo;", "\"");

        //value = value.replace("\"","\"\""); // double les guillemets

        // decode l'UTF en ISO-8859-1
        //value = new String(value.getBytes(), StandardCharsets.ISO_8859_1);

        // decode les caracteres HTML en ISO-8859-1
        //value = StringEscapeUtils.unescapeHtml4(value);

        //return "\"" + value + "\"";
        return  value;
    }

    private String[] convertPartenaireToLine(EntrepriseEntity entrepriseEntity) {
        String[] array = new String[8];
        array[0] = specificCnamCleanValue(entrepriseEntity.getId().toString());
        array[1] = specificCnamCleanValue(entrepriseEntity.getSiren());
        array[2] = specificCnamCleanValue(entrepriseEntity.getNom());
        array[3] = specificCnamCleanValue(entrepriseEntity.getAdresse());
        array[4] = specificCnamCleanValue(entrepriseEntity.getCodePostal());
        array[5] = specificCnamCleanValue(entrepriseEntity.getVille());
        // si la ligne est présente alors habilité = oui
        array[6] = specificCnamCleanValue("oui");
        array[7] = specificCnamCleanValue(entrepriseEntity.getSiteWeb());
        return array;
    }

    private String[] convertMembreToReferentLine(MembreEntity membreEntity) {
        String[] array = new String[8];
        array[0] = membreEntity.getSociete();
        array[1] = membreEntity.getEntreprise().getAdresse();
        array[2] = membreEntity.getEntreprise().getCodePostal();
        array[3] = membreEntity.getEntreprise().getVille();
        array[4] = membreEntity.getNom();
        array[5] = membreEntity.getPrenom();
        return array;
    }

    public Long exportPointAccueilListActifOnOcActif(File file) throws Exception {
        log.info("Export des pa actifs sur les oc actifs : "+file.getAbsolutePath());
        String[] headers = new String[]{"ID", "SIREN", "NOM", "ADRESSE 1", "ADRESSE 2", "ADRESSE 3", "CODE POSTAL", "VILLE", "CEDEX", "TELEPHONE", "FAX", "EMAIL"};
        return createCsv(file, StandardCharsets.ISO_8859_1, getCsvConfig(), headers, etablissementRepository.findPointAccueilActifOnOcActif().stream(), this::convertPointAccueilToLine);
    }

    private String[] convertPointAccueilToLine(EtablissementEntity etablissementEntity) {
        String[] array = new String[12];
        array[0] = specificCnamCleanValue(etablissementEntity.getId().toString());
        array[1] = specificCnamCleanValue(etablissementEntity.getEntreprise().getSiren());
        array[2] = specificCnamCleanValue(etablissementEntity.getNom());
        array[3] = specificCnamCleanValue(etablissementEntity.getAdresse1());
        array[4] = specificCnamCleanValue(etablissementEntity.getAdresse2());
        array[5] = specificCnamCleanValue(etablissementEntity.getAdresse3());
        array[6] = specificCnamCleanValue(etablissementEntity.getCodePostal());
        array[7] = specificCnamCleanValue(etablissementEntity.getVille());
        array[8] = specificCnamCleanValue(etablissementEntity.getCedex());
        array[9] = specificCnamCleanValue(etablissementEntity.getTelephone());
        array[10] = ""; // FAX PAS DANS LE MODEL
        array[11] = specificCnamCleanValue(etablissementEntity.getEmail());
        return array;
    }

    private CsvWriterConfig getCsvConfig() {
        return CsvWriterConfig.builder()
                .separatorChar(';')
                .quoteChar('\"')
                //.escapeChar('\n')
                .lineEnd("\r\n").build();
    }
}
