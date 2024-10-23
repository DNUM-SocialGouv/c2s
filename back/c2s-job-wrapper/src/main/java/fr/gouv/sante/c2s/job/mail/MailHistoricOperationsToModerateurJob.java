package fr.gouv.sante.c2s.job.mail;

import fr.gouv.sante.c2s.model.dto.HistoryOperationDTO;
import fr.gouv.sante.c2s.service.mail.EmailBusinessService;
import fr.gouv.sante.c2s.service.moderateur.ModerateurHistoricReaderService;
import io.sentry.Sentry;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
@PropertySource(value = {"classpath:job-wrapper.properties"})
public class MailHistoricOperationsToModerateurJob {

    ModerateurHistoricReaderService historicService;
    EmailBusinessService mailService;

    @Autowired
    public MailHistoricOperationsToModerateurJob(ModerateurHistoricReaderService historicService,
                                                 EmailBusinessService mailService) {
        this.historicService = historicService;
        this.mailService = mailService;
    }

    @Scheduled(cron = "${job.mail.historic.operations.to.moderateur}")
    public void execute() {

        try {

            log.info("Lancement du job");

            List<HistoryOperationDTO> operations = historicService.getModificationOperationsForModerateurOnLastXHours(24);

            if (operations != null && !operations.isEmpty()) {
                String content = buildContent(operations);
                mailService.sendModerateurDailyChange(content);
            }

        } catch (Exception e) {
            log.error(e.getMessage());
            Sentry.captureException(e);
        }
    }

    private String buildContent(List<HistoryOperationDTO> operations) {
        StringBuilder sb = new StringBuilder();
        for (HistoryOperationDTO operation : operations) {
            sb.append(operation.getEntrepriseNom());
            sb.append(" > " + operation.getMembreInformations());
            sb.append(" > " + operation.getSection());
            sb.append(" > " + operation.getActionLabel());
            sb.append("<br/><br/>");
        }
        return sb.toString();
    }
}
