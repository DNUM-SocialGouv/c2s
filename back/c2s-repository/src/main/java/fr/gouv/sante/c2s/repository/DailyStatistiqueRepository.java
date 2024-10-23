package fr.gouv.sante.c2s.repository;

import fr.gouv.sante.c2s.model.entity.DailyStatistiqueEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface DailyStatistiqueRepository extends JpaRepository<DailyStatistiqueEntity, Long> {

    // format attendu : 2001-02-16
    @Query("SELECT ds FROM DailyStatistiqueEntity ds WHERE TO_CHAR(CAST(ds.dateCrea AS DATE), 'yyyy-MM-dd')=TO_CHAR(CAST(:date AS DATE), 'yyyy-MM-dd') ")
    List<DailyStatistiqueEntity> findByDate(@Param("date") LocalDateTime date);


}
