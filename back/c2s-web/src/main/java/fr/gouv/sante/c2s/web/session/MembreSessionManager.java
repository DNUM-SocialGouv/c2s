package fr.gouv.sante.c2s.web.session;

import fr.gouv.sante.c2s.model.dto.membre.MembreInfoDTO;
import fr.gouv.sante.c2s.model.dto.session.MembreSessionDTO;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class MembreSessionManager extends AnonymousSessionManager {

    public static final String MEMBRE_SESSION_KEY = "c2s_user_session";

    public MembreSessionDTO openSession(HttpServletRequest request, MembreInfoDTO membreInfo) {
        MembreSessionDTO user = new MembreSessionDTO();
        user.setId(membreInfo.getMembreId());
        user.setEmail(membreInfo.getEmail());
        user.setNom(membreInfo.getNom());
        user.setPrenom(membreInfo.getPrenom());
        user.setGroupe(membreInfo.getGroupe());
        user.setSiren(membreInfo.getSiren());
        log.debug("Groupe : "+membreInfo.getGroupe());
        log.info("Groupe : "+membreInfo.getGroupe());
        log.info("Login de "+user.getEmail()+" ("+user.getGroupe()+")");
        request.getSession(true).setAttribute(MEMBRE_SESSION_KEY, user);
        return user;
    }

    public MembreSessionDTO getMembre(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            return (MembreSessionDTO) session.getAttribute(MEMBRE_SESSION_KEY);
        }
        return null;
    }

    public void closeSession(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session!=null) {
            MembreSessionDTO user = (MembreSessionDTO) session.getAttribute(MEMBRE_SESSION_KEY);
            log.info("Invalidation de la session ("+user.getEmail()+")");
            session.removeAttribute(MEMBRE_SESSION_KEY);
            session.invalidate();
        }
    }

}
