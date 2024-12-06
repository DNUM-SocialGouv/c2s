package fr.gouv.sante.c2s.service.mail;

import fr.gouv.sante.c2s.javamail.MailCoreService;
import fr.gouv.sante.c2s.model.dto.membre.MembreEquipeDTO;
import fr.gouv.sante.c2s.model.entity.MembreEntity;
import fr.gouv.sante.c2s.repository.MembreRepository;
import jakarta.mail.MessagingException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@AllArgsConstructor
@Slf4j
@Service
@Transactional
public class EmailBusinessService {

    private MailCoreService mailService;

    private final MembreRepository membreRepository;

    public MembreEntity getMembreByMail(String email) {
        List<MembreEntity> membreEntities = membreRepository.findMembreByEmail(email);
        if (!membreEntities.isEmpty()) {
            return membreEntities.get(0);
        }
        return null;
    }

    public void testEmail(String email) {
        mailService.sendTextMessage(email, new String[]{email}, "Test", "Contenu du test");
    }

    public boolean sendMailInscriptionValide(MembreEntity membre, String token, String resetUrl) {
        String title = "Inscription à l'espace Partenaires C2S validée";
        String resetLink = resetUrl.endsWith("/") ? resetUrl + "mon-espace/reset-password?token=" + token : resetUrl + "/mon-espace/reset-password?token=" + token;
        log.info(resetLink);
        String html = "<html>"
                +"<body>"
                +"Bonjour "+membre.getPrenom()+",<br/><br/>"
                +"Votre inscription à l'espace Partenaires de la C2S a été validée. Vous pouvez à présent définir votre mot de passe en suivant ce <a href='"+resetLink+"'>lien</a>.<br/><br/>"
                +"<br/>"
                //+"Votre identifiant correspond à l'adresse mail utilisée lors de votre inscription.<br/><br/>"
                +"A très vite au sein de votre espace !<br/><br/>"
                +"<b>L'équipe C2S</b>"
                +"</body>"
                +"</html>";
        try {
            mailService.sendHtmlMessage(null, new String[]{membre.getEmail()}, null, title, html);
            return true;
        } catch (Exception e) {
            log.error(e.getMessage());
            return false;
        }
    }

    public boolean sendMailInvitation(String baseUrl, MembreEntity membre, String email) {
        String title = "Invitation espace Partenaires C2S";
        String inscriptionLink = baseUrl.endsWith("/") ? baseUrl + "mon-espace/inscription"  : baseUrl + "/mon-espace/inscription" ;
        log.info(inscriptionLink);
        String html = "<html>"
                +"<body>"
                +"Bonjour,<br/><br/>"
                +membre.getPrenom()+" "+membre.getNom()+" vous invite à rejoindre son équipe au sein de l'espace Partenaires de la C2S, l'espace ressources " +
                "des caisses d'assurance maladie et des organismes complémentaires gestionnaires de la complémentaire santé solidaire."
                +"<br/><br/>"
                +"Cet espace vous permet : "
                +"<ul>"
                +"<li>D'accéder aux ressources mises à disposition par la Direction de la sécurité sociale</li>"
                +"<li>De compléter / modifier les informations concernant votre structure et ses points d'accueil</li>"
                +"<li>De signaler vos contacts référents</li>"
                +"</ul>"
                +"Pour y accéder, il est nécessaire de créer un compte avec votre adresse mail professionnelle."
                +"<br/><br/>"
                +"<a href='"+inscriptionLink+"'>Lien vers la page d'inscription - formulaire</a>"
                +"<br/><br/>"
                +"<b>L'équipe C2S</b>"
                +"</body>"
                +"</html>";
        log.info(html);
        try {
            mailService.sendHtmlMessage(null, new String[]{email}, null, title, html);
            return true;
        } catch (Exception e) {
            log.error(e.getMessage());
            return false;
        }
    }

    public boolean sendMailInvitationModerateur(String baseUrl, MembreEntity membre) {
        MembreEntity membreEntity = membreRepository.findMembreByEmail(membre.getEmail()).get(0);
        String title = "Invitation Modérateur C2S";
        String resetPassword = baseUrl.endsWith("/") ? baseUrl + "mon-espace/request-reset-password"  : baseUrl + "/mon-espace/request-reset-password" ;
        log.info(resetPassword);
        StringBuilder html = new StringBuilder("<html>");
        html.append("<body>");
        html.append("Bonjour "+membreEntity.getPrenom());
        html.append("<br/>");
        html.append(membreEntity.getCreateur()+" vous a ajouté à l'équipe des modérateurs de l'espace partenaires de la C2S.<br/>");
        html.append("Afin de choisir votre mot de passe et de finaliser la création de votre compte, veuillez cliquer sur le lien <a href="+resetPassword+">suivant</a>.<br/><br/>");
        html.append("L'équipe C2S");
        html.append("</body>");
        html.append("</html>");

        try {
            mailService.sendHtmlMessage(null, new String[]{membre.getEmail()}, null, title, html.toString());
            return true;
        } catch (Exception e) {
            log.error(e.getMessage());
            return false;
        }
    }

