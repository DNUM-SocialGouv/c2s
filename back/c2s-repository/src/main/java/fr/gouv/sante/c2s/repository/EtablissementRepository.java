package fr.gouv.sante.c2s.repository;

import fr.gouv.sante.c2s.model.EtatEnum;
import fr.gouv.sante.c2s.model.entity.EntrepriseEntity;
import fr.gouv.sante.c2s.model.entity.EtablissementEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface EtablissementRepository extends JpaRepository<EtablissementEntity, Long>, JpaSpecificationExecutor<EtablissementEntity> {


    List<EtablissementEntity> findAllByNomAndAdresse1AndCodePostalAndDepartementAndRegionAndEntreprise_siren(String nom, String adresse, String codePostal, String departement, String region, String siren);

    @Query(" SELECT etablissement FROM EtablissementEntity etablissement, EntrepriseEntity entreprise WHERE " +
           " etablissement.entreprise=entreprise AND entreprise.etat=:etat AND etablissement.etat=:etat " +
           " AND (etablissement.departement=:departement OR :departement IS NULL) " +
           " AND (etablissement.region=:region OR :region IS NULL) " +
           " AND (LOWER(etablissement.ville) LIKE :ville OR :ville IS NULL) " +
           " AND (LOWER(etablissement.nom) LIKE :organisme OR LOWER(entreprise.nom) LIKE :organisme OR :organisme IS NULL)" +
           " ORDER BY etablissement.codePostal ASC "
    )
    List<EtablissementEntity> findEtablissementByCriteria(@Param("departement") String departement,
                                                          @Param("ville") String ville,
                                                          @Param("region") String region,
                                                          @Param("organisme") String organisme,
                                                          @Param("etat") EtatEnum etat);

    @Query("SELECT DISTINCT etablissement.region FROM EtablissementEntity etablissement WHERE etablissement.region IS NOT NULL and etablissement.entreprise.siren= :siren  ORDER BY etablissement.region")
    List<String> findDistinctRegions(@Param("siren") String siren);;

    @Query("SELECT DISTINCT etablissement.departement FROM EtablissementEntity etablissement WHERE etablissement.departement IS NOT NULL and etablissement.entreprise.siren = :siren AND (:region IS NULL OR etablissement.region = :region) ORDER BY etablissement.departement")
    List<String> findDepartementsByRegion(@Param("siren") String siren, @Param("region") String region);

    @Query("SELECT DISTINCT etablissement FROM EtablissementEntity etablissement, EntrepriseEntity entreprise WHERE etablissement.etat='ACTIF' AND entreprise.etat='ACTIF' AND entreprise.siren=etablissement.entreprise.siren ORDER BY etablissement.id ")
    List<EtablissementEntity> findPointAccueilActifOnOcActif();

    @Query("SELECT COUNT(DISTINCT etablissement.id) FROM EtablissementEntity etablissement, EntrepriseEntity entreprise WHERE etablissement.etat='ACTIF' AND etablissement.entreprise.siren=entreprise.siren AND entreprise.etat='ACTIF' ")
    Long getPointAccueilActifOnOcActifCount();

    @Modifying
    @Transactional
    @Query("UPDATE EtablissementEntity p SET p.nom = :nom, p.email = :email, p.telephone = :telephone, p.adresse1 = :adresse1, p.dateMaj = :dateMaj, p.departement =:departement, p.region= :region, p.codePostal= :codePostal, p.ville= :ville WHERE p.id = :id")
    void updatePointAccueilById(@Param("id") Long id,  @Param("nom") String nom, @Param("email") String email,
                                @Param("telephone") String telephone, @Param("adresse1") String adresse1, @Param("ville") String ville,
                                @Param("codePostal") String codePostal, @Param("departement") String departement, @Param("region") String region, @Param("dateMaj") LocalDateTime dateMaj
    );

    @Query("SELECT etablissement FROM EtablissementEntity etablissement WHERE etablissement.entreprise.id=:entrepriseId AND etablissement.etat='ACTIF' ")
    List<EtablissementEntity> getEtablissementsActifsByEntreprise(@Param("entrepriseId") Long entrepriseId);

    @Query("SELECT etablissement FROM EtablissementEntity etablissement WHERE etablissement.entreprise.id=:entrepriseId AND etablissement.etat='ACTIF' ORDER BY etablissement.codePostal ASC")
    List<EtablissementEntity> getEtablissementsActifsByEntreprise(@Param("entrepriseId") Long entrepriseId, Pageable pageable);

    @Query("SELECT COUNT(etablissement) FROM EtablissementEntity etablissement WHERE etablissement.entreprise.id=:entrepriseId AND etablissement.etat='ACTIF' ")
    Long getEtablissementsActifsCountByEntreprise(@Param("entrepriseId") Long entrepriseId);

    @Query("SELECT etablissement FROM EtablissementEntity etablissement WHERE etablissement.entreprise=:entreprise")
    List<EtablissementEntity> getByEntreprise(@Param( "entreprise") EntrepriseEntity entreprise);

}

