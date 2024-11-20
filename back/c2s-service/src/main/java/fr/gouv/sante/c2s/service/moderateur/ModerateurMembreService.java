package fr.gouv.sante.c2s.service.moderateur;

import fr.gouv.sante.c2s.keycloak.KeycloakMonoRealmService;
import fr.gouv.sante.c2s.model.GroupeEnum;
import fr.gouv.sante.c2s.model.StatutMembreEnum;
import fr.gouv.sante.c2s.model.dto.membre.MembreAndPartenaireDTO;

import fr.gouv.sante.c2s.model.dto.membre.moderateur.ModerateurDTO;
import fr.gouv.sante.c2s.model.dto.session.MembreSessionDTO;
import fr.gouv.sante.c2s.model.entity.MembreEntity;
import fr.gouv.sante.c2s.repository.MembreRepository;
import fr.gouv.sante.c2s.repository.mapper.Mapper;
import fr.gouv.sante.c2s.service.C2SService;
import fr.gouv.sante.c2s.service.history.moderateur.SilentHistoryModerateurService;
import fr.gouv.sante.c2s.service.mail.EmailBusinessService;
import fr.gouv.sante.c2s.service.moderateur.moderateurs.uow.ModeratorUnitOfWork;
import fr.gouv.sante.c2s.service.moderateur.moderateurs.uow.command.create.CreateModerateurDatabaseCommand;
import fr.gouv.sante.c2s.service.moderateur.moderateurs.uow.command.create.CreateModerateurEmailCommand;
import fr.gouv.sante.c2s.service.moderateur.moderateurs.uow.command.create.CreateModerateurKeycloakCommand;
import fr.gouv.sante.c2s.service.moderateur.moderateurs.uow.command.update.UpdateModerateurDatabaseCommand;
import fr.gouv.sante.c2s.service.moderateur.moderateurs.uow.command.update.UpdateModerateurKeycloakCommand;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
@Slf4j
@Transactional
public class ModerateurMembreService extends C2SService {

    private Mapper mapper;
    private MembreRepository membreRepository;
    private EmailBusinessService emailBusinessService;
    private KeycloakMonoRealmService keycloakService;
    private SilentHistoryModerateurService silentHistoryModerateurService;
    private KeycloakMonoRealmService keycloakMonoRealmService;
    private CreateModerateurDatabaseCommand createModerateurDatabaseCommand;
    private CreateModerateurKeycloakCommand createModerateurKeycloakCommand;
    private CreateModerateurEmailCommand createModerateurEmailCommand;
    private ModeratorUnitOfWork moderatorUnitOfWorkCreation;
    private UpdateModerateurDatabaseCommand updateModerateurDatabaseCommand;
    private UpdateModerateurKeycloakCommand updateModerateurKeycloakCommand;
    private ModeratorUnitOfWork moderatorUnitOfWorkUpdate;

    @Autowired
    public ModerateurMembreService(MembreRepository membreRepository,
                                   EmailBusinessService emailBusinessService,
                                   KeycloakMonoRealmService keycloakService,
                                   SilentHistoryModerateurService silentHistoryModerateurService,
                                   Mapper mapper,
                                   CreateModerateurDatabaseCommand createModerateurDatabaseCommand,
                                   CreateModerateurKeycloakCommand createModerateurKeycloakCommand,
                                   CreateModerateurEmailCommand createModerateurEmailCommand,
                                   UpdateModerateurDatabaseCommand updateModerateurDatabaseCommand,
                                   UpdateModerateurKeycloakCommand updateModerateurKeycloakCommand) {
        this.membreRepository = membreRepository;
        this.emailBusinessService = emailBusinessService;
        this.keycloakService = keycloakService;
        this.silentHistoryModerateurService = silentHistoryModerateurService;
        this.mapper = mapper;
        this.createModerateurDatabaseCommand = createModerateurDatabaseCommand;
        this.createModerateurKeycloakCommand = createModerateurKeycloakCommand;
        this.moderatorUnitOfWorkCreation = new ModeratorUnitOfWork();
        this.moderatorUnitOfWorkCreation.addCommand(createModerateurDatabaseCommand);
        this.moderatorUnitOfWorkCreation.addCommand(createModerateurKeycloakCommand);
        this.moderatorUnitOfWorkCreation.addCommand(createModerateurEmailCommand);
        this.moderatorUnitOfWorkUpdate = new ModeratorUnitOfWork();
        this.moderatorUnitOfWorkUpdate.addCommand(updateModerateurDatabaseCommand);
        this.moderatorUnitOfWorkUpdate.addCommand(updateModerateurKeycloakCommand);
    }

