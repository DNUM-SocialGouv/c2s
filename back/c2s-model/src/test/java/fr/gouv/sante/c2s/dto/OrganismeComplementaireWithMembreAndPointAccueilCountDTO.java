package fr.gouv.sante.c2s.dto;

import fr.gouv.sante.c2s.model.GroupeEnum;
import fr.gouv.sante.c2s.model.TypeMembreEnum;
import fr.gouv.sante.c2s.model.dto.MembreSimpleDTO;
import fr.gouv.sante.c2s.model.dto.OrganismeComplementaireWithMembreAndPointAccueilCountDTO;
import fr.gouv.sante.c2s.model.entity.EntrepriseEntity;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.*;

class OrganismeComplementaireWithMembreAndPointAccueilCountDTOTest {

    private EntrepriseEntity entrepriseEntity;

    @BeforeEach
    void setUp() {
        entrepriseEntity = new EntrepriseEntity();
        entrepriseEntity.setId(1L);
        entrepriseEntity.setNom("Test Name");
        entrepriseEntity.setAdresse("Test Address");
        entrepriseEntity.setCodePostal("12345");
        entrepriseEntity.setVille("Test Town");
        entrepriseEntity.setSiren("123456789");
        entrepriseEntity.setSiteWeb("www.test.com");
        entrepriseEntity.setTelephone("1234567890");
        entrepriseEntity.setDateCrea(LocalDateTime.now());
        entrepriseEntity.setDateMaj(LocalDateTime.now());
        entrepriseEntity.setEmail("test@test.com");
        entrepriseEntity.setGroupe(GroupeEnum.ORGANISME_COMPLEMENTAIRE);
        entrepriseEntity.setEtablissementId(987654321L);
    }

    @Test
    void organismeComplementaireWithMembreAndPointAccueilCountBuilder_should_create_object() {

        String membreIds = "123|456";
        String membreNoms = "John|Doe";
        String membrePrenoms = "Doe|John";
        String membreTypes = "['GESTION']|['STATISTIQUES','GESTION']";
        long count = 1;

        OrganismeComplementaireWithMembreAndPointAccueilCountDTO organisme = new OrganismeComplementaireWithMembreAndPointAccueilCountDTO(entrepriseEntity, count, membreIds, membreNoms, membrePrenoms, membreTypes);

        assertNotNull(organisme);
        assertEquals(Arrays.asList(123L, 456L).get(0), organisme.getMembres().stream().map(MembreSimpleDTO::getId).collect(Collectors.toList()).get(0));
        assertEquals(Arrays.asList(123L, 456L).get(1), organisme.getMembres().stream().map(MembreSimpleDTO::getId).collect(Collectors.toList()).get(1));

        assertEquals(Arrays.asList("John", "Doe"), organisme.getMembres().stream().map(MembreSimpleDTO::getNom).collect(Collectors.toList()));
        assertEquals(Arrays.asList("Doe", "John"), organisme.getMembres().stream().map(MembreSimpleDTO::getPrenom).collect(Collectors.toList()));
        assertEquals(Arrays.asList(TypeMembreEnum.GESTION).get(0), organisme.getMembres().get(0).getTypes()[0]);
        assertEquals(Arrays.asList(TypeMembreEnum.STATISTIQUES, TypeMembreEnum.GESTION).get(1), organisme.getMembres().get(1).getTypes()[1]);
        assertEquals(entrepriseEntity.getId(), organisme.getId());
    }
}
