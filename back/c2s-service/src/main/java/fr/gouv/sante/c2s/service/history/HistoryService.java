package fr.gouv.sante.c2s.service.history;

import fr.gouv.sante.c2s.repository.HistoryOperationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Calendar;
import java.util.GregorianCalendar;

@Service
@Transactional
public class HistoryService {

    HistoryOperationRepository operationRepository;

    @Autowired
    public HistoryService(HistoryOperationRepository operationRepository) {
        this.operationRepository = operationRepository;
    }

    public void deleteOldHistoric(int month) {
        Calendar calendar = new GregorianCalendar();
        calendar.add(Calendar.MONTH, -Math.abs(month));
        operationRepository.deleteByDateBefore(calendar.getTime());
    }
}
