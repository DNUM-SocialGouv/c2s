package fr.gouv.sante.c2s.web.controller.partenaire;

import fr.gouv.sante.c2s.model.GroupeEnum;
import fr.gouv.sante.c2s.model.dto.AllRessourcesDTO;
import fr.gouv.sante.c2s.model.dto.resource.RessourceFichierDTO;
import fr.gouv.sante.c2s.model.dto.resource.RessourceThematiqueDTO;
import fr.gouv.sante.c2s.service.partenaire.PartenaireRessourceService;
import fr.gouv.sante.c2s.web.WebConstants;
import fr.gouv.sante.c2s.web.controller.BaseController;
import fr.gouv.sante.c2s.web.exception.IllegalWebRoleAccessException;
import fr.gouv.sante.c2s.model.dto.session.MembreSessionDTO;
import fr.gouv.sante.c2s.web.session.MembreSessionManager;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.FileInputStream;
import java.util.List;

@Slf4j
@Tag(name = "[Partenaire] Accès aux ressources", description = "Lecture des ressources par un partenaire")
@RestController
@RequestMapping("/"+ WebConstants.PARTENAIRE_PREFIX_URL+"/"+WebConstants.RESSOURCE_NAME_URL)
public class PartenaireRessourceController extends BaseController {

    @Autowired
    PartenaireRessourceService partenaireRessourceService;

    @Autowired
    MembreSessionManager sessionManager;

    private GroupeEnum getUserGroupe(HttpServletRequest request) {
        MembreSessionDTO userSession = sessionManager.getMembre(request);
        if (userSession!=null) {
            return userSession.getGroupe();
        }
        throw new IllegalWebRoleAccessException();
    }

    @GetMapping
    public AllRessourcesDTO getRessources(HttpServletRequest request) {
        GroupeEnum groupe = getUserGroupe(request);
        return partenaireRessourceService.getAllRessources(groupe);
    }

    @GetMapping("/"+WebConstants.FICHIER_NAME_URL)
    public ResponseEntity<List<RessourceFichierDTO>> getRessourceFichiers(@RequestParam("recherche") String recherche,
                                                                          @RequestParam("ressourceThematiqueId") Long thematiqueId,
                                                                          @RequestParam("extension") String extension,
                                                                          HttpServletRequest request) {
        GroupeEnum groupe = getUserGroupe(request);
        log.info(recherche + " " + thematiqueId + " " + extension + " " + groupe);
        List<RessourceFichierDTO> dtos = partenaireRessourceService.getRessourceFichiers(recherche, thematiqueId, extension, groupe);
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/"+WebConstants.FICHIER_NAME_URL+"/{id}")
    public ResponseEntity getFichierViaResponseEntity(@PathVariable("id") Long id, HttpServletRequest request, HttpServletResponse response) {

        try {

            GroupeEnum groupe = getUserGroupe(request);
            log.info("Fichier ID : "+id);
            log.info("Groupe : "+groupe);
            RessourceFichierDTO fichier = partenaireRessourceService.getRessourceFichier(id, true);
            if (fichier==null) {
                return ResponseEntity.notFound().build();
            }
            log.info("Thematique ID : "+fichier.getThematique().getId());
            RessourceThematiqueDTO thematique = partenaireRessourceService.getRessourceThematique(fichier.getThematique().getId());

            if (thematique.getGroupes().stream().anyMatch(groupeEnum -> groupeEnum == groupe)) {

                response.setHeader("Content-Disposition", "attachment; filename=" + fichier.getNom());
                response.setHeader("Content-Type", getContentTypeFromExtension(fichier.getExtension()));

                ServletOutputStream outputStream = response.getOutputStream();
                FileCopyUtils.copy(new FileInputStream(fichier.getRepertoire()+File.separatorChar+fichier.getUuid()), outputStream);
                return ResponseEntity.ok().build();

            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }

        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @Operation(description = "Téléchargement du fichiers des référents actifs OC")
    @GetMapping("/referents")
    public void getFichierReferents(HttpServletResponse response) {

        try {

            File file = partenaireRessourceService.getOCReferents();
            response.setHeader("Content-Disposition", "attachment; filename=" + file.getName());
            response.setHeader("Content-Type", getContentTypeFromExtension("csv"));

            ServletOutputStream outputStream = response.getOutputStream();
            FileCopyUtils.copy(new FileInputStream(file.getAbsolutePath()), outputStream);

        } catch (Exception e) {
            log.error(e.getMessage());
        }

    }
}
