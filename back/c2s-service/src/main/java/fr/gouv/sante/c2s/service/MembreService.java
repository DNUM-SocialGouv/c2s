package fr.gouv.sante.c2s.service;

import fr.gouv.sante.c2s.keycloak.KeycloakMonoRealmService;
import fr.gouv.sante.c2s.model.GroupeEnum;
import fr.gouv.sante.c2s.model.SectionEnum;
import fr.gouv.sante.c2s.model.StatutMembreEnum;
import fr.gouv.sante.c2s.model.TypeMembreEnum;
import fr.gouv.sante.c2s.model.dto.*;
import fr.gouv.sante.c2s.model.dto.membre.MembreEquipeDTO;
import fr.gouv.sante.c2s.model.dto.membre.MembreInfoDTO;
import fr.gouv.sante.c2s.model.dto.membre.MembrePasswordToResetDTO;
import fr.gouv.sante.c2s.model.dto.membre.MembreToRegistertDTO;
import fr.gouv.sante.c2s.model.dto.session.MembreSessionDTO;
import fr.gouv.sante.c2s.model.entity.EntrepriseEntity;
import fr.gouv.sante.c2s.model.entity.MembreEntity;
import fr.gouv.sante.c2s.model.exception.ManualConstraintViolationException;
import fr.gouv.sante.c2s.repository.*;
import fr.gouv.sante.c2s.repository.mapper.Mapper;
import fr.gouv.sante.c2s.service.history.HistoryMembreService;
import fr.gouv.sante.c2s.service.history.SilentHistoryServiceWrapper;
import fr.gouv.sante.c2s.service.mail.EmailBusinessService;
import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Slf4j
@Transactional
public class MembreService {

    // l instanciation d'un silent history service wrapper est un peu particulière compte tenu de sa généricité,
    // d'ou l'utilisation de PostConstruct
    @Autowired
    HistoryMembreService historyMembreService;

    SilentHistoryServiceWrapper<MembreInfoDTO, MembreEntity, HistoryMembreService> silentHistoryServiceWrapper;

    @Autowired
    MembreRepository membreRepository;

    @Autowired
    EntrepriseRepository entrepriseRepository;

    @Autowired
    KeycloakMonoRealmService keycloakService;

    @Autowired
    EmailBusinessService emailBusinessService;

    @Autowired
    Mapper mapper;

    @PostConstruct
    void initService() {
        this.silentHistoryServiceWrapper = new SilentHistoryServiceWrapper<>(historyMembreService);
    }

    public MembreInfoDTO registerMembre(MembreToRegistertDTO registerInputDTO, String labelSociete) {

        try {

            MembreEntity membreEntity = MembreEntity.builder()
                    .prenom(registerInputDTO.getPrenom())
                    .fonction(registerInputDTO.getFonction())
                    .email(registerInputDTO.getEmail())
                    .nom(registerInputDTO.getNom())
                    .telephone(registerInputDTO.getTelephone())
                    .societe(registerInputDTO.getSociete())
                    .dateInscription(LocalDateTime.now())
                    .groupe(GroupeEnum.valueOf(registerInputDTO.getGroupe()))
                    .statut(StatutMembreEnum.A_MODERER)
                    .build();

            if (registerInputDTO.getSiren()!=null) {
                EntrepriseEntity entreprise = entrepriseRepository.findEntrepriseBySiren(registerInputDTO.getSiren());
                membreEntity.setEntreprise(entreprise);
            }

            log.info("Nouveau membre à enregistrer");
            membreRepository.save(membreEntity);
            log.info("Membre enregistré : " + membreEntity.getId());

            log.info("Membre dans Keycloak "+membreEntity.getEmail()+" "+membreEntity.getNom()+" "+membreEntity.getPrenom()+" "+membreEntity.getGroupe());
            UserRepresentation userRepresentation = keycloakService.getAdminService().createUser(membreEntity.getEmail(), membreEntity.getNom(), membreEntity.getPrenom(), membreEntity.getGroupe());
            log.info("Membre créé dans Keycloak");

            return mapper.mapMembreToInfoDto(membreEntity);

        } catch (Exception e) {
            log.error("Échec de la sauvegarde du membre ", e);
            return null;
        }
    }

    public boolean isEntrepriseExists(String siren) {
        return entrepriseRepository.findEntrepriseBySiren(siren)!=null;
    }

