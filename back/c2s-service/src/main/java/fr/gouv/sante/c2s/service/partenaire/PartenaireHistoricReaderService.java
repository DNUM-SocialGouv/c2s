package fr.gouv.sante.c2s.service.partenaire;

import fr.gouv.sante.c2s.model.SectionEnum;
import fr.gouv.sante.c2s.model.dto.HistoryOperationDTO;
import fr.gouv.sante.c2s.repository.HistoryOperationRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
@Transactional
public class PartenaireHistoricReaderService {

    @Autowired
    HistoryOperationRepository historyOperationRepository;

    public List<HistoryOperationDTO> getHistoricOperations(String siren, SectionEnum section, Pageable pageable) {
        return historyOperationRepository.getOperationsForPartenaire(siren, section, pageable);
    }

    public Long countHistoricOperations(String siren, SectionEnum section) {
        return historyOperationRepository.countOperationsForPartenaire(siren, section);
    }

}
