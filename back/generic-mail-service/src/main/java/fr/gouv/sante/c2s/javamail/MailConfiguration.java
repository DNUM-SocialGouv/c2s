package fr.gouv.sante.c2s.javamail;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.*;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Component;

import java.util.Properties;

@Configuration
@Component
@Data
@PropertySources({
        @PropertySource(value = "classpath:smtp.properties", ignoreResourceNotFound = true),
        @PropertySource(value = "file:/etc/c2s.properties", ignoreResourceNotFound = true)
})
public class MailConfiguration {

    @Value("${smtp.host}")
    private String smtpHost;

    @Value("${smtp.port}")
    private Integer smtpPort;

    @Value("${smtp.username}")
    private String smtpUsername;

    @Value("${smtp.password}")
    private String smtpPassword;

    @Value("${smtp.param.mail.debug}")
    private Boolean paramMailDebug;

    @Value("${smtp.param.auth}")
    private Boolean paramAuth;

    @Value("${smtp.param.starttls.enable}")
    private Boolean paramStarttlsEnable;

    @Value("${smtp.bcc.mail}")
    private String emailBcc;

    @Value("${smtp.from.mail}")
    private String emailFrom;

    @Bean
    public MailProperties getEmailProperties() {
        return MailProperties.builder().bcc(emailBcc).from(emailFrom).build();
    }

    @Bean
    public JavaMailSender getJavaMailSender() {

        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();

        if (smtpHost!=null)
            mailSender.setHost(smtpHost);

        if (smtpPort!=null)
            mailSender.setPort(smtpPort);

        if (smtpUsername!=null)
            mailSender.setUsername(smtpUsername);

        if (smtpPassword!=null)
            mailSender.setPassword(smtpPassword);

        Properties props = mailSender.getJavaMailProperties();

        props.put("mail.transport.protocol", "smtp");

        if (paramAuth!=null)
            props.put("mail.smtp.auth", paramAuth);

        if (paramStarttlsEnable!=null)
            props.put("mail.smtp.starttls.enable", paramStarttlsEnable);

        if (paramMailDebug!=null)
            props.put("mail.debug", paramMailDebug);

        return mailSender;
    }

}
