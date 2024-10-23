package fr.gouv.sante.c2s.web.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import fr.gouv.sante.c2s.model.EtatEnum;
import fr.gouv.sante.c2s.model.dto.OrganismeComplementaireDTO;
import fr.gouv.sante.c2s.model.dto.OrganismeComplementairePublicDTO;
import fr.gouv.sante.c2s.model.dto.drupal.EtablissementDTO;
import fr.gouv.sante.c2s.model.dto.session.MembreSessionDTO;
import fr.gouv.sante.c2s.service.partenaire.PartenaireService;
import fr.gouv.sante.c2s.web.controller.oc.OrganismeComplementaireController;
import fr.gouv.sante.c2s.web.controller.publique.data.PublicDataOrganismeComplementaireController;
import fr.gouv.sante.c2s.web.session.MembreSessionManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
public class OrganismeComplementaireControllerTest {

    private MockMvc mockMvc;

    @Mock
    private PartenaireService partenaireService;

    @InjectMocks
    private PublicDataOrganismeComplementaireController organismeComplementairePublicController;

    @InjectMocks
    private OrganismeComplementaireController organismeComplementaireController;

    private ObjectMapper objectMapper;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(organismeComplementaireController).build();
        objectMapper = new ObjectMapper();
    }

    @Test
    public void shouldReturnNoContentWhenListIsEmpty() {
        when(partenaireService.getOrganismeComplementairesActifsForDrupal()).thenReturn(Collections.emptyList());

        ResponseEntity<?> result = organismeComplementairePublicController.getOcInfo();

        assertEquals(ResponseEntity.noContent().build(), result);
        verify(partenaireService, times(1)).getOrganismeComplementairesActifsForDrupal();
    }

    @Test
    public void shouldReturnOkWhenListIsNotEmpty() {
        when(partenaireService.getOrganismeComplementairesActifsForDrupal()).thenReturn(Arrays.asList(new OrganismeComplementairePublicDTO()));

        ResponseEntity<?> result = organismeComplementairePublicController.getOcInfo();

        assertEquals(ResponseEntity.ok(Arrays.asList(new OrganismeComplementairePublicDTO())), result);
        verify(partenaireService, times(1)).getOrganismeComplementairesActifsForDrupal();
    }

    @Test
    public void testGetOcInfoWithEmptyResult() {
        // Setup
        when(partenaireService.findEtablissementByCriteria("75", null, null, null, EtatEnum.ACTIF))
                .thenReturn(new ArrayList<>());

        // Execution
        ResponseEntity<List<EtablissementDTO>> response = organismeComplementairePublicController.getOcInfo("75", null, null, null);

        // Verify
        assertThat(response.getStatusCodeValue()).isEqualTo(204);
        verify(partenaireService).findEtablissementByCriteria("75", null, null, null, EtatEnum.ACTIF);
    }

    @Test
    public void testGetOcInfoByLocSirenWithInvalidRequest() {
        // Execution
        ResponseEntity<OrganismeComplementaireDTO> response = organismeComplementaireController.getOcInfoByEmail("");

        // Verify
        assertThat(response.getStatusCodeValue()).isEqualTo(400);
    }

    @Test
    public void testUpdateOcInfo() throws Exception {
        OrganismeComplementaireDTO ocInfo = new OrganismeComplementaireDTO();
        // Remplissez ocInfo avec des données de test appropriées.

        MembreSessionDTO membreSession = new MembreSessionDTO();
        membreSession.setSiren("123456789");

        doNothing().when(partenaireService).updatePartenaireInfo(any(OrganismeComplementaireDTO.class), eq(membreSession));

        mockMvc.perform(put("/oc/update")
                        .sessionAttr(MembreSessionManager.MEMBRE_SESSION_KEY, membreSession)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(ocInfo)))
                .andExpect(status().isOk())
                .andExpect(content().string("OC est mis à jour"));
    }

    /*

    @Test
    public void testGetOcInfoByLocSirenNotFound() {
        // Setup
        when(partenaireService.findOcByEmail("validLogin")).thenReturn(null);

        // Execution
        ResponseEntity<OrganismeComplementaireDTO> response = ocController.getOcInfoByLogin("validLogin");

        // Verify
        assertThat(response.getStatusCodeValue()).isEqualTo(404);
        verify(partenaireService).findOcByEmail("validLogin");
    }*/

    /*
    @Test
    public void testUpdateOcInfo() {
        // Setup
        OrganismeComplementaireDTO ocInfo = new OrganismeComplementaireDTO();

        // Execution
        ResponseEntity<String> response = organismeComplementaireController.updateOcInfo(ocInfo);

        // Verify
        assertThat(response.getStatusCodeValue()).isEqualTo(200); // HTTP 200 OK
        assertThat(response.getBody()).isEqualTo("OC est mis à jour");
        verify(partenaireService).updatePartenaireInfo(ocInfo);
    }*/
}
