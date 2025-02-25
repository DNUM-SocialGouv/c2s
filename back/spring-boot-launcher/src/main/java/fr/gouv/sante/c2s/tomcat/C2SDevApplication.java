package fr.gouv.sante.c2s.tomcat;

import com.nilhcem.fakesmtp.FakeSMTP;
import fr.gouv.sante.c2s.model.C2SConstants;
import io.sentry.Sentry;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.io.File;
import java.io.IOException;
import java.net.ConnectException;
import java.net.Socket;
import java.util.Arrays;
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.Objects;

@Slf4j
@SpringBootApplication
@EnableScheduling
@EnableJpaRepositories("fr.gouv.sante.c2s.*")
@EntityScan("fr.gouv.sante.c2s.*")
@ComponentScan(basePackages = {"fr.gouv.sante.c2s"})
public class C2SDevApplication implements ApplicationListener<ContextRefreshedEvent> {

    private static final boolean SENTRY_FOR_LOCAL_ENVIRONMENT = false;

    @Value("${sentry.environnement}")
    private String sentryEnvironment;

    public static void main(String[] args) {
        SpringApplication.run(C2SDevApplication.class, args);
        cleanEmailRecusFolder();
    }

    @PostConstruct
    public void init() {
        if (SENTRY_FOR_LOCAL_ENVIRONMENT) {
            Sentry.init(options -> {
                options.setDsn("https://bfb2d6daaabbc60f96008274e353047c@sentry2.fabrique.social.gouv.fr/30");
                options.setEnvironment(sentryEnvironment);
                options.setRelease(C2SConstants.CURRENT_VERSION);
            });
        }
    }

    /**
     * Avec les configurations basses en dev (toutes les minutes par exemple)
     * les envois de mail sont plus fréquents
     */
    private static void cleanEmailRecusFolder() {
        File file = new File("emails-recus");
        if (file.isDirectory()) {
            Calendar calendar = new GregorianCalendar();
            calendar.add(Calendar.HOUR_OF_DAY, -5);
            Arrays.stream(Objects.requireNonNull(file.listFiles())).forEach(it -> {
                if (it.isFile()) {
                    if (it.lastModified() < calendar.getTime().getTime()) {
                        if (it.delete()) {
                            log.info("Suppression des emails reçus il y a plus de 5 heures : " + it.getAbsolutePath());
                        }
                    }
                }
            });

        }

    }

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        if (available(1688)) {
            FakeSMTP.main(new String[]{"-p1688", "-s", "-b"});
        }
    }

    private static boolean available(int port) throws IllegalStateException {
        try (Socket ignored = new Socket("localhost", port)) {
            return false;
        } catch (ConnectException e) {
            return true;
        } catch (IOException e) {
            throw new IllegalStateException("Error while trying to check open port", e);
        }
    }
}
