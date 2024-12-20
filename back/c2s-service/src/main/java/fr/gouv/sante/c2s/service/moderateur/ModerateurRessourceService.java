package fr.gouv.sante.c2s.service.moderateur;

import fr.gouv.sante.c2s.file.FileService;
import fr.gouv.sante.c2s.model.C2SConstants;
import fr.gouv.sante.c2s.model.GroupeEnum;
import fr.gouv.sante.c2s.model.dto.resource.RessourceFichierDTO;
import fr.gouv.sante.c2s.model.dto.resource.RessourceThematiqueDTO;
import fr.gouv.sante.c2s.model.entity.RessourceFichierEntity;
import fr.gouv.sante.c2s.model.entity.RessourceThematiqueEntity;
import fr.gouv.sante.c2s.model.exception.ManualConstraintViolationException;
import fr.gouv.sante.c2s.repository.*;
import fr.gouv.sante.c2s.repository.mapper.Mapper;
import fr.gouv.sante.c2s.service.CsvBusinessService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
@Transactional
public class ModerateurRessourceService {

    FileService fileService;
    CsvBusinessService csvBusinessService;
    RessourceThematiqueRepository ressourceThematiqueRepository;
    RessourceFichierRepository ressourceFichierRepository;
    Mapper mapper;

    @Autowired
    public ModerateurRessourceService(FileService fileService, CsvBusinessService csvBusinessService, RessourceThematiqueRepository ressourceThematiqueRepository, RessourceFichierRepository ressourceFichierRepository, Mapper mapper) {
        this.fileService = fileService;
        this.csvBusinessService = csvBusinessService;
        this.ressourceThematiqueRepository = ressourceThematiqueRepository;
        this.ressourceFichierRepository = ressourceFichierRepository;
        this.mapper = mapper;
    }

    public List<RessourceThematiqueDTO> getRessourceThematiques() {
        return ressourceThematiqueRepository.getRessourceThematiques()
                .stream()
                .map(mapper::mapRessourceThematiqueToDto)
                .collect(Collectors.toList());
    }

    public RessourceThematiqueDTO getRessourceThematique(Long id) {
        Optional<RessourceThematiqueEntity> optionalRessourceThematique = ressourceThematiqueRepository.findById(id);
        return optionalRessourceThematique.map(ressourceThematiqueEntity -> mapper.mapRessourceThematiqueToDto(ressourceThematiqueEntity)).orElse(null);
    }

    public RessourceThematiqueDTO addThematique(String nom, String description, List<GroupeEnum> groupes) {
        RessourceThematiqueEntity ressourceThematique = new RessourceThematiqueEntity();
        ressourceThematique.setTitre(nom);
        ressourceThematique.setDescription(description);
        ressourceThematique.setGroupes(groupes);
        ressourceThematique.setOrdre(-1);
        ressourceThematique.setPublique(false);
        return mapper.mapRessourceThematiqueToDto(ressourceThematiqueRepository.save(ressourceThematique));
    }

    public RessourceThematiqueDTO updateThematique(Long id, String nom, String description, List<GroupeEnum> groupes, Integer ordre) {

        Optional<RessourceThematiqueEntity> optionalRessourceThematique = ressourceThematiqueRepository.findById(id);

        return optionalRessourceThematique.map(entity -> {
            entity.setTitre(nom);
            entity.setDescription(description);
            entity.setGroupes(groupes);
            if (ordre!=null) {
                entity.setOrdre(ordre);
            }
            entity.setPublique(false);
            return mapper.mapRessourceThematiqueToDto(ressourceThematiqueRepository.save(entity));
        }).orElse(null);
    }

    public boolean deleteThematique(Long id) {
        Optional<RessourceThematiqueEntity> optionalRessourceThematique = ressourceThematiqueRepository.findById(id);
        if (optionalRessourceThematique.isPresent()) {
            List<RessourceFichierEntity> fichiers = ressourceFichierRepository.getRessourceFichierByThematique(optionalRessourceThematique.get().getId());
            if (fichiers!=null && !fichiers.isEmpty()) {
                throw new ManualConstraintViolationException("fichiers", "Cette thématique contient "+fichiers.size()+" fichier"+(fichiers.size()==1?"":"s"));
            }
            ressourceThematiqueRepository.deleteById(id);
        }
        return true;
    }

