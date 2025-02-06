package fr.gouv.sante.c2s.web.controller.moderateur;

import fr.gouv.sante.c2s.file.FileOperation;
import fr.gouv.sante.c2s.file.FileService;
import fr.gouv.sante.c2s.model.GroupeEnum;
import fr.gouv.sante.c2s.model.dto.resource.RessourceFichierDTO;

import fr.gouv.sante.c2s.model.exception.ManualConstraintViolationException;
import fr.gouv.sante.c2s.security.SecurityService;
import fr.gouv.sante.c2s.service.moderateur.ModerateurRessourceService;
import fr.gouv.sante.c2s.web.WebConstants;
import fr.gouv.sante.c2s.web.controller.BaseController;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Slf4j
@Tag(name = "[Modérateur] Les ressources fichiers", description = "get / add / delete / search")
@RestController
@RequestMapping("/"+ WebConstants.MODERATEUR_PREFIX_URL+"/"+WebConstants.FICHIER_NAME_URL)
public class ModerateurRessourceFichierController extends BaseController {

    @Autowired
    ModerateurRessourceService moderateurRessourceService;

    @Autowired
    FileService fileService;

    @Autowired
    SecurityService securityService;

    @GetMapping("/")
    public List<RessourceFichierDTO> getFichiers() {
        return moderateurRessourceService.getRessourceFichiers();
    }

    @GetMapping("/{id}")
    public void getFichier(@PathVariable("id") Long id, HttpServletResponse response) {

        try {

            RessourceFichierDTO fichier = moderateurRessourceService.getRessourceFichier(id);
            response.setHeader("Content-Disposition", "attachment; filename=" + fichier.getNom());
            response.setHeader("Content-Type", getContentTypeFromExtension(fichier.getExtension()));

            ServletOutputStream outputStream = response.getOutputStream();
            FileCopyUtils.copy(new FileInputStream(fichier.getRepertoire()+File.separatorChar+fichier.getUuid()), outputStream);

        } catch (Exception e) {
            log.error(e.getMessage());
        }

    }

    @PostMapping(consumes = { MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.APPLICATION_OCTET_STREAM_VALUE}, produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(
            requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "Fichier à uploader",
                    required = true,
                    content = @Content(
                            mediaType = MediaType.MULTIPART_FORM_DATA_VALUE,
                            schema = @io.swagger.v3.oas.annotations.media.Schema(
                                    name = "file",
                                    type = "object",
                                    format = "binary",
                                    implementation = MultipartFile.class
                            )
                    )
            )
    )
    public ResponseEntity addFichier(@RequestParam(name = "ressourceThematiqueId") Long ressourceThematiqueId,
                                     @Parameter(name = "file", required = true) @RequestParam("file") MultipartFile fichier) throws IOException {
        String message = "File successfully uploaded: " + fichier.getOriginalFilename();
        log.info(message);
        if (!moderateurRessourceService.validRessourceThematiqueId(ressourceThematiqueId)) {
            throw new ManualConstraintViolationException("ressourceThematiqueId", "La thématique n'est pas correcte");
        }

        String filename = securityService.cleanFilename(fichier.getOriginalFilename());
        String uuid = UUID.randomUUID().toString();
        File file = fileService.getWorkingFile(uuid, "ressource-thematique");
        FileOperation operation = fileService.saveInputStream(fichier.getOriginalFilename(), uuid, file, fichier.getInputStream());
        if (operation.getError()!=null) {
            throw new ManualConstraintViolationException("file", operation.getError());
        } else {
            RessourceFichierDTO dto = moderateurRessourceService.addRessourceFichier(ressourceThematiqueId, filename, operation.getExtension(), operation.getSize(), operation.getDirectory(), uuid);
            return ResponseEntity.ok(dto);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteFichier(@PathVariable("id") Long id) {
        boolean result = moderateurRessourceService.deleteFichier(id);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/search")
    public ResponseEntity<List<RessourceFichierDTO>> searchFichierByNom(@RequestParam(name = "nom", required = false) String nom, @RequestParam(name = "thematiqueId", required = false) Long thematiqueId, @RequestParam(value = "extension", required = false) String extension, @RequestParam(value = "groupe", required = false) GroupeEnum groupe) {
        return ResponseEntity.ok(moderateurRessourceService.searchFichiers(nom, thematiqueId, extension, groupe));
    }

}
