package fr.gouv.sante.c2s.service;

import fr.gouv.sante.c2s.repository.EntrepriseRepository;
import fr.gouv.sante.c2s.repository.EtablissementRepository;
import fr.gouv.sante.c2s.service.partenaire.PartenaireService;
import org.junit.jupiter.api.BeforeEach;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;


public class PartenaireEntityServiceTest {

    @Mock
    private EntrepriseRepository entrepriseRepository;
    @Mock
    private EtablissementRepository etablissementRepository;

    @InjectMocks
    private PartenaireService partenaireService;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    /*
    @Test
    public void findOcPaByCriteriaShouldReturnExpectedList() {
        // Given
        String departement = "SomeDepartement";
        String region = "SomeRegion";
        String ville = "SomeVille";
        String organisme = "SomeOrganisme";

        PartenaireEntity mockOcLoc = new PartenaireEntity();
        mockOcLoc.setDepartement(departement);
        mockOcLoc.setRegion(region);
        mockOcLoc.setSiren("12354854");

        PointAccueilEntity mockPaLpa = new PointAccueilEntity();
        mockPaLpa.setPartenaire(mockOcLoc);

        // Setting up mocks
        when(partenaireRepository.findAll(ArgumentMatchers.<Specification<PartenaireEntity>>any()))
                .thenReturn(Collections.singletonList(mockOcLoc));
        when(pointAccueilRepository.findAllByPartenaire_Siren("12354854"))
                .thenReturn(Collections.singletonList(mockPaLpa));

        // Action
        List<PointAccueilEntity> result = partenaireService.findOcPaByCriteria(departement, ville, region, organisme, null);

        // Assertions
        assertNotNull(result);
        assertFalse(result.isEmpty());
        assertEquals(1, result.size());
        assertEquals(mockOcLoc, result.get(0).getPartenaire());

        // Verify interactions
        verify(partenaireRepository).findAll(ArgumentMatchers.<Specification<PartenaireEntity>>any());
        verify(pointAccueilRepository).findAllByPartenaire_Siren("12354854");
    }
    */

}