    public boolean validRessourceThematiqueId(Long ressourceThematiqueId) {
        if (ressourceThematiqueId==null) {
            return false;
        }
        RessourceThematiqueEntity thematique = ressourceThematiqueRepository.findById(ressourceThematiqueId).orElse(null);
        return thematique!=null;
    }

    public List<RessourceFichierDTO> getRessourceFichiers() {
        return ressourceFichierRepository.getRessourceFichiers()
                .stream()
                .map(it -> mapper.mapRessourceFichierToDto(it, true))
                .collect(Collectors.toList());
    }

    public Long getFichierCount() {
        return ressourceFichierRepository.count();
    }

    public RessourceFichierDTO getRessourceFichier(Long id) {
        return ressourceFichierRepository.findById(id).map(it -> mapper.mapRessourceFichierToDto(it, true)).orElse(null);
    }

    public RessourceFichierDTO addRessourceFichier(Long ressourceThematiqueId, String fileName, String extension, Long taille, String directory, String uuid) {
        Optional<RessourceThematiqueEntity> optionalThematique = ressourceThematiqueRepository.findById(ressourceThematiqueId);
        return optionalThematique.map(thematique -> {
            RessourceFichierEntity ressourceFichier = new RessourceFichierEntity();
            ressourceFichier.setRessourceThematique(optionalThematique.get());
            ressourceFichier.setExtension(extension);
            ressourceFichier.setNom(fileName);
            ressourceFichier.setRepertoire(directory);
            ressourceFichier.setUuid(uuid);
            ressourceFichier.setTaille(taille);
            return mapper.mapRessourceFichierToDto(ressourceFichierRepository.save(ressourceFichier), true);
        }).orElse(null);
    }

    public boolean updateRessourceThematiqueOrder(Long ressourceThematiqueId, Long order) {
        return ressourceThematiqueRepository.findById(ressourceThematiqueId).map(thematique -> {
            thematique.setOrdre(order.intValue());
            ressourceThematiqueRepository.save(thematique);
            return true;
        }).orElse(false);
    }

    public boolean updateRessourceThematiquesOrders(Long[][] allThematiqueIdWithOrder) {
        boolean done = true;
        try {
            if (allThematiqueIdWithOrder != null) {
                for (Long[] thematiqueIdWithOrder : allThematiqueIdWithOrder) {
                    done = done && updateRessourceThematiqueOrder(thematiqueIdWithOrder[0], thematiqueIdWithOrder[1]);
                }
            } else {
                done = false;
            }
        } catch (Exception e) {
            log.error(e.getMessage());
            done = false;
        }
        return done;
    }

    public boolean deleteFichier(Long id) {
        RessourceFichierEntity ressourceFichier = ressourceFichierRepository.findById(id).orElse(null);
        if (ressourceFichier!=null) {
            ressourceFichierRepository.delete(ressourceFichier);
            return true;
        }
        return false;
    }

    public List<RessourceFichierDTO> searchFichiers(String nom, Long thematiqueId, String extension, GroupeEnum groupe) {
        if (nom!=null) {
            nom = "%"+nom+"%";
        }
        return ressourceFichierRepository.getRessourceFichierByNomAndRessourceThematiqueAndExtensionAndGroupe(nom, thematiqueId, extension, groupe!=null ? "%"+groupe.name()+"%" : null)
                .stream().map(f -> mapper.mapRessourceFichierToDto(f, true)).collect(Collectors.toList());
    }

    public File getOCReferents() {
        try {
            File file = fileService.getWorkingFile("references-oc-"+new Date().getTime()+".csv", C2SConstants.ApplicationDirectory.TEMP_DIRECTORY);
            csvBusinessService.exportOCReferentsToModerateur(file);
            return file;
        } catch (Exception e) {
            e.printStackTrace();
            log.error(e.getMessage());
            return null;
        }
    }

}
