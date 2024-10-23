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
public class HardDeleteMembresMaintenanceJob {

    MembreService membreService;

    @Autowired
    public HardDeleteMembresMaintenanceJob(MembreService membreService) {
        this.membreService = membreService;
    }

    @Scheduled(cron = "${job.hard.delete.membres.inactifs}")
    public void execute() {

        try {

            log.info("Lancement du job");
            log.info("Hard delete : REFUSE + 6 mois");
            membreService.applyHardDelete(StatutMembreEnum.REFUSE,6);
            log.info("Hard delete : INACTIF + 15 mois");
            membreService.applyHardDelete(StatutMembreEnum.INACTIF, 15);

        } catch (Exception e) {
            log.error(e.getMessage());
            Sentry.captureException(e);
        }
    }

}
