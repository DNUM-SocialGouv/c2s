package fr.gouv.sante.c2s.export;

import fr.gouv.sante.c2s.file.FileService;
import fr.gouv.sante.c2s.json.JsonService;
import fr.gouv.sante.c2s.model.C2SConstants;
import fr.gouv.sante.c2s.service.CsvBusinessService;
import fr.gouv.sante.c2s.service.mail.EmailBusinessService;
import fr.gouv.sante.c2s.model.dto.export.ExportFileDataDTO;
import fr.gouv.sante.c2s.model.dto.export.ExportGeneralDataDTO;
import fr.gouv.sante.c2s.model.dto.export.ExportSafeAmeliDTO;
import fr.gouv.sante.c2s.security.SecurityService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.File;
import java.nio.file.Path;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Slf4j
@Component
public class ExportDataToCnam {

    @Autowired
    FileService fileService;

    @Autowired
    SecurityService securityService;

    @Autowired
    EmailBusinessService mailService;

    @Autowired
    CsvBusinessService csvService;

    @Autowired
    JsonService jsonService;

    public void launch() {

        try {

            File zip = getZipFile();
            Path path = zip.toPath();
            log.info("Export path : "+path);

            File exportFile = fileService.getWorkingFile(zip.getName(), C2SConstants.ApplicationDirectory.EXPORT_CNAM);
            fileService.copy(zip, exportFile);

        } catch (Exception e) {
            //e.printStackTrace();
            log.error(e.getMessage());
            mailService.notifyErrorOnExport(e);
        }
    }

    public synchronized File getZipFile() throws Exception {
        deleteOldFiles();

        File zip = getPreviousZipFile();

        if (zip == null) {
            zip = createZipFile();
        }

        return zip;
    }

    private void deleteOldFiles() {
        // delete 30 min old files
        Instant thirtyMinutesAgo = Instant.now().minus(ExportConstants.Common.MAX_MINUTES_EXPORT_VALID, ChronoUnit.MINUTES);
        fileService.deleteTempFiles(file -> file.getName().startsWith(ExportConstants.Common.PREFIX_FILE), file -> Instant.ofEpochMilli(file.lastModified()).isBefore(thirtyMinutesAgo));
    }

    private File getPreviousZipFile() {
        return fileService.searchOneTempFile((file -> file.getName().startsWith(ExportConstants.Common.PREFIX_FILE) && file.getName().endsWith("zip")));
    }

    private File createZipFile() throws Exception {

        String prefix = "sauv_export_datas";

        String uniqId = securityService.getUniqueId();
        File exportOc = fileService.getTempFile(prefix + "-" + ExportConstants.Oc.EXPORT_FILE_NAME + "-" + uniqId + ".csv");
        File exportPointAccueil = fileService.getTempFile(prefix + "-" + ExportConstants.Pa.EXPORT_FILE_NAME + "-" + uniqId + ".csv");
        File exportGeneral = fileService.getTempFile(prefix + "-" + ExportConstants.General.EXPORT_FILE_NAME + "-" + uniqId + ".json");

        Long lineExportOc = csvService.exportOcListActif(exportOc);
        Long lineExportPointAccueil = csvService.exportPointAccueilListActifOnOcActif(exportPointAccueil);

        ExportSafeAmeliDTO export = ExportSafeAmeliDTO.builder().build();

        ExportFileDataDTO exportOcDto = ExportFileDataDTO.builder()
                .fichierNom(exportOc.getName())
                .fichierChecksumSha1(securityService.getChecksumSha1(exportOc))
                .nbLignes(lineExportOc)
                .fichierDescription(ExportConstants.Oc.FILE_DESCRIPTION)
                .nbColonnes(ExportConstants.Oc.LIST_NB_COLUMN)
                .build();

        ExportFileDataDTO exportPaDto = ExportFileDataDTO.builder()
                .fichierNom(exportPointAccueil.getName())
                .fichierChecksumSha1(securityService.getChecksumSha1(exportPointAccueil))
                .nbLignes(lineExportPointAccueil)
                .fichierDescription(ExportConstants.Pa.FILE_DESCRIPTION)
                .nbColonnes(ExportConstants.Pa.LIST_NB_COLUMN)
                .build();

        ExportGeneralDataDTO exportGeneralDto = ExportGeneralDataDTO.builder()
                .scriptSocieteAuteur(ExportConstants.General.AUTHOR)
                .scriptSocieteProprietaire(ExportConstants.General.OWNER)
                .scriptVersion(ExportConstants.General.SCRIPT_VERSION)
                .scriptCreationDate(ExportConstants.General.SCRIPT_CREATION_DATE)
                .scriptExecutionDate(new Date())
                .scriptExecutionUniqid(uniqId).build();

        export.setListeOcLoc(exportOcDto);
        export.setListePaLpa(exportPaDto);
        export.setGeneral(exportGeneralDto);

        jsonService.saveObjectToFile(export, exportGeneral);

        return fileService.createZipFile(ExportConstants.Common.PREFIX_FILE + "-" + uniqId + ".zip", exportOc, exportPointAccueil, exportGeneral);
    }
}
