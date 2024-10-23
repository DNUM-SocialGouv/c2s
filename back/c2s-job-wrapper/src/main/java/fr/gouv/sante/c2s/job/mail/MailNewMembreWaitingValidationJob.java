package fr.gouv.sante.c2s.job.mail;

import fr.gouv.sante.c2s.model.dto.MembreEquipeDTO;
import fr.gouv.sante.c2s.service.MembreService;
import fr.gouv.sante.c2s.service.mail.EmailBusinessService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
@PropertySource(value = {"classpath:job-wrapper.properties"})
public class MailNewMembreWaitingValidationJob {

    @Value("${sentry.environnement}")
    private String environnement;

    private MembreService membreService;

    private EmailBusinessService emailBusinessService;

    @Autowired
    public MailNewMembreWaitingValidationJob(MembreService membreService, EmailBusinessService emailBusinessService) {
        this.membreService = membreService;
        this.emailBusinessService = emailBusinessService;
    }

    @Scheduled(cron = "${job.new.membre.waiting.validation}")
    public void execute() {

        if (true || environnement.equals("prod")) {

            List<MembreEquipeDTO> membres = membreService.getMembresEnAttenteModeration();
            if (membres!=null && !membres.isEmpty()) {
                log.info("Notification mail > Modération membre");
                emailBusinessService.sendMailMembreAModerer(membres);
            }
        }
    }

}
