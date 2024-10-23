package fr.gouv.sante.c2s.job.cnam;

import fr.gouv.sante.c2s.export.ExportDataToCnam;
import io.sentry.Sentry;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@NoArgsConstructor
@Slf4j
public class GenerateDataToCnamJob {

    ExportDataToCnam exportDataToCnam;

    @Autowired
    public GenerateDataToCnamJob(ExportDataToCnam exportDataToCnam) {
        this.exportDataToCnam = exportDataToCnam;
    }

    @Scheduled(cron = "${job.generate.export.cnam}")
    public void execute() {

        try {

            log.info("Lancement du job");
            exportDataToCnam.launch();

        } catch (Exception e) {
            log.error(e.getMessage());
            Sentry.captureException(e);
        }
    }

}
