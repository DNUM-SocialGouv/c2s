package fr.gouv.sante.c2s.job.mail;

import fr.gouv.sante.c2s.model.FeatureFlag;
import fr.gouv.sante.c2s.model.dto.membre.MembreEquipeDTO;
import fr.gouv.sante.c2s.service.MembreService;
import fr.gouv.sante.c2s.service.mail.EmailBusinessService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Slf4j
@Component
@PropertySource(value = {"classpath:job-wrapper.properties"})
public class MailNewMembreWaitingValidationJob {

    @Value("${sentry.environnement}")
    private String environnement;

    private MembreService membreService;

    private EmailBusinessService emailBusinessService;

    private Set<String> emails;

    @Autowired
    public MailNewMembreWaitingValidationJob(MembreService membreService, EmailBusinessService emailBusinessService) {

        this.membreService = membreService;
        this.emailBusinessService = emailBusinessService;
        this.emails = new HashSet<>();
    }

    @Scheduled(cron = "${job.new.membre.waiting.validation}")
    public void execute() {

        if ("prod".equalsIgnoreCase(environnement) || FeatureFlag.MAIL_ON_NEW_MEMBRE_WAITING_VALIDATION) {

            List<MembreEquipeDTO> membres = membreService.getMembresEnAttenteModeration();
            if (membres != null && !membres.isEmpty()) {
                List<MembreEquipeDTO> filtered = membres.stream().filter(m -> !emails.contains(m.getEmail())).toList();
                log.info("Notification mail > Modération membre");
                if (!filtered.isEmpty()) {
                    emailBusinessService.sendMailMembreAModerer(filtered);
                }
            }

            if (membres != null && !membres.isEmpty()) {
                membres.forEach(m -> emails.add(m.getEmail()));
            }
        }
    }
}