    public EntrepriseDTO getEntrepriseBySiren(String siren) {
        return mapper.mapEntrepriseToEntrepriseDto(entrepriseRepository.findEntrepriseBySiren(siren));
    }

    public boolean isEmailExists(String email) {
        List<MembreEntity> membreEntities = membreRepository.findMembreByEmail(email);
        return membreEntities != null && !membreEntities.isEmpty();
    }

    public MembreInfoDTO getMembreByEmail(String email) {
        List<MembreEntity> membreEntities = membreRepository.findMembreByEmail(email);
        if (membreEntities != null && membreEntities.size() == 1) {
            MembreEntity membreEntity = membreEntities.get(0);
            return MembreInfoDTO.builder()
                    .membreId(membreEntity.getId())
                    .email(membreEntity.getEmail())
                    .prenom(membreEntity.getPrenom())
                    .nom(membreEntity.getNom())
                    .telephone(membreEntity.getTelephone())
                    .fonction(membreEntity.getFonction())
                    .groupe(membreEntity.getGroupe())
                    .siren(membreEntity.getEntreprise() != null ? membreEntity.getEntreprise().getSiren() : null)
                    .build();
        }
        return null;
    }

    public void updateMembreInfo(MembreSessionDTO membreSessionDTO, MembreInfoDTO membre) {
        if (membre == null) {
            log.warn("Tentative de mise à jour avec un membre null");
            return;
        }
        Optional.ofNullable(membre.getPassword())
                .filter(password -> !password.isEmpty())
                .ifPresent(password -> {
                    try {
                        MembrePasswordToResetDTO resetRequestDTO = MembrePasswordToResetDTO.builder()
                                .password(password)
                                .email(membre.getEmail())
                                .build();
                        boolean result = keycloakService.getAdminService().resetPassword(resetRequestDTO.getEmail(), resetRequestDTO.getPassword());
                        if (result) {
                            historyMembreService.saveSpecificObjectOperation(SectionEnum.MES_INFORMATIONS, membreSessionDTO,"Modifie son mot de passe");
                        }
                        //System.out.println("result : " + result);
                        log.info("Mot de passe réinitialisé pour l'email: {}", membre.getEmail());
                    } catch (Exception e) {
                        log.error("Échec de la réinitialisation du mot de passe pour l'email: {}", membre.getEmail(), e);
                    }
                });

        boolean modifyName = false;
        String email = "";
        String nom = "";
        String prenom = "";

        try {

            Optional<MembreEntity> optionalMembre = membreRepository.findById(membre.getMembreId());

            if (optionalMembre.isPresent()) {

                // Mise à jour des informations du membre
                MembreEntity membreEntity = optionalMembre.get();

                if (!membreEntity.getNom().equals(membre.getNom()) || !membreEntity.getPrenom().equals(membre.getPrenom())) {
                    modifyName = true;
                    email = membre.getEmail();
                    nom = membre.getNom();
                    prenom = membre.getPrenom();
                    silentHistoryServiceWrapper.saveModifyObjectOperation(membreSessionDTO, membreEntity, membre);
                }
                membreEntity.setNom(membre.getNom());
                membreEntity.setPrenom(membre.getPrenom());
                membreEntity.setTelephone(membre.getTelephone());
                membreEntity.setFonction(membre.getFonction());
                membreEntity.setDateMaj(LocalDateTime.now());
                membreRepository.save(membreEntity);
                log.info("Informations du membre avec l'ID {} mises à jour.", membre.getMembreId());
            }

        } catch (Exception e) {
            log.error("Échec de la mise à jour des informations du membre avec l'ID: {}", membre.getMembreId(), e);
            modifyName = false;
        }

        if (modifyName) {
            keycloakService.getAdminService().updateUser(email, nom, prenom);
        }
    }

    public void setLoginDate(MembreSessionDTO membreSession, String email) {
        List<MembreEntity> membres = membreRepository.findMembreByEmail(email);
        if (membres != null && membres.size() == 1) {
            MembreEntity membre = membres.get(0);
            if (membre.getLastLoginDate()==null) {
                silentHistoryServiceWrapper.saveSpecificObjectOperation(SectionEnum.MON_EQUIPE, membreSession, "Première connexion");
            }
            if (membre.getStatut()==StatutMembreEnum.A_MODERER
                    || membre.getStatut()==StatutMembreEnum.REFUSE
                    || membre.getStatut()==StatutMembreEnum.SUPPRIMER) {
                throw new IllegalStateException("Le statut ne permets pas cette opération [login]");
            }
            membre.setStatut(StatutMembreEnum.ACTIF);
            membre.setLastLoginDate(LocalDateTime.now());
            membreRepository.save(membre);
        }
    }

