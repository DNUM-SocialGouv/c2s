package fr.gouv.sante.c2s.job.maintenance;

import fr.gouv.sante.c2s.service.history.HistoryService;
import io.sentry.Sentry;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class DeleteOldHistoricOperationsMaintenanceJob {

    HistoryService historyService;

    @Autowired
    public DeleteOldHistoricOperationsMaintenanceJob(HistoryService historyService) {
        this.historyService = historyService;
    }

    @Scheduled(cron = "${job.delete.historic.operations}") // 24 heures
    public void execute() {

        try {

            log.info("Lancement du job");
            historyService.deleteOldHistoric(3);

        } catch (Exception e) {
            log.error(e.getMessage());
            Sentry.captureException(e);
        }
    }

}
