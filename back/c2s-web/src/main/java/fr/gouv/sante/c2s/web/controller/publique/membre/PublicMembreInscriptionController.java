package fr.gouv.sante.c2s.web.controller.publique.membre;

import fr.gouv.sante.c2s.insee.InseeException;
import fr.gouv.sante.c2s.insee.InseeService;
import fr.gouv.sante.c2s.model.GroupeEnum;
import fr.gouv.sante.c2s.model.dto.EntrepriseDTO;
import fr.gouv.sante.c2s.model.dto.membre.MembreToRegistertDTO;
import fr.gouv.sante.c2s.model.exception.ManualConstraintViolationException;
import fr.gouv.sante.c2s.service.EntrepriseService;
import fr.gouv.sante.c2s.service.MembreService;

import fr.gouv.sante.c2s.web.WebConstants;
import fr.gouv.sante.c2s.web.session.AnonymousSessionManager;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "[Public] Inscription d'un membre", description = "Inscription / Recherche SIREN OC / Recherche SIREN Caisse")
@Slf4j
@RestController
public class PublicMembreInscriptionController {

    @Autowired
    MembreService membreService;

    @Autowired
    InseeService inseeService;

    @Autowired
    EntrepriseService entrepriseService;

    @Autowired
    AnonymousSessionManager sessionManager;

    // public
    @Operation(description = "Création d'un membre (OC ou caisse)")
    @PostMapping("/"+ WebConstants.PUBLIC_PREFIX_URL +"/inscription")
    //@Operation(description = "Enregistre un membre (OC ou Caisse)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "String = Inscription réussie"),
            @ApiResponse(responseCode = "401", description = "Mesure du temps invalide")
    })
    public ResponseEntity registerMember(HttpServletRequest req, @Valid @RequestBody MembreToRegistertDTO registerInputDTO) {
        if (sessionManager.isValid(req, registerInputDTO.getFormId())) { // time measuring (control anti bot)

            // test unicité email
            if (membreService.isEmailExists(registerInputDTO.getEmail())) {
                throw new ManualConstraintViolationException("email", "Cette adresse email est déjà utilisée");
            }

            // test OC siren en base
            if (GroupeEnum.ORGANISME_COMPLEMENTAIRE.name().equals(registerInputDTO.getGroupe())
                    && !membreService.isEntrepriseExists(registerInputDTO.getSiren())) {
                throw new ManualConstraintViolationException("siren", "Ce SIREN n'est pas référencé");
            }

            if (GroupeEnum.CAISSE.name().equals(registerInputDTO.getGroupe())
                && membreService.isEntrepriseExists(registerInputDTO.getSiren())
                && !membreService.getEntrepriseBySiren(registerInputDTO.getSiren()).getGroupe().equals(GroupeEnum.CAISSE.name())) {
                throw new ManualConstraintViolationException("siren", "Ce SIREN n'est pas utilisable");
            }

            try {

                String societe = sessionManager.getSirenInformations(req, registerInputDTO.getSiren());
                membreService.registerMembre(registerInputDTO, societe);
                return ResponseEntity.ok("Inscription réussie");

            } catch (Exception e) {
                log.error("Erreur à l'inscription", e);
                return ResponseEntity.internalServerError().build();
            }

        }
        return ResponseEntity.status(401).build();
    }

    // public
    @Operation(description = "Recherche SIREN pour inscription d'un organisme complémentaire")
    @GetMapping("/"+WebConstants.PUBLIC_PREFIX_URL+"/recherche/siren/oc")
    public ResponseEntity<String> searchOrganismeComplementaireCompany(@RequestParam("siren") String siren) {
        if (siren == null || siren.isBlank()) {
            throw new ManualConstraintViolationException("siren", "Le numéro SIREN est requis");
        } else if (!membreService.isEntrepriseExists(siren)) {
            throw new ManualConstraintViolationException("siren", "Ce numéro SIREN n'est pas référencé");
        }

        EntrepriseDTO entrepriseDTO = membreService.getEntrepriseBySiren(siren);
        if (GroupeEnum.valueOf(entrepriseDTO.getGroupe())==GroupeEnum.CAISSE) {
            throw new ManualConstraintViolationException("siren", "Ce numéro SIREN n'est pas utilisable");
        }

        try {

            String denomination = inseeService.getDenomination(siren);
            return ResponseEntity.ok(denomination);

        } catch (InseeException inseeException) {
            throw new ManualConstraintViolationException("siren", "Problème avec l'API INSEE");
        }
    }



    // public
    @Operation(description = "Recherche SIREN pour l'inscription d'une caisse")
    //@Operation(description = "Recherche SIREN à réaliser avant la création d'un compte de type \"caisse\"")
    @GetMapping("/"+WebConstants.PUBLIC_PREFIX_URL+"/recherche/siren/caisse")
    public ResponseEntity<String> searchCaisseCompany(HttpServletRequest request, @RequestParam("siren") String siren) {
        boolean create = true;
        if (siren == null || siren.isBlank()) {
            throw new ManualConstraintViolationException("siren", "Le numéro SIREN est requis");
        } else if (membreService.isEntrepriseExists(siren)) {
            if (!membreService.getEntrepriseBySiren(siren).getGroupe().equals(GroupeEnum.CAISSE.name())) {
                throw new ManualConstraintViolationException("siren", "Ce numéro SIREN n'est pas utilisable");
            } else {
                create = false;
            }
        }

        try {

            String denomination = inseeService.getDenomination(siren);
            if (create) {
                entrepriseService.createEntreprise(siren, denomination, GroupeEnum.CAISSE);
            }
            sessionManager.saveSirenInfo(request, siren, denomination);
            return ResponseEntity.ok(denomination);

        } catch (InseeException inseeException) {
            //inseeException.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(inseeException.getErrorMessage());
        }
    }
}