    public boolean deleteMembre(MembreSessionDTO membre, String email) {
        MembreEntity membreEntity = membreRepository.findMembreByEmail(email).get(0);
        if (membreEntity != null) {
            membreEntity.setStatut(StatutMembreEnum.SUPPRIMER);
            membreRepository.deleteById(membreEntity.getId());
            keycloakService.getAdminService().disableUser(email);
            silentHistoryServiceWrapper.saveDeleteObjectOperation(membre, mapper.mapMembreToInfoDto(membreEntity));
            return true;
        }
        return false;
    }

    public List<MembreEquipeDTO> getMembresEnAttenteModeration() {
        return membreRepository.getMembreAModerer().stream().map(this::getMembreEnAttenteModeration).collect(Collectors.toList());
    }

    private MembreEquipeDTO getMembreEnAttenteModeration(MembreEntity membre) {
        MembreEquipeDTO membreEquipeDTO = new MembreEquipeDTO();
        membreEquipeDTO.setNom(membre.getNom());
        membreEquipeDTO.setPrenom(membre.getPrenom());
        membreEquipeDTO.setSociete(membre.getEntreprise().getNom());
        membreEquipeDTO.setEmail(membre.getEmail());
        return membreEquipeDTO;
    }

    public List<MembreEquipeDTO> getMembres(String siren) {
        return membreRepository.getMembreBySiren(siren).stream()
                .map(mapper::mapMembreToMembreEquipeDto)
                .collect(Collectors.toList());
    }

    public boolean setMembreTypes(MembreSessionDTO membreSession, String email, TypeMembreEnum[] types) {
        try {
            MembreEntity membre = membreRepository.findMembreByEmail(email).get(0);

            // vérification que le type n'est pas déjà attribué
            List<MembreEntity> membres = membreRepository.countMembreBySirenAndNotEmail(email, membre.getEntreprise().getSiren());

            List<String> labels = new ArrayList<>();
            typeLoop:
            for (TypeMembreEnum type : types) {
                for (MembreEntity membreEntity : membres) {
                    if (membreEntity.getTypes() != null && Arrays.asList(membreEntity.getTypes()).contains(type)) {
                        labels.add(TypeMembreEnum.getLabel(type));
                        continue typeLoop;
                    }
                }
            }

            if (labels.size() == 1) {
                if (types.length == 1) {
                    throw new ManualConstraintViolationException("type", "Cette référence \"" + labels.get(0) + "\" est déjà attribuée");
                } else {
                    throw new ManualConstraintViolationException("type", "La référence \"" + labels.get(0) + "\" a déjà été attribuée");
                }
            } else if (labels.size() > 1) {
                if (labels.size() == types.length) {
                    throw new ManualConstraintViolationException("type", "Ces " + labels.size() + " types sont déjà attribués");
                } else if (labels.size() == 2) {
                    throw new ManualConstraintViolationException("type", "Les références \"" + labels.get(0) + "\" et \"" + labels.get(1) + "\" sont déjà attribuées");
                }
            }
            // fin vérification

            membre.setTypes(types);
            membreRepository.save(membre);
            String message = "";
            switch (types.length) {
                case 0: {
                    message = "Définit aucun type sur le membre " + membre.getPrenom() + " " + membre.getNom();
                    break;
                }
                case 1: {
                    message = "Définit le type " + types[0].name() + " sur le membre " + membre.getPrenom() + " " + membre.getNom();
                    break;
                }
                case 2: {
                    message = "Définit les types " + types[0].name() + " et " + types[1].name() + " sur le membre " + membre.getPrenom() + " " + membre.getNom();
                    break;
                }
                case 3: {
                    message = "Définit les types " + types[0].name() + ", " + types[1].name() + " et " + types[2].name() + " sur le membre " + membre.getPrenom() + " " + membre.getNom();
                    break;
                }
            }
            silentHistoryServiceWrapper.saveSpecificObjectOperation(SectionEnum.MON_EQUIPE, membreSession, message);
        } catch (ManualConstraintViolationException mcve) {
            throw mcve;
        } catch (Exception e) {
            log.error(e.getMessage());
            return false;
        }
        return true;
    }

