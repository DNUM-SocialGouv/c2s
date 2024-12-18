package fr.gouv.sante.c2s.job.mail;

import fr.gouv.sante.c2s.model.FeatureFlag;
import fr.gouv.sante.c2s.model.GroupeEnum;
import fr.gouv.sante.c2s.model.dto.membre.MembreInfoDTO;
import fr.gouv.sante.c2s.model.dto.resource.RessourceFichierDTO;
import fr.gouv.sante.c2s.service.MembreService;
import fr.gouv.sante.c2s.service.mail.EmailBusinessService;
import fr.gouv.sante.c2s.service.partenaire.PartenaireRessourceService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.*;
import java.time.chrono.ChronoLocalDateTime;
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.List;

@Slf4j
@Component
@PropertySource(value = {"classpath:job-wrapper.properties"})
public class MailNewRessourcesNotificationJob {

    @Value("${sentry.environnement}")
    private String environnement;

    private PartenaireRessourceService partenaireRessourceService;
    private EmailBusinessService emailBusinessService;
    private MembreService membreService;

    public static Boolean ACTIVATED = false;

    @Autowired
    public MailNewRessourcesNotificationJob(PartenaireRessourceService partenaireRessourceService, EmailBusinessService emailBusinessService, MembreService membreService) {
        this.partenaireRessourceService = partenaireRessourceService;
        this.emailBusinessService = emailBusinessService;
        this.membreService = membreService;
    }

    @Scheduled(cron = "${job.new.ressources.notification}")
    public void execute() {

        log.info("Launch the job");
        GroupeEnum[] groupes = {GroupeEnum.ORGANISME_COMPLEMENTAIRE, GroupeEnum.CAISSE};

        if ("prod".equals(environnement) || FeatureFlag.MAIL_ON_NEW_RESOURCE) {

            for (GroupeEnum groupe : groupes) {
                log.info("Execution "+groupe.name());
                List<RessourceFichierDTO> fichiers = partenaireRessourceService.getRessourceFichiers(null, null, null, groupe)
                        .stream().filter(it -> isYesterday(it.getDateCrea())).toList();
                List<MembreInfoDTO> membres = membreService.getMembreActifByGroupe(groupe);

                log.info("Membres : "+membres.size());
                log.info("Fichiers : "+fichiers.size());

                if (membres != null && !membres.isEmpty() && fichiers != null && !fichiers.isEmpty()) {
                    log.info("Pass");
                    emailBusinessService.sendMailNewRessourcesByGroupe(membres, fichiers, groupe);
                }
            }
        }
    }

    public static boolean isYesterday(LocalDateTime dateTime) {
        // Obtenir la date actuelle
        LocalDate today = LocalDate.now();
        // Calculer la date d'hier
        LocalDate yesterday = today.minusDays(1);
        System.out.println(yesterday+" compare "+dateTime);
        // Comparer uniquement la partie date
        return dateTime.toLocalDate().isEqual(yesterday);
    }

    public static ChronoLocalDateTime<?> convertToChronoLocalDateTime(Calendar calendar) {
        // Obtenez l'Instant de l'objet Calendar
        Instant instant = calendar.toInstant();
        // Convertissez l'Instant en ZonedDateTime
        ZonedDateTime zonedDateTime = instant.atZone(ZoneId.systemDefault());
        // Renvoyez le ChronoLocalDateTime
        return zonedDateTime.toLocalDateTime();
    }

    private Calendar getCalendarLimit() {
        Calendar calendar = new GregorianCalendar();
        calendar.add(Calendar.DAY_OF_YEAR, -1);
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        return calendar;
    }
}