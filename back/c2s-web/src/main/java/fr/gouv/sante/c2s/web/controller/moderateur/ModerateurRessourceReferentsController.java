package fr.gouv.sante.c2s.web.controller.moderateur;

import fr.gouv.sante.c2s.service.moderateur.ModerateurRessourceService;
import fr.gouv.sante.c2s.web.WebConstants;
import fr.gouv.sante.c2s.web.controller.BaseController;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.FileInputStream;

@Slf4j
@Tag(name = "[Modérateur] Liste des référents")
@RestController
@RequestMapping("/"+ WebConstants.MODERATEUR_PREFIX_URL+"/"+WebConstants.REFERENT_NAME_URL)
public class ModerateurRessourceReferentsController extends BaseController {

    @Autowired
    ModerateurRessourceService moderateurRessourceService;

    @Operation(description = "Téléchargement du fichiers des référents actifs OC")
    @GetMapping
    public void getFichierReferents(HttpServletResponse response) {

        try {

            File file = moderateurRessourceService.getOCReferents();
            response.setHeader("Content-Disposition", "attachment; filename=" + file.getName());
            response.setHeader("Content-Type", getContentTypeFromExtension("csv"));

            ServletOutputStream outputStream = response.getOutputStream();
            FileCopyUtils.copy(new FileInputStream(file.getAbsolutePath()), outputStream);

        } catch (Exception e) {
            log.error(e.getMessage());
        }

    }

}
