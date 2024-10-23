package fr.gouv.sante.c2s.web.controller;

import fr.gouv.sante.c2s.model.GroupeEnum;
import fr.gouv.sante.c2s.model.dto.PointAccueilReponseDTO;
import fr.gouv.sante.c2s.model.dto.session.MembreSessionDTO;
import fr.gouv.sante.c2s.repository.mapper.Mapper;
import fr.gouv.sante.c2s.service.EtablissementService;
import fr.gouv.sante.c2s.web.controller.oc.OrganismeComplementairePointAccueilController;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class OrganismeComplementairePointAccueilControllerTest {

    @Mock
    private EtablissementService etablissementService;

    @Mock
    private Mapper mapper;

    @InjectMocks
    private OrganismeComplementairePointAccueilController organismeComplementairePointAccueilController;

    @BeforeEach
    void setUp() {
    }

    @Test
    void testGetFilteredPaLpas() {
        // Arrange
        PageRequest pageRequest = PageRequest.of(0, 3, Sort.by(Sort.Direction.ASC, "codePostal"));
        PointAccueilReponseDTO paReponse = PointAccueilReponseDTO.builder()
                .id("1")
                .nom("Test LPA")
                .email("test@example.com")
                .telephone("1234567890")
                .adresse("1234 Main St")
                .adresseComplete("1234 Main St, Testville")
                .codePostal("12345")
                .ville("Testville")
                .region("Test Region")
                .departement("Test Department")
                .dateMaj("2022-01-01")
                .build();
        Page<PointAccueilReponseDTO> expectedPage = new PageImpl<>(
                Arrays.asList(paReponse),
                pageRequest,
                1
        );
        when(etablissementService.findPointAccueils("123", null, null, null, pageRequest))
                .thenReturn(expectedPage);

        // Act
        ResponseEntity<Page<PointAccueilReponseDTO>> response = organismeComplementairePointAccueilController.getFilteredPointAccueil("123", null, null, null, 0, 3);

        // Assert
        assertThat(response.getStatusCodeValue()).isEqualTo(200);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().getTotalElements()).isEqualTo(1);
        PointAccueilReponseDTO resultDto = response.getBody().getContent().get(0);
        assertThat(resultDto.getId()).isEqualTo("1");
        assertThat(resultDto.getNom()).isEqualTo("Test LPA");
        assertThat(resultDto.getEmail()).isEqualTo("test@example.com");
        assertThat(resultDto.getTelephone()).isEqualTo("1234567890");
        assertThat(resultDto.getAdresse()).isEqualTo("1234 Main St");
        assertThat(resultDto.getAdresseComplete()).isEqualTo("1234 Main St, Testville");
        assertThat(resultDto.getCodePostal()).isEqualTo("12345");
        assertThat(resultDto.getVille()).isEqualTo("Testville");
        assertThat(resultDto.getRegion()).isEqualTo("Test Region");
        assertThat(resultDto.getDepartement()).isEqualTo("Test Department");
        assertThat(resultDto.getDateMaj()).isEqualTo("2022-01-01");
    }


    @Test
    void testGetRegions() {
        // Arrange
        List<String> expectedRegions = Arrays.asList("Region1", "Region2");
        when(etablissementService.getPointAccueilRegion("123")).thenReturn(expectedRegions);

        // Act
        ResponseEntity<List<String>> response = organismeComplementairePointAccueilController.getRegions("123");

        // Assert
        assertThat(response.getStatusCodeValue()).isEqualTo(200);
        assertThat(response.getBody()).containsExactly("Region1", "Region2");
    }

    @Test
    void testGetDepartements() {
        // Arrange
        List<String> expectedDepartments = Arrays.asList("Dept1", "Dept2");
        when(etablissementService.getPointAccueilDepartement("123", "Region1")).thenReturn(expectedDepartments);

        // Act
        ResponseEntity<List<String>> response = organismeComplementairePointAccueilController.getDepartements("123", "Region1");

        // Assert
        assertThat(response.getStatusCodeValue()).isEqualTo(200);
        assertThat(response.getBody()).containsExactly("Dept1", "Dept2");
    }

    /*
    @Test
    void testCreatePaLpa() {
        // Arrange
        PointAccueilToCreateDTO dto = new PointAccueilToCreateDTO();
        PointAccueilReponseDTO entity = new PointAccueilReponseDTO();
        entity.setLpaId(String.valueOf(1));
        entity.setNom("Test LPA");

        when(pointAccueilService.createPointAccueil(dto)).thenReturn(entity);

        // Act
        ResponseEntity<PointAccueilReponseDTO> response = pointAccueilController.createPaLpa(dto);

        // Assert
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertThat(response.getBody().getLpaId()).isEqualTo("1");
        assertThat(response.getBody().getNom()).isEqualTo("Test LPA");
    }*/


    @Test
    void testDeletePaLpa() {
        MembreSessionDTO membreSessionDTO = new MembreSessionDTO();
        membreSessionDTO.setEmail("test@test.fr");
        membreSessionDTO.setGroupe(GroupeEnum.ORGANISME_COMPLEMENTAIRE);
        membreSessionDTO.setSiren("234567890");
        membreSessionDTO.setNom("Dupuis");
        membreSessionDTO.setPrenom("Marc");
        // Act
        ResponseEntity<Void> response = organismeComplementairePointAccueilController.deletePointAccueil("1", membreSessionDTO);

        // Assert
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NO_CONTENT);
        verify(etablissementService).deletePointAccueil(membreSessionDTO,1L);
    }

    @Test
    void testUpdateLPAInfo() {
        MembreSessionDTO membreSessionDTO = new MembreSessionDTO();
        membreSessionDTO.setEmail("test@test.fr");
        membreSessionDTO.setGroupe(GroupeEnum.ORGANISME_COMPLEMENTAIRE);
        membreSessionDTO.setSiren("234567890");
        membreSessionDTO.setNom("Dupuis");
        membreSessionDTO.setPrenom("Marc");

        // Arrange
        PointAccueilReponseDTO dto = PointAccueilReponseDTO.builder()
                .id("1")
                .nom("Updated LPA")
                .email("update@example.com")
                .telephone("0987654321")
                .adresse("5678 Another St")
                .adresseComplete("5678 Another St, Otherville")
                .codePostal("67890")
                .ville("Otherville")
                .region("Updated Region")
                .departement("Updated Department")
                .dateMaj("2022-02-02")
                .build();

        // Act
        ResponseEntity<String> response = organismeComplementairePointAccueilController.updatePointAccueilInfo(dto, membreSessionDTO);

        // Assert
        assertThat(response.getStatusCodeValue()).isEqualTo(200);
        assertThat(response.getBody()).isEqualTo("Le point d'accueil est mis à jour");
        verify(etablissementService).updatePointAccueilById(membreSessionDTO, dto);
    }
}
