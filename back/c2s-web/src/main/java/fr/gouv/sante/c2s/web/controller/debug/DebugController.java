package fr.gouv.sante.c2s.web.controller.debug;

import fr.gouv.sante.c2s.export.ExportDataToCnam;
import fr.gouv.sante.c2s.model.C2SConstants;
import fr.gouv.sante.c2s.model.GroupeEnum;
import fr.gouv.sante.c2s.model.entity.MembreEntity;
import fr.gouv.sante.c2s.repository.MembreRepository;
import fr.gouv.sante.c2s.service.mail.EmailBusinessService;
import fr.gouv.sante.c2s.model.dto.session.MembreSessionDTO;
import fr.gouv.sante.c2s.web.session.MembreSessionManager;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@Tag(name = "[Debug]", description = "Ce controleur permets de tester des fonctionnalités ou de by passer le login")
@Slf4j
@RestController()
@RequestMapping("/debug")
public class DebugController {

    @Autowired
    private ExportDataToCnam exportDataToCnam;

    @Autowired
    private EmailBusinessService emailBusinessService;

    @Autowired
    private MembreRepository membreRepository;

    @GetMapping("/test")
    public String testSimple() {
        return "OK";
    }

    /*
    @GetMapping("/export_cnam")
    public ResponseEntity doExportCnam() {
        try {

            ResponseEntity.BodyBuilder bodyBuilder = ResponseEntity.ok();
            File file = exportDataToCnam.getZipFile();
            try (FileInputStream fis = new FileInputStream(file.getAbsolutePath())) {
                bodyBuilder.contentType(MediaType.parseMediaType("application/zip"));
                byte[] bytes = IOUtils.toByteArray(fis, file.length());
                return bodyBuilder.body(bytes);
            }

        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }*/

    @GetMapping("/test_email")
    public void testEmail(@RequestParam("email") String email) {
        emailBusinessService.testEmail(email);
    }

    @GetMapping("/auto_login_back_as_moderateur")
    public ResponseEntity loginModerateurAuto(HttpServletRequest request) {
        if (request.getServerName().contains("localhost")) {
            MembreSessionDTO user = new MembreSessionDTO();
            user.setId(10562L);
            user.setEmail("c2s_user_moderateur@c2s.com");
            user.setNom("Modérateur");
            user.setPrenom("Test");
            user.setGroupe(GroupeEnum.MODERATEUR);
            request.getSession(true).setAttribute(MembreSessionManager.MEMBRE_SESSION_KEY, user);
            return ResponseEntity.ok("Connected");
        }
        return ResponseEntity.ok("Not connected");
    }

    @GetMapping("/auto_login_back_as_oc")
    public ResponseEntity loginOcAuto(HttpServletRequest request) {
        if (request.getServerName().contains("localhost")) {
            MembreSessionDTO user = new MembreSessionDTO();
            user.setId(2536L);
            user.setEmail("c2s_user_oc@c2s.com");
            user.setNom("Testeur");
            user.setPrenom("Compte de test");
            user.setSiren("775659923");
            user.setGroupe(GroupeEnum.ORGANISME_COMPLEMENTAIRE);
            request.getSession(true).setAttribute(MembreSessionManager.MEMBRE_SESSION_KEY, user);
            return ResponseEntity.ok("Connected");
        }
        return ResponseEntity.ok("Not connected");
    }

    @GetMapping("/auto_login_back_as_caisse")
    public ResponseEntity loginCaisseAuto(HttpServletRequest request) {
        if (request.getServerName().contains("localhost")) {
            MembreSessionDTO user = new MembreSessionDTO();
            user.setId(3L);
            user.setEmail("c2s_user_caisse@c2s.com");
            user.setNom("Caisse");
            user.setPrenom("Test");
            user.setGroupe(GroupeEnum.CAISSE);
            request.getSession(true).setAttribute(MembreSessionManager.MEMBRE_SESSION_KEY, user);
            return ResponseEntity.ok("Connected");
        }
        return ResponseEntity.ok("Not connected");
    }

    @GetMapping("/version")
    public ResponseEntity<String> getVersion() {
        return ResponseEntity.ok(C2SConstants.CURRENT_VERSION);
    }

    class SentryDNUMException extends RuntimeException {}

    @GetMapping("/launch_bug")
    public ResponseEntity<String> launchBug() {
        throw new SentryDNUMException();
    }

    @GetMapping("/change-member-date")
    public String changeMemberDate(@RequestParam("email") String email) {
        List<MembreEntity> membres = membreRepository.findMembreByEmail(email);
        if (membres.size() == 1) {
            MembreEntity membreEntity = membres.get(0);
            LocalDateTime localDateTime = membreEntity.getLastLoginDate();
            if (localDateTime==null) {
                localDateTime = LocalDateTime.now();
            }
            localDateTime = localDateTime.minusDays(30);
            membreEntity.setLastLoginDate(localDateTime);
            membreRepository.save(membreEntity);
            return membreEntity.getPrenom()+" "+membreEntity.getNom()+" a maintenant une date de dernière connexion = "+localDateTime.toString();
        } else if (membres.size()==0) {
            return "Aucun membre trouvé";
        } else {
            return String.format("Erreur grave : %d membres trouvés pour %s", membres.size(), email);
        }
    }
}
