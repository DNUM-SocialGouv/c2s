package fr.gouv.sante.c2s.repository;

import fr.gouv.sante.c2s.model.GroupeEnum;
import fr.gouv.sante.c2s.model.StatutMembreEnum;
import fr.gouv.sante.c2s.model.dto.MembreAndPartenaireDTO;
import fr.gouv.sante.c2s.model.entity.MembreEntity;
import fr.gouv.sante.c2s.model.entity.EntrepriseEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface MembreRepository extends CrudRepository<MembreEntity, Long>, PagingAndSortingRepository<MembreEntity, Long> {

    @Query("SELECT m FROM MembreEntity m WHERE lower(m.email) = lower(:email) ")
    List<MembreEntity> findMembreByEmail(@Param("email") String email);

    @Query("SELECT m FROM MembreEntity m WHERE m.entreprise.siren=:siren AND m.email!=:email ")
    List<MembreEntity> countMembreBySirenAndNotEmail(@Param("email") String email, @Param("siren") String siren);

    @Query("SELECT m.groupe FROM MembreEntity m WHERE lower(m.email) = lower(:email) ")
    GroupeEnum getGroupe(@Param("email") String email);

    @Query("select m.entreprise from MembreEntity m where lower(m.email) = lower(:email) ")
    EntrepriseEntity findOrganismeComplementaireByEmail(@Param("email") String email);

    @Query(" SELECT new fr.gouv.sante.c2s.model.dto.MembreAndPartenaireDTO(m) FROM MembreEntity m WHERE " +
           " (m.statut IN (:statut)) AND (m.groupe in (:groupes) OR (:groupes IS NULL)) AND " +
           " ((LOWER(m.nom) LIKE LOWER(:like) OR LOWER(m.prenom) LIKE LOWER(:like) OR LOWER(m.societe) LIKE LOWER(:like)) OR :like IS NULL)" +
           " ORDER BY m.id DESC " )
    List<MembreAndPartenaireDTO> findMembreByStatutAndGroupeAndLikeClause(@Param("statut") List<StatutMembreEnum> statut,
                                                                          @Param("groupes") List<GroupeEnum> groupes,
                                                                          @Param("like") String like,
                                                                          Pageable pageable);

    @Query(" SELECT COUNT(m) FROM MembreEntity m WHERE " +
           " (m.statut IN (:statut)) AND (m.groupe in (:groupes) OR (:groupes IS NULL)) AND " +
           " ((LOWER(m.nom) LIKE LOWER(:like) OR LOWER(m.prenom) LIKE LOWER(:like) OR LOWER(m.societe) LIKE LOWER(:like)) OR :like IS NULL)")
    Long countMembreByStatutAndGroupeAndLikeClause(@Param("statut") List<StatutMembreEnum> statut,
                                                   @Param("groupes") List<GroupeEnum> groupes,
                                                   @Param("like") String like);

    @Query("SELECT m FROM MembreEntity m WHERE m.groupe=:groupe AND m.statut=fr.gouv.sante.c2s.model.StatutMembreEnum.ACTIF ")
    List<MembreEntity> getMembreActifByGroupe(@Param("groupe") GroupeEnum groupe);

    @Query("SELECT m FROM MembreEntity m WHERE m.statut=fr.gouv.sante.c2s.model.StatutMembreEnum.A_MODERER ")
    List<MembreEntity> getMembreAModerer();

    @Query("SELECT m FROM MembreEntity m WHERE m.entreprise.siren=:siren ")
    List<MembreEntity> getMembreBySiren(@Param("siren") String siren);

    @Query("SELECT m FROM MembreEntity m WHERE m.groupe=fr.gouv.sante.c2s.model.GroupeEnum.MODERATEUR")
    List<MembreEntity> getModerateurs();

    @Modifying
    @Query("DELETE FROM MembreEntity m WHERE m.id=:id AND m.statut=fr.gouv.sante.c2s.model.StatutMembreEnum.INACTIF")
    Integer deleteMembre(@Param("id") Long id);

    @Query("SELECT m FROM MembreEntity m WHERE m.statut in (:statuts) AND m.groupe in (:groupes) AND m.lastLoginDate IS NOT NULL AND m.lastLoginDate<:lastLoginDate ")
    List<MembreEntity> getMembresByStatutAndGroupeBeforeLastLoginDate(@Param("statuts") StatutMembreEnum[] statuts, @Param("groupes") GroupeEnum[] groupes, @Param("lastLoginDate") LocalDateTime lastLoginDate);

}
