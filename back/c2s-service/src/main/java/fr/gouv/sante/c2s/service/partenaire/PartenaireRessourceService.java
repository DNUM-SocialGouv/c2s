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
import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.GetMapping;

import java.io.File;
import java.io.FileInputStream;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@Transactional
public class PartenaireRessourceService {

    FileService fileService;
    CsvBusinessService csvBusinessService;
    RessourceThematiqueRepository ressourceThematiqueRepository;
    RessourceFichierRepository ressourceFichierRepository;
    Mapper mapper;

    @Autowired
    public PartenaireRessourceService(FileService fileService, CsvBusinessService csvBusinessService, RessourceThematiqueRepository ressourceThematiqueRepository, RessourceFichierRepository ressourceFichierRepository, Mapper mapper) {
        this.fileService = fileService;
        this.csvBusinessService = csvBusinessService;
        this.ressourceThematiqueRepository = ressourceThematiqueRepository;
        this.ressourceFichierRepository = ressourceFichierRepository;
        this.mapper = mapper;
    }

    public AllRessourcesDTO getAllRessources(GroupeEnum groupe) {
        AllRessourcesDTO allRessources = new AllRessourcesDTO();
        allRessources.setFichiers(ressourceFichierRepository.getRessourceFichierByGroupe("%"+groupe.name()+"%").stream().map(it -> mapper.mapRessourceFichierToDto(it, false)).collect(Collectors.toList()));
        allRessources.setThematiques(ressourceThematiqueRepository.getRessourceThematiquesByGroupe(groupe).stream().map(mapper::mapRessourceThematiqueToDto).collect(Collectors.toList()));
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
