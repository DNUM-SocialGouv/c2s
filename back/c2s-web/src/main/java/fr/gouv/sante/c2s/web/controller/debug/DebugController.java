package fr.gouv.sante.c2s.web.controller.debug;

import fr.gouv.sante.c2s.model.*;
import fr.gouv.sante.c2s.model.entity.EntrepriseEntity;
import fr.gouv.sante.c2s.model.entity.MembreEntity;
import fr.gouv.sante.c2s.repository.EntrepriseRepository;
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

import java.util.*;

import org.springframework.web.util.HtmlUtils;

@Tag(name = "[Debug]", description = "Ce controleur permets de tester des fonctionnalités ou de by passer le login")
@Slf4j
@RestController()
@RequestMapping("/debug")
public class DebugController {

    @Autowired
    private EmailBusinessService emailBusinessService;

    @Autowired
    private MembreRepository membreRepository;

    @Autowired
    private EntrepriseRepository entrepriseRepository;

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

    @GetMapping("/flipper")
    public String flip(@RequestParam("feat") String feature) {
        if (feature.equals("mail-on-new-resource")) {
            FeatureFlag.MAIL_ON_NEW_RESOURCE = !FeatureFlag.MAIL_ON_NEW_RESOURCE;
            return "Mail on new resource is now [" + FeatureFlag.MAIL_ON_NEW_RESOURCE+"]";
        } else if (feature.equals("mail-on-new-membre-waiting-validation")) {
            FeatureFlag.MAIL_ON_NEW_MEMBRE_WAITING_VALIDATION = !FeatureFlag.MAIL_ON_NEW_MEMBRE_WAITING_VALIDATION;
            return "Mail on new membre waiting validation is now [" + FeatureFlag.MAIL_ON_NEW_MEMBRE_WAITING_VALIDATION+"]";
        }
        return "Feature not found : " + HtmlUtils.htmlEscape(feature);
    }

    @GetMapping("/set_default_contact")
    public String setDefaultContact() {
        List<EntrepriseEntity> entreprises = entrepriseRepository.findAll();
        for (EntrepriseEntity entreprise : entreprises) {

            if (entreprise.getGroupe()!=GroupeEnum.ORGANISME_COMPLEMENTAIRE) {
                continue;
            }

            List<MembreEntity> membres = membreRepository.getMembreBySiren(entreprise.getSiren());
            membres.sort(Comparator.comparing(MembreEntity::getDateInscription));

            if (membres.size()==1) {
                MembreEntity membre = membres.get(0);
                membre.setTypes(new TypeMembreEnum[]{TypeMembreEnum.GESTION, TypeMembreEnum.STATISTIQUES, TypeMembreEnum.STATISTIQUES});
                membreRepository.save(membre);
            } else if (membres.size()>1) {

                MembreEntity firstActif = getFirstActif(membres, 0);

                if (firstActif!=null) {

                    boolean gestionAffected = false;
                    boolean statisqueAffected = false;
                    boolean tsaAffected = false;


                    for (MembreEntity membre : membres) {
                        if (membre.getTypes()!=null) {
                            if (Arrays.stream(membre.getTypes()).anyMatch(TypeMembreEnum.GESTION::equals)) {
                                gestionAffected = true;
                            }
                            if (Arrays.stream(membre.getTypes()).anyMatch(TypeMembreEnum.STATISTIQUES::equals)) {
                                statisqueAffected = true;
                            }
                            if (Arrays.stream(membre.getTypes()).anyMatch(TypeMembreEnum.DECLARATION_TSA::equals)) {
                                tsaAffected = true;
                            }
                        }
                    }

                    MembreEntity premierInscrit = membres.get(0);
                    Set<TypeMembreEnum> types = new HashSet<>();
                    if (!gestionAffected) {
                        types.add(TypeMembreEnum.GESTION);
                    }
                    if (!statisqueAffected) {
                        types.add(TypeMembreEnum.STATISTIQUES);
                    }
                    if (!tsaAffected) {
                        types.add(TypeMembreEnum.DECLARATION_TSA);
                    }
                    types.addAll(Arrays.stream(premierInscrit.getTypes()).toList());
                    premierInscrit.setTypes(types.toArray(new TypeMembreEnum[types.size()]));
                    membreRepository.save(premierInscrit);
                    System.out.println("Premier " + getFirstActif(membres, 0).getDateInscription() + " " + getFirstActif(membres, 0).getId());
                    System.out.println("Dernier " + membres.get(membres.size() - 1).getDateInscription() + " " + membres.get(membres.size() - 1).getId());
                }
            }
        }

        return "OK";
    }

    private MembreEntity getFirstActif(List<MembreEntity> membres, int index) {
        if (membres.size()>0 && index<membres.size()) {
            MembreEntity membre = membres.get(index);
            if (membre.getStatut()== StatutMembreEnum.ACTIF) {
                return membre;
            } else {
                return getFirstActif(membres, index+1);
            }
        }
        return null;
    }
}
