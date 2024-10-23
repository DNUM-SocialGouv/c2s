package fr.gouv.sante.c2s.web.controller.prive;

import fr.gouv.sante.c2s.model.dto.AdresseInfoDTO;
import fr.gouv.sante.c2s.service.AdresseService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/private/adresse")
@RequiredArgsConstructor
public class PrivateAdresseController {
    private final AdresseService adresseService;

    // OC CAISSE MODERATEUR
    @GetMapping("/auto-complete")
    public List<AdresseInfoDTO> getAutoCompleteAddressInfo(@RequestParam("query") String query) {
        return adresseService.fetchAdresseInfo(query);
    }
}
