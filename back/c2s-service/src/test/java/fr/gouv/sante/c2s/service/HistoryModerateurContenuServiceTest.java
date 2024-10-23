package fr.gouv.sante.c2s.service;

import fr.gouv.sante.c2s.model.ActionTypeEnum;
import fr.gouv.sante.c2s.model.GroupeEnum;
import fr.gouv.sante.c2s.model.SectionEnum;
import fr.gouv.sante.c2s.model.dto.session.MembreSessionDTO;
import fr.gouv.sante.c2s.model.entity.HistoricOperationEntity;
import fr.gouv.sante.c2s.repository.HistoryOperationRepository;
import fr.gouv.sante.c2s.service.history.moderateur.HistoryModerateurContenuService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;

class HistoryModerateurContenuServiceTest {

    @Mock
    private HistoryOperationRepository historyOperationRepository;

    @InjectMocks
    private HistoryModerateurContenuService historyModerateurContenuService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testSaveModificationMessageOC() {
        // Arrange
        MembreSessionDTO membre = new MembreSessionDTO();
        membre.setId(1L);
        membre.setPrenom("John");
        membre.setNom("Doe");
        membre.setGroupe(GroupeEnum.ORGANISME_COMPLEMENTAIRE);

        // Act
        historyModerateurContenuService.saveModificationMessageOC(membre);

        // Assert
        ArgumentCaptor<HistoricOperationEntity> captor = ArgumentCaptor.forClass(HistoricOperationEntity.class);
        verify(historyOperationRepository).save(captor.capture());

        HistoricOperationEntity savedEntity = captor.getValue();
        assertEquals(1L, savedEntity.getMembreId());
        assertEquals(ActionTypeEnum.MODIFICATION, savedEntity.getActionType());
        assertEquals(SectionEnum.MODERATION_CONTENU, savedEntity.getSection());
        assertEquals(GroupeEnum.ORGANISME_COMPLEMENTAIRE, savedEntity.getGroupe());
        assertEquals("Modification du message d'accueil des OC", savedEntity.getActionLabel());
        assertEquals("John Doe", savedEntity.getMembreInformations());
    }

    @Test
    void testSaveModificationMessageCaisse() {
        // Arrange
        MembreSessionDTO membre = new MembreSessionDTO();
        membre.setId(1L);
        membre.setPrenom("John");
        membre.setNom("Doe");
        membre.setGroupe(GroupeEnum.CAISSE);

        // Act
        historyModerateurContenuService.saveModificationMessageCaisse(membre);

        // Assert
        ArgumentCaptor<HistoricOperationEntity> captor = ArgumentCaptor.forClass(HistoricOperationEntity.class);
        verify(historyOperationRepository).save(captor.capture());

        HistoricOperationEntity savedEntity = captor.getValue();
        assertEquals(1L, savedEntity.getMembreId());
        assertEquals(ActionTypeEnum.MODIFICATION, savedEntity.getActionType());
        assertEquals(SectionEnum.MODERATION_CONTENU, savedEntity.getSection());
        assertEquals(GroupeEnum.CAISSE, savedEntity.getGroupe());
        assertEquals("Modification du message d'accueil des caisses", savedEntity.getActionLabel());
        assertEquals("John Doe", savedEntity.getMembreInformations());
    }
}