    public void sendResetPasswordEmail(String email, String emailSender, String resetUrl, String token) {
        if (!email.isBlank()) {
            MembreEntity membreEntity = getMembreByMail(email);
            if (membreEntity != null) {
                try {

                    String resetLink = resetUrl.endsWith("/")
                            ? resetUrl + "mon-espace/reset-password?token=" + token
                            : resetUrl + "/mon-espace/reset-password?token=" + token;

                    log.info(resetLink);

                    String htmlMsg = "<html>" +
                            "<body>" +
                            "Bonjour " + membreEntity.getPrenom() + " " + membreEntity.getNom() + ",<br>" +
                            "<br>" +
                            "Vous avez demandé la réinitialisation du mot de passe vous permettant d'accéder à votre Espace connecté C2S : " + membreEntity.getEmail() + "<br>" +
                            "<br>" +
                            "<a href='" + resetLink + "'>Définir votre mot de passe</a><br>" +
                            "Ce lien expirera dans 2 heures.<br>" +
                            "<br>" +
                            "Si vous n'êtes pas à l'origine de cette demande, vous pouvez ignorer cet e-mail.<br>" +
                            "________________________________________<br>" +
                            "L'équipe C2S<br>" +
                            "</body>" +
                            "</html>";

                    mailService.sendHtmlMessage(emailSender, new String[]{membreEntity.getEmail()}, null, "Réinitialisation de votre mot de passe", htmlMsg);

                } catch (MessagingException e) {
                    log.error(e.getMessage());
                }
            } else {
                log.error(email+" => pas de compte trouvé");
            }

        } else {
            log.warn("Aucune adresse email n'est renseignée pour le destinataire.");
        }
    }

    public void notifyErrorOnExport(Exception e) {
        try {
            String title = "serveur complementaire-sante-solidaire.gouv.fr - Rapport CRON export CSV en erreur";
            StringBuilder message = new StringBuilder("<p>Une erreur a été détectée lors de la génération des fichiers d'export CSV à destination de l'Assurance Maladie</p>\n");
            message.append("Erreur détectée :\n");
            message.append("<br />&bull; " + e.getMessage() + "\n");
            mailService.sendHtmlMessage(null, new String[]{"sbassgf@gmail.com"}, null, title, message.toString());
        } catch (Exception ex) {
            log.error(ex.getMessage());
        }
    }

    public void sendModerateurDailyChange(String content) {
        try {
            mailService.sendHtmlMessage(null, getModerateurEmails(), null, "[C2S] Modifications des dernières 24h", content.toString());
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }

    private String[] getModerateurEmails() {
        List<MembreEntity> moderateurs = membreRepository.getModerateurs();
        return moderateurs.stream().map(MembreEntity::getEmail)
                .toList()
                .toArray(new String[moderateurs.size()]);
    }

    public boolean sendMailMembreAModerer(List<MembreEquipeDTO> membres) {
        String prodLink = "https://www.complementaire-sante-solidaire.gouv.fr/mon-espace/admin/membres";
        String title = membres.size()==1
                ?"[C2S] Demande d'inscription à l'espace Partenaires"
                :"[C2S] Demandes d'inscription à l'espace Partenaires";
        String intro = membres.size()==1
                ?"une demande"
                :"des demandes";
        StringBuilder html = new StringBuilder("<html>");
        html.append("<body>");
        html.append("Vous avez reçu "+intro+" d’inscription à l’Espace partenaires de la C2S :");
        membres.forEach(it -> html.append(it.getPrenom()+" "+it.getNom()+" "+it.getSociete()+"<br/>"));
        html.append("<br/>");
        html.append("<a href=\""+prodLink+"\">Lien vers la modération</a>");
        html.append("</body>");
        html.append("</html>");
        log.info(html.toString());
        try {
            mailService.sendHtmlMessage(null, getModerateurEmails(), null, title, html.toString());
            return true;
        } catch (Exception e) {
            log.error(e.getMessage());
            return false;
        }
    }
}
