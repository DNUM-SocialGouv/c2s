package fr.gouv.sante.c2s.tomcat;

import com.nilhcem.fakesmtp.FakeSMTP;
import fr.gouv.sante.c2s.model.C2SConstants;
import io.sentry.Sentry;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.io.IOException;
import java.net.ConnectException;
import java.net.Socket;

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
    }

    @PostConstruct
    public void init() {
        if (SENTRY_FOR_LOCAL_ENVIRONMENT) {
            Sentry.init(options -> {
                options.setDsn("https://491ed91f246b62561761d64588c07514@sentry.fabrique.social.gouv.fr/109");
                options.setEnvironment(sentryEnvironment);
                options.setRelease(C2SConstants.CURRENT_VERSION);
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
