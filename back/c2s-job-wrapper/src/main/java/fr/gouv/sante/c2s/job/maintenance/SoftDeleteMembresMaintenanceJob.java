package fr.gouv.sante.c2s.job.maintenance;

import fr.gouv.sante.c2s.model.StatutMembreEnum;
import fr.gouv.sante.c2s.service.MembreService;
import io.sentry.Sentry;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class SoftDeleteMembresMaintenanceJob {

    MembreService membreService;

    @Autowired
    public SoftDeleteMembresMaintenanceJob(MembreService membreService) {
        this.membreService = membreService;
    }

    @Scheduled(cron = "${job.soft.delete.membres.inactifs}")
    public void execute() {

        try {

            log.info("Lancement du job");
            membreService.applySoftDelete(StatutMembreEnum.ACTIF,12);

        } catch (Exception e) {
            log.error(e.getMessage());
            Sentry.captureException(e);
        }
    }

}
