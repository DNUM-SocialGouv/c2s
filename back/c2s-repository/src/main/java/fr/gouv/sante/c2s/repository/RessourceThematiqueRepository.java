package fr.gouv.sante.c2s.repository;

import fr.gouv.sante.c2s.model.GroupeEnum;
import fr.gouv.sante.c2s.model.entity.RessourceThematiqueEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RessourceThematiqueRepository extends JpaRepository<RessourceThematiqueEntity, Long> {

    @Query("SELECT rt FROM RessourceThematiqueEntity rt WHERE :groupe IN (rt.groupes) ")
    List<RessourceThematiqueEntity> getRessourceThematiquesByGroupe(@Param("groupe") GroupeEnum groupe);

    @Query("SELECT rt FROM RessourceThematiqueEntity rt")
    List<RessourceThematiqueEntity> getRessourceThematiques();

}
