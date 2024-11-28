package fr.gouv.sante.c2s.service.moderateur;

import fr.gouv.sante.c2s.model.SectionEnum;
import fr.gouv.sante.c2s.model.dto.HistoryOperationDTO;
import fr.gouv.sante.c2s.repository.HistoryOperationRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.List;

@Service
@Slf4j
@Transactional
public class ModerateurHistoricReaderService {

    HistoryOperationRepository historyOperationRepository;

    @Autowired
    public ModerateurHistoricReaderService(HistoryOperationRepository historyOperationRepository) {
        this.historyOperationRepository = historyOperationRepository;
    }

    public List<HistoryOperationDTO> getHistoricOperations(String oc, SectionEnum section, Pageable pageable) {
        if (oc!=null) {
            oc = "%" + oc.toLowerCase() + "%";
        }
        return historyOperationRepository.getOperationsForModerateur(oc, section, pageable);
    }

    public Long countHistoricOperations(String oc, SectionEnum section) {
        if (oc!=null) {
            oc = "%" + oc.toLowerCase() + "%";
        }
        return historyOperationRepository.countOperationsForModerateur(oc, section);
    }

    public List<HistoryOperationDTO> getModificationOperationsForModerateurOnLastXHours(Integer hours) {
        Calendar calendar = new GregorianCalendar();
        calendar.add(Calendar.HOUR, -hours);
        return historyOperationRepository.getModificationOperationsForModerateurAfterDate(calendar.getTime());
    }
}
