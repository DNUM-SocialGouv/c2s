package fr.gouv.sante.c2s.repository;

import fr.gouv.sante.c2s.model.entity.RessourceFichierEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RessourceFichierRepository extends JpaRepository<RessourceFichierEntity, Long> {

    @Query("SELECT rf FROM RessourceFichierEntity rf, RessourceThematiqueEntity rt WHERE rt.groupes LIKE :groupeLike AND rt.id=rf.ressourceThematique.id ")
    List<RessourceFichierEntity> getLastResourceFilesByGroupe(@Param("groupeLike") String groupeLike, Pageable pageable);

    @Query("SELECT rf FROM RessourceFichierEntity rf, RessourceThematiqueEntity rt WHERE rt.id=rf.ressourceThematique.id " +
           " AND (rt.groupes LIKE :groupeLike OR :groupeLike IS NULL) " +
           " AND (LOWER(CAST(UNACCENT(rf.nom) AS text)) LIKE LOWER(CAST(UNACCENT(:nomLike) AS text)) OR :nomLike IS NULL)" +
           " AND (rt.id=:ressourceThematiqueId OR :ressourceThematiqueId IS NULL) " +
           " AND (rf.extension=:extension OR :extension IS NULL) ")
    List<RessourceFichierEntity> getRessourceFichierByNomAndRessourceThematiqueAndExtensionAndGroupe(@Param("nomLike") String nomLike, @Param("ressourceThematiqueId") Long ressourceThematiqueId, @Param("extension") String extension, @Param("groupeLike") String groupeLike);

    @Query("SELECT rf FROM RessourceFichierEntity rf WHERE rf.ressourceThematique.id=:ressourceThematiqueId")
    List<RessourceFichierEntity> getRessourceFichierByThematique(@Param("ressourceThematiqueId") Long ressourceThematiqueId);

    @Query(" SELECT rf FROM RessourceFichierEntity rf, RessourceThematiqueEntity rt WHERE " +
           " rt.groupes LIKE :groupeLike AND rt.id=rf.ressourceThematique.id ")
    List<RessourceFichierEntity> getRessourceFichierByGroupe(@Param("groupeLike") String groupeLike);

    @Query("SELECT rf FROM RessourceFichierEntity rf")
    List<RessourceFichierEntity> getRessourceFichiers();

}
