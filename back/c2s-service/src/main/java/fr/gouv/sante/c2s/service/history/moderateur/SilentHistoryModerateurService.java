package fr.gouv.sante.c2s.service.history.moderateur;

import fr.gouv.sante.c2s.model.dto.session.MembreSessionDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class SilentHistoryModerateurService {

    @Autowired
    HistoryModerateurMembreService historicMembreService;
    @Autowired
    HistoryModerateurModerateurService historicModerateurService;
    @Autowired
    HistoryModerateurContenuService historicContenuService;
    @Autowired
    HistoryModerateurEntrepriseService historicEntrepriseService;

    public void saveMembreChangeStatut(MembreSessionDTO membre, String nomPrenomTarget, String entrepriseTarget, String ancienStatut, String nouveauStatut) {
        try {
            historicMembreService.saveMembreChangeStatut(membre, nomPrenomTarget, entrepriseTarget, ancienStatut, nouveauStatut);
        } catch (Exception e) {
            log.error("Erreur historisation sur modification du statut d'un membre : "+nomPrenomTarget+" ("+entrepriseTarget+")", e);
        }
    }

    public void saveAjoutEtablissement(MembreSessionDTO membre, String entrepriseTarget) {
        try {
            historicEntrepriseService.saveAjoutEntreprise(membre, entrepriseTarget);
        } catch (Exception e) {
            log.error("Erreur historisation sur création de l'entreprise : "+entrepriseTarget, e);
        }
    }

    public void saveSuppressionEntreprise(MembreSessionDTO membre, String entrepriseTarget) {
        try {
            historicEntrepriseService.saveSuppressionEntreprise(membre, entrepriseTarget);
        } catch (Exception e) {
            log.error("Erreur historisation sur suppression de l'entreprise : "+entrepriseTarget, e);
        }
    }

    public void saveModificationEntreprise(MembreSessionDTO membre, String entrepriseTarget) {
        try {
            historicEntrepriseService.saveModificationEntreprise(membre, entrepriseTarget);
        } catch (Exception e) {
            log.error("Erreur historisation sur modification de l'entreprise : "+entrepriseTarget, e);
        }
    }

    public void saveAjoutModerateur(MembreSessionDTO membre, String moderateurTarget) {
        try {
            historicModerateurService.saveAjoutModerateur(membre, moderateurTarget);
        } catch (Exception e) {
            log.error("Erreur historisation sur l'ajout d'un moderateur : "+moderateurTarget, e);
        }
    }

    public void saveSuppressionModerateur(MembreSessionDTO membre, String moderateurTarget) {
        try {
            historicModerateurService.saveSuppressionModerateur(membre, moderateurTarget);
        } catch (Exception e) {
            log.error("Erreur historisation sur la suppression d'un moderateur : "+moderateurTarget, e);
        }
    }

    public void saveModificationMessageOC(MembreSessionDTO membre) {
        try {
            historicContenuService.saveModificationMessageOC(membre);
        } catch (Exception e) {
            log.error("Erreur historisation sur la modification du message pour les OC ", e);
        }
    }

    public void saveModificationMessageCaisse(MembreSessionDTO membre) {
        try {
            historicContenuService.saveModificationMessageCaisse(membre);
        } catch (Exception e) {
            log.error("Erreur historisation sur la modification du message pour les caisses : ", e);
        }
    }
}
