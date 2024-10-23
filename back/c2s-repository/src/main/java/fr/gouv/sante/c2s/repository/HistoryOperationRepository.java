package fr.gouv.sante.c2s.repository;

import fr.gouv.sante.c2s.model.dto.HistoryOperationDTO;
import fr.gouv.sante.c2s.model.entity.HistoricOperationEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface HistoryOperationRepository extends JpaRepository<HistoricOperationEntity, Long> {

    @Modifying
    @Query("DELETE FROM HistoricOperationEntity historicOperations WHERE historicOperations.operationDate<:date")
    void deleteByDateBefore(@Param("date") Date date);

    @Query(" SELECT new fr.gouv.sante.c2s.model.dto.HistoryOperationDTO(operation, entreprise.nom) " +
           " FROM HistoricOperationEntity operation " +
           " LEFT JOIN MembreEntity membre ON operation.membreId=membre.id " +
           " LEFT JOIN EntrepriseEntity entreprise ON membre.entreprise=entreprise " +
           " WHERE (LOWER(entreprise.nom) LIKE :oc OR :oc IS NULL) " +
           " ORDER BY operation.operationDate DESC ")
    List<HistoryOperationDTO> getOperationsForModerateur(@Param("oc") String oc, Pageable pageable);

    @Query(" SELECT COUNT(DISTINCT operation) " +
           " FROM HistoricOperationEntity operation " +
           " LEFT JOIN MembreEntity membre ON operation.membreId=membre.id " +
           " LEFT JOIN EntrepriseEntity entreprise ON membre.entreprise=entreprise " +
           " WHERE (LOWER(entreprise.nom) LIKE :oc OR :oc IS NULL) ")
    Long countOperationsForModerateur(@Param("oc") String oc);

    @Query(" SELECT DISTINCT new fr.gouv.sante.c2s.model.dto.HistoryOperationDTO(operation, entreprise.nom) FROM HistoricOperationEntity operation, MembreEntity membre, EntrepriseEntity entreprise " +
           " WHERE entreprise.siren=:siren AND operation.membreId=membre.id AND membre.entreprise=entreprise " +
           " ORDER BY operation.operationDate DESC ")
    List<HistoryOperationDTO> getOperationsForPartenaire(@Param("siren") String siren, Pageable pageable);

    @Query(" SELECT COUNT(DISTINCT operation) FROM HistoricOperationEntity operation, MembreEntity membre, EntrepriseEntity entreprise " +
           " WHERE entreprise.siren=:siren AND operation.membreId=membre.id AND membre.entreprise=entreprise ")
    Long countOperationsForPartenaire(@Param("siren") String siren);

    @Query(" SELECT DISTINCT new fr.gouv.sante.c2s.model.dto.HistoryOperationDTO(operation, entreprise.nom) " +
           " FROM HistoricOperationEntity operation, MembreEntity membre" +
           " LEFT JOIN EntrepriseEntity entreprise ON membre.entreprise=entreprise " +
           " WHERE (operation.membreId=membre.id " +
           " OR membre.groupe=fr.gouv.sante.c2s.model.GroupeEnum.MODERATEUR) " +
           " AND operation.operationDate>:date " +
           " ORDER BY operation.operationDate ASC ")
    List<HistoryOperationDTO> getModificationOperationsForModerateurAfterDate(@Param("date") Date date);
}
