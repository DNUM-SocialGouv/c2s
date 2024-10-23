package fr.gouv.sante.c2s.javamail;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;


@Service
@AllArgsConstructor
public class MailCoreService {

    private static final String CONTENT_TYPE_HTML = "text/html; charset=ISO-8859-1";

    private JavaMailSender mailSender;

    private MailProperties emailProps;

    public void sendTextMessage(String from, String[] to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(from!=null ? from : emailProps.getFrom());
        message.setTo(to);
        message.setReplyTo(from!=null ? from : emailProps.getFrom());
        message.setSubject(subject);
        if (emailProps!=null && emailProps.getBcc()!=null) {
            message.setBcc(emailProps.getBcc());
        }
        message.setText(text);
        mailSender.send(message);
    }

    public void sendHtmlMessage(String from, String[] to, String[] copies, String subject, String text) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setFrom(from!=null ? from : emailProps.getFrom());
        helper.setTo(to);
        if (copies!=null && copies.length>0) {
            helper.setCc(copies);
        }
        helper.setReplyTo(from!=null ? from : emailProps.getFrom());
        if (emailProps!=null && emailProps.getBcc()!=null) {
            helper.setBcc(emailProps.getBcc());
        }
        helper.setSubject(subject);
        message.setContent(text, CONTENT_TYPE_HTML);
        mailSender.send(message);
    }

}