    public void sendMailInvitation(String emailInviteur, String emailInvite, String baseUrl) {
        if (!membreRepository.findMembreByEmail(emailInvite).isEmpty()) {
            throw new ManualConstraintViolationException("email", "Ce compte existe déjà");
        }
        MembreEntity membre = membreRepository.findMembreByEmail(emailInviteur).get(0);
        emailBusinessService.sendMailInvitation(baseUrl, membre, emailInvite);
    }

    public void applySoftDelete(StatutMembreEnum statutMembreEnum, Integer nombreDeMois) {
        Calendar calendar = new GregorianCalendar();
        calendar.add(Calendar.MONTH, -nombreDeMois);
        StatutMembreEnum[] statuts = {statutMembreEnum};
        GroupeEnum[] groupes = {GroupeEnum.CAISSE, GroupeEnum.ORGANISME_COMPLEMENTAIRE};
        LocalDateTime localDateTime = Instant.ofEpochMilli(calendar.getTime().getTime()).atZone(ZoneId.systemDefault()).toLocalDateTime();
        membreRepository.getMembresByStatutAndGroupeBeforeLastLoginDate(statuts, groupes, localDateTime).forEach(membre -> {
            if (membre.getStatut()==statutMembreEnum) {
                membre.setStatut(StatutMembreEnum.SUPPRIMER);
                membre.setTypes(null);
                log.info("Suppression logique du membre : " + membre.getPrenom() + " " + membre.getNom() + " - " + membre.getEmail() + " - " + membre.getEntreprise().getNom());
                membreRepository.save(membre);
                keycloakService.getAdminService().disableUser(membre.getEmail());
            }
        });
    }

    public void applyHardDelete(StatutMembreEnum statut, Integer nombreDeMois) {
        if (statut==StatutMembreEnum.ACTIF) {
            throw new IllegalArgumentException(statut.toString());
        }
        Calendar calendar = new GregorianCalendar();
        calendar.add(Calendar.MONTH, -nombreDeMois);
        StatutMembreEnum[] statuts = {statut};
        GroupeEnum[] groupes = {GroupeEnum.CAISSE, GroupeEnum.ORGANISME_COMPLEMENTAIRE};
        LocalDateTime localDateTime = Instant.ofEpochMilli(calendar.getTime().getTime()).atZone(ZoneId.systemDefault()).toLocalDateTime();
        membreRepository.getMembresByStatutAndGroupeBeforeLastLoginDate(statuts, groupes, localDateTime).forEach(membre -> {
            if (membre.getStatut()==statut) {
                log.info("Suppression physique du membre : " + membre.getPrenom() + " " + membre.getNom() + " - " + membre.getEmail() + " - " + membre.getEntreprise().getNom());
                membreRepository.deleteMembre(membre.getId());
                keycloakService.getAdminService().deleteUserByEmail(membre.getEmail());
            }
        });
    }

    public void applySoftDelete(EntrepriseEntity entreprise) {
        List<MembreEntity> membres = membreRepository.getMembreBySiren(entreprise.getSiren());
        membres.forEach(membre -> {
            if (membre.getStatut()!=StatutMembreEnum.SUPPRIMER) {
                membre.setStatut(StatutMembreEnum.SUPPRIMER);
                membreRepository.save(membre);
                keycloakService.getAdminService().disableUser(membre.getEmail());
            }
        });
    }

    public void applyMembreInactif(Integer nombreDeMois) {
        Calendar calendar = new GregorianCalendar();
        calendar.add(Calendar.MONTH, -nombreDeMois);
        StatutMembreEnum[] statuts = {StatutMembreEnum.ACTIF};
        GroupeEnum[] groupes = {GroupeEnum.CAISSE, GroupeEnum.ORGANISME_COMPLEMENTAIRE};
        LocalDateTime localDateTime = Instant.ofEpochMilli(calendar.getTime().getTime()).atZone(ZoneId.systemDefault()).toLocalDateTime();
        membreRepository.getMembresByStatutAndGroupeBeforeLastLoginDate(statuts, groupes, localDateTime).forEach(membre -> {
            membre.setStatut(StatutMembreEnum.INACTIF);
            membreRepository.save(membre);
        });
    }

}