    public List<MembreAndPartenaireDTO> searchPartenaire(StatutMembreEnum statut, GroupeEnum groupe, String like, Pageable pageable) {
        List<GroupeEnum> groupeIds = new ArrayList<>();
        if (groupe==null) {
            groupeIds.add(GroupeEnum.ORGANISME_COMPLEMENTAIRE);
            groupeIds.add(GroupeEnum.CAISSE);
        } else {
            groupeIds.add(groupe);
        }
        List<StatutMembreEnum> status = new ArrayList<>();
        if (statut==null) {
            status.add(StatutMembreEnum.ACTIF);
            status.add(StatutMembreEnum.A_MODERER);
            status.add(StatutMembreEnum.INACTIF);
            status.add(StatutMembreEnum.REFUSE);
        } else {
            status.add(statut);
        }
        return membreRepository.findMembreByStatutAndGroupeAndLikeClause(status,
                                                                        groupeIds,
                                                                        like,
                                                                        pageable);
    }

    public Long countPartenaire(StatutMembreEnum statut, GroupeEnum groupe, String like) {
        List<GroupeEnum> groupeIds = new ArrayList<>();
        if (groupe==null) {
            groupeIds.add(GroupeEnum.ORGANISME_COMPLEMENTAIRE);
            groupeIds.add(GroupeEnum.CAISSE);
        } else {
            groupeIds.add(groupe);
        }
        List<StatutMembreEnum> status = new ArrayList<>();
        if (statut==null) {
            status.add(StatutMembreEnum.ACTIF);
            status.add(StatutMembreEnum.A_MODERER);
            status.add(StatutMembreEnum.INACTIF);
            status.add(StatutMembreEnum.REFUSE);
        } else {
            status.add(statut);
        }
        return membreRepository.countMembreByStatutAndGroupeAndLikeClause(status, groupeIds, like);
    }

    public Long countAllPartenaire() {
        List<GroupeEnum> groupes = new ArrayList<>();
        groupes.add(GroupeEnum.ORGANISME_COMPLEMENTAIRE);
        groupes.add(GroupeEnum.CAISSE);
        List<StatutMembreEnum> status = new ArrayList<>();
        status.add(StatutMembreEnum.ACTIF);
        status.add(StatutMembreEnum.A_MODERER);
        status.add(StatutMembreEnum.INACTIF);
        status.add(StatutMembreEnum.REFUSE);
        return membreRepository.countMembreByStatutAndGroupeAndLikeClause(status, groupes, null);
    }

    public boolean changeStatut(MembreSessionDTO membreSession, String email, StatutMembreEnum statut, String token, String resetUrl) {
        try {

            List<MembreEntity> membres = membreRepository.findMembreByEmail(email);
            if (membres != null && membres.size() == 1) {
                MembreEntity membre = membres.get(0);
                String current = membre.getStatut().toString();
                if (membre.getStatut()!=StatutMembreEnum.ACTIF && statut==StatutMembreEnum.ACTIF) {
                    log.info("Send mail inscription valide");
                    sendMailInscriptionValide(membre, token, resetUrl);
                    keycloakService.getAdminService().enableUser(email);
                } else if (statut==StatutMembreEnum.SUPPRIMER || statut==StatutMembreEnum.INACTIF) {
                    membre.setTypes(null);
                    keycloakService.getAdminService().disableUser(email);
                }
                membre.setStatut(statut);
                membre = membreRepository.save(membre);
                silentHistoryModerateurService.saveMembreChangeStatut(membreSession, membre.getPrenom()+" "+membre.getNom(), membre.getEntreprise().getNom(), current, statut.name());
                return true;
            }
        } catch (Exception e) {
            log.error(e.getMessage());
        }
        return false;
    }

    private void sendMailInscriptionValide(MembreEntity membre, String token, String resetUrl) {
        emailBusinessService.sendMailInscriptionValide(membre, token, resetUrl);
    }

    public boolean deleteMembre(MembreSessionDTO membreSession, String email, String siren) {
        MembreEntity membre = membreRepository.findMembreByEmail(email).get(0);
        if (membre.getEntreprise().getSiren().equals(siren)) {
            membre.setStatut(StatutMembreEnum.INACTIF);
            keycloakService.getAdminService().disableUser(email);
            //MembreEntity membreEntity = membreRepository.save(membre);
            return true;
        }
        return false;
    }

    public List<ModerateurDTO> getModerateurs(StatutMembreEnum[] statuts) {
        return membreRepository.getModerateurs().stream().filter(it -> Arrays.asList(statuts).contains(it.getStatut())).map(mapper::mapMembreToModerateurDto).toList();
    }

    public boolean deleteModerateur(String email) {
        MembreEntity membre = membreRepository.findMembreByEmail(email).get(0);
        if (membre.getGroupe().equals(GroupeEnum.MODERATEUR)) {
            membre.setStatut(StatutMembreEnum.INACTIF);
            keycloakService.getAdminService().disableUser(email);
            return true;
        }
        return false;
    }

    public ModerateurDTO addModerateur(ModerateurDTO moderateurDTO, MembreSessionDTO membreSession) {
        return moderatorUnitOfWorkCreation.execute(moderateurDTO, membreSession);
    }

    public ModerateurDTO updateModerateur(ModerateurDTO moderateurDTO, MembreSessionDTO membreSession) {
        if (moderateurDTO.getId()==null) {
            throwManualException("id", "L'identifiant est requis");
        }
        return moderatorUnitOfWorkUpdate.execute(moderateurDTO, membreSession);
    }
}