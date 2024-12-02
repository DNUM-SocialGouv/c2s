package fr.gouv.sante.c2s.repository;

import fr.gouv.sante.c2s.model.GroupeEnum;
import fr.gouv.sante.c2s.model.entity.MessageAccueilEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MessageAccueilRepository extends JpaRepository<MessageAccueilEntity, Long> {

    // le pageable est utilisé pour faire le limit 1
    List<MessageAccueilEntity> findFirstByGroupeOrderByIdDesc(@Param("groupe") GroupeEnum groupe, Pageable pageable);

    @Query(" SELECT ma FROM MessageAccueilEntity ma WHERE ma.groupe='ORGANISME_COMPLEMENTAIRE' ORDER BY ma.dateCrea DESC LIMIT 1 UNION ALL " +
           " SELECT ma FROM MessageAccueilEntity ma WHERE ma.groupe='CAISSE' ORDER BY ma.dateCrea DESC LIMIT 1 ")
    List<MessageAccueilEntity> findLasts();

    @Query("SELECT ma FROM MessageAccueilEntity ma WHERE ma.groupe=:groupe ORDER BY ma.dateCrea DESC LIMIT 1")
    MessageAccueilEntity findLastByGroupeOrderByDateCreaDesc(@Param("groupe") GroupeEnum groupe);

}
