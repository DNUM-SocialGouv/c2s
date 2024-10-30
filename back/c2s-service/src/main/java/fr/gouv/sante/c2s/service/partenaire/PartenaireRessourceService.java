package fr.gouv.sante.c2s.service.partenaire;

import fr.gouv.sante.c2s.file.FileService;
import fr.gouv.sante.c2s.model.C2SConstants;
import fr.gouv.sante.c2s.model.GroupeEnum;
import fr.gouv.sante.c2s.model.dto.AllRessourcesDTO;
import fr.gouv.sante.c2s.model.dto.resource.RessourceFichierDTO;
import fr.gouv.sante.c2s.model.dto.resource.RessourceThematiqueDTO;
import fr.gouv.sante.c2s.model.entity.RessourceFichierEntity;
import fr.gouv.sante.c2s.repository.RessourceFichierRepository;
import fr.gouv.sante.c2s.repository.RessourceThematiqueRepository;
import fr.gouv.sante.c2s.repository.mapper.Mapper;
import fr.gouv.sante.c2s.service.CsvBusinessService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.text.SimpleDateFormat;
import java.time.ZoneOffset;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@Transactional
public class PartenaireRessourceService {

    SimpleDateFormat dateMiseAJourFormat;
    FileService fileService;
    CsvBusinessService csvBusinessService;
    RessourceThematiqueRepository ressourceThematiqueRepository;
    RessourceFichierRepository ressourceFichierRepository;
    Mapper mapper;

    @Autowired
    public PartenaireRessourceService(FileService fileService, CsvBusinessService csvBusinessService, RessourceThematiqueRepository ressourceThematiqueRepository, RessourceFichierRepository ressourceFichierRepository, Mapper mapper) {
        this.dateMiseAJourFormat = new SimpleDateFormat("dd MMMM yyyy");
        this.fileService = fileService;
        this.csvBusinessService = csvBusinessService;
        this.ressourceThematiqueRepository = ressourceThematiqueRepository;
        this.ressourceFichierRepository = ressourceFichierRepository;
        this.mapper = mapper;
    }

    public AllRessourcesDTO getAllRessources(GroupeEnum groupe) {
        AllRessourcesDTO allRessources = new AllRessourcesDTO();
        String groupeLike = "%";
        if (groupe==null) {
            groupeLike = "%"+groupe.name()+"%";
        }
        List<RessourceFichierDTO> fichiers = ressourceFichierRepository.getRessourceFichierByGroupe(groupeLike).stream().map(it -> mapper.mapRessourceFichierToDto(it, false)).collect(Collectors.toList());
        if (fichiers!=null && fichiers.size()>0) {
            fichiers.sort(Comparator.comparing(RessourceFichierDTO::getDateCrea).reversed());
            allRessources.setFichiers(fichiers);
            long time = fichiers.get(0).getDateCrea().toEpochSecond(ZoneOffset.UTC) * 1000;
            Date date = new Date(time);
            allRessources.setDateMiseAJour(dateMiseAJourFormat.format(date));
        }
        allRessources.setThematiques(ressourceThematiqueRepository.getRessourceThematiquesByGroupe(groupeLike).stream().map(mapper::mapRessourceThematiqueToDto).collect(Collectors.toList()));
        return allRessources;
    }

    public List<RessourceFichierDTO> getRessourceFichiers(String recherche, Long thematiqueId, String extension, GroupeEnum groupe) {
        return ressourceFichierRepository.getRessourceFichierByNomAndRessourceThematiqueAndExtensionAndGroupe("%"+recherche+"%", thematiqueId, extension, groupe!=null ? "%"+groupe.name()+"%" : null)
                .stream()
                .map(it -> mapper.mapRessourceFichierToDto(it, false))
                .collect(Collectors.toList());
    }

    public RessourceThematiqueDTO getRessourceThematique(Long id) {
        return ressourceThematiqueRepository.findById(id).map(mapper::mapRessourceThematiqueToDto).orElse(null);
    }

    public RessourceFichierDTO getRessourceFichier(Long id, boolean backUsageOnly) {
        RessourceFichierEntity fichier = ressourceFichierRepository.findById(id).orElse(null);
        return fichier!=null ? mapper.mapRessourceFichierToDto(fichier, backUsageOnly) : null;
    }

    public File getOCReferents() {
        try {
            File file = fileService.getWorkingFile("references-oc.csv", C2SConstants.ApplicationDirectory.TEMP_DIRECTORY);
            csvBusinessService.exportOCReferents(file);
            return file;
        } catch (Exception e) {
            log.error(e.getMessage());
            return null;
        }
    }

}
