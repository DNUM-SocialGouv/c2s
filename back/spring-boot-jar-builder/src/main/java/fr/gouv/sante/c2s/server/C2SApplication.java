package fr.gouv.sante.c2s.server;

import fr.gouv.sante.c2s.model.C2SConstants;
import io.sentry.Sentry;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication()
@EnableScheduling
@EnableJpaRepositories("fr.gouv.sante.c2s.*")
@EntityScan("fr.gouv.sante.c2s.*")
@ComponentScan(basePackages = {"fr.gouv.sante.c2s"})
public class C2SApplication {

    @Value("${sentry.environnement}")
    private String sentryEnvironnement;

    public static void main(String[] args) {
        SpringApplication.run(C2SApplication.class, args);
    }

    @PostConstruct
    public void init() {
        Sentry.init(options -> {
            options.setDsn("https://bfb2d6daaabbc60f96008274e353047c@sentry2.fabrique.social.gouv.fr/30");
            options.setEnvironment(sentryEnvironnement);
            options.setRelease(C2SConstants.CURRENT_VERSION);
        });

    }

}
