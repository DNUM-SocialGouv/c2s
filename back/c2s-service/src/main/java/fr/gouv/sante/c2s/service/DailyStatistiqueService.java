package fr.gouv.sante.c2s.service;

import fr.gouv.sante.c2s.model.GroupeEnum;
import fr.gouv.sante.c2s.model.dto.WelcomeModerateurDTO;
import fr.gouv.sante.c2s.model.entity.DailyStatistiqueEntity;
import fr.gouv.sante.c2s.repository.DailyStatistiqueRepository;
import fr.gouv.sante.c2s.repository.EntrepriseRepository;
import fr.gouv.sante.c2s.repository.EtablissementRepository;
import fr.gouv.sante.c2s.repository.MembreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class DailyStatistiqueService {

    private DailyStatistiqueRepository dailyStatistiqueRepository;
    private EntrepriseRepository entrepriseRepository;
    private MembreRepository membreRepository;
    private EtablissementRepository etablissementRepository;

    @Autowired
    public DailyStatistiqueService(DailyStatistiqueRepository dailyStatistiqueRepository,
                         EntrepriseRepository entrepriseRepository,
                         MembreRepository membreRepository,
                         EtablissementRepository etablissementRepository) {
        this.dailyStatistiqueRepository = dailyStatistiqueRepository;
        this.entrepriseRepository = entrepriseRepository;
        this.membreRepository = membreRepository;
        this.etablissementRepository = etablissementRepository;
    }

    public DailyStatistiqueEntity getDailyStatistiqueByDate(Date date) {
        Calendar calendar = new GregorianCalendar();
        calendar.setTime(date);
        LocalDateTime ldt = LocalDateTime.of(calendar.get(Calendar.YEAR), calendar.get(Calendar.MONTH)+1, calendar.get(Calendar.DAY_OF_MONTH), 0, 0, 0);
        List<DailyStatistiqueEntity> list = dailyStatistiqueRepository.findByDate(ldt);
        if (list.isEmpty()) {
            return null;
        } else {
            return list.get(0);
        }
    }

    public WelcomeModerateurDTO getWelcomeModerateurDTO() {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.DAY_OF_YEAR, -5);
        System.out.println(calendar.getTime());
        DailyStatistiqueEntity oneMonth = getDailyStatistiqueByDate(calendar.getTime());

        WelcomeModerateurDTO welcomeModerateurDTO = new WelcomeModerateurDTO();

        if (oneMonth != null) {

            Long countCaisseActif = oneMonth.getCountCaisseActif();
            Long countOrganismeComplementaireActif = oneMonth.getCountOrganismeComplementaireActif();
            Long countMembreCaisseActif = oneMonth.getCountMembreCaisseActif();
            Long countMembreOrganismeComplementaireActif = oneMonth.getCountMembreOrganismeComplementaireActif();
            Long countPointAccueil = oneMonth.getCountPointAccueilActif();

            Long todayCountCaisseActif = entrepriseRepository.getCaissesActifsCount();
            Long todayCountOrganismeComplementaireActif = entrepriseRepository.getOrganismeComplementairesActifsCount();
            Long todayCountMembreCaisseActif = (long) membreRepository.getMembreActifByGroupe(GroupeEnum.CAISSE).size();
            Long todayCountMembreOrganismeComplementaireActif = (long) membreRepository.getMembreActifByGroupe(GroupeEnum.ORGANISME_COMPLEMENTAIRE).size();
            Long todayPointAccueilCount = etablissementRepository.getPointAccueilActifOnOcActifCount();

            welcomeModerateurDTO.setMembresAModerer(membreRepository.getMembreAModerer().stream().map(m -> m.getNom()+" "+m.getPrenom()).toList());
            welcomeModerateurDTO.setMembresActifCount(countMembreCaisseActif + countMembreOrganismeComplementaireActif);
            welcomeModerateurDTO.setMembresActifEvoPercent((todayCountMembreCaisseActif + todayCountMembreOrganismeComplementaireActif - countMembreCaisseActif - countMembreOrganismeComplementaireActif) / (countMembreCaisseActif + countMembreOrganismeComplementaireActif) * 100);
            welcomeModerateurDTO.setOrganisationsActifCount(todayCountCaisseActif + todayCountOrganismeComplementaireActif);
            welcomeModerateurDTO.setOrganisationsActifEvoPercent((todayCountCaisseActif + todayCountOrganismeComplementaireActif - countCaisseActif - countOrganismeComplementaireActif) / (countCaisseActif + countOrganismeComplementaireActif) * 100);
            welcomeModerateurDTO.setPointAccueilActifCount(todayPointAccueilCount);
            welcomeModerateurDTO.setPointAccueilActifEvoPercent((todayPointAccueilCount - countPointAccueil) / countPointAccueil * 100);

        }

        return welcomeModerateurDTO;
    }

    Long getPercentage(Double numerateur, Double denominateur) {
        Double r = numerateur / denominateur;
        r = (double) Math.round(r * 100);
        return r.longValue();
    }

    public void createDailyStatistique() {

        List<GroupeEnum> groupes = new ArrayList<>();
        groupes.add(GroupeEnum.CAISSE);

        DailyStatistiqueEntity entity = new DailyStatistiqueEntity();

        // entreprises count
        entity.setCountCaisseActif(entrepriseRepository.getCaissesActifsCount());
        entity.setCountOrganismeComplementaireActif(entrepriseRepository.getOrganismeComplementairesActifsCount());

        // membres count
        entity.setCountMembreCaisseActif((long) membreRepository.getMembreActifByGroupe(GroupeEnum.CAISSE).size());
        entity.setCountMembreOrganismeComplementaireActif((long) membreRepository.getMembreActifByGroupe(GroupeEnum.ORGANISME_COMPLEMENTAIRE).size());
        entity.setCountModerateurActif((long) membreRepository.getModerateurs().size());

        // point d'accueil
        entity.setCountPointAccueilActif(etablissementRepository.getPointAccueilActifOnOcActifCount());

        dailyStatistiqueRepository.save(entity);
    }
}
