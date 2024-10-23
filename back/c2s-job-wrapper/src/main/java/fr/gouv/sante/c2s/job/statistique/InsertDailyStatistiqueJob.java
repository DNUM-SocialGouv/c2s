package fr.gouv.sante.c2s.job.statistique;

import fr.gouv.sante.c2s.service.DailyStatistiqueService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class InsertDailyStatistiqueJob {

    DailyStatistiqueService dailyStatistiqueService;

    @Autowired
    public InsertDailyStatistiqueJob(DailyStatistiqueService dailyStatistiqueService) {
        this.dailyStatistiqueService = dailyStatistiqueService;
    }

    @Scheduled(cron = "${job.set.daily.statistique}")
    public void execute() {
        log.info("Lancement du job");
        dailyStatistiqueService.createDailyStatistique();
    }

}
