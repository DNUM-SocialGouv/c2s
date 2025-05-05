package fr.gouv.sante.c2s.repository;

import fr.gouv.sante.c2s.model.EtatEnum;
import fr.gouv.sante.c2s.model.GroupeEnum;
import fr.gouv.sante.c2s.model.dto.OrganismeComplementaireWithPointAccueilCountDTO;
import fr.gouv.sante.c2s.model.entity.EntrepriseEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EntrepriseRepository extends JpaRepository<EntrepriseEntity, Long>, JpaSpecificationExecutor<EntrepriseEntity> {

    @Query("SELECT entreprise FROM EntrepriseEntity entreprise WHERE entreprise.etat=:etat AND entreprise.groupe='ORGANISME_COMPLEMENTAIRE' ")
    List<EntrepriseEntity> findOrganismeComplementairesByEtat(@Param("etat") EtatEnum etat);

    @Query(" SELECT entreprise FROM EntrepriseEntity entreprise WHERE entreprise.etat='ACTIF' " +
            " AND entreprise.nom IS NOT NULL AND entreprise.adresse IS NOT NULL AND entreprise.codePostal IS NOT NULL AND entreprise.groupe='ORGANISME_COMPLEMENTAIRE' " +
            " AND entreprise.ville IS NOT NULL ")
    List<EntrepriseEntity> findOrganismeComplementairesForCnam();

    @Query(" SELECT entreprise FROM EntrepriseEntity entreprise WHERE entreprise.siren=:siren ")
    EntrepriseEntity findEntrepriseBySiren(@Param("siren") String siren);

    @Query(" SELECT entreprise FROM EntrepriseEntity entreprise WHERE entreprise.siren=:siren ")
    List<EntrepriseEntity> findEntreprisesBySiren(@Param("siren") String siren);

    @Query("SELECT DISTINCT(entreprise.region) FROM EntrepriseEntity entreprise ORDER BY entreprise.region ASC")
    List<String> getRegions();

    @Query("SELECT DISTINCT(entreprise.departement) FROM EntrepriseEntity entreprise ORDER BY entreprise.departement ASC")
    List<String> getDepartements();

    @Query("SELECT COUNT(DISTINCT(entreprise.id)) FROM EntrepriseEntity entreprise WHERE entreprise.etat='ACTIF' AND entreprise.groupe=fr.gouv.sante.c2s.model.GroupeEnum.ORGANISME_COMPLEMENTAIRE ")
    Long getOrganismeComplementairesActifsCount();

    @Query("SELECT COUNT(DISTINCT(entreprise.id)) FROM EntrepriseEntity entreprise WHERE entreprise.etat='ACTIF' AND entreprise.groupe=fr.gouv.sante.c2s.model.GroupeEnum.CAISSE ")
    Long getCaissesActifsCount();

    @Query(" SELECT distinct new fr.gouv.sante.c2s.model.dto.OrganismeComplementaireWithMembreAndPointAccueilCountDTO(entreprise, count(etablissement.id), " +
            " STRING_AGG(membre.id || '', '|'), " +
            " STRING_AGG(membre.nom, '|'), " +
            " STRING_AGG(membre.prenom, '|'), " +
            " STRING_AGG(membre.types, '|')) " +
            " FROM EntrepriseEntity entreprise " +
            " LEFT JOIN MembreEntity membre ON membre.entreprise.siren=entreprise.siren AND membre.types iS NOT NULL AND membre.statut=fr.gouv.sante.c2s.model.StatutMembreEnum.ACTIF " +
            " LEFT JOIN EtablissementEntity etablissement ON etablissement.entreprise.siren=entreprise.siren " +
            " WHERE (LOWER(CAST(UNACCENT(entreprise.nom) AS text)) LIKE LOWER(CAST(UNACCENT(CAST(:search AS text)) AS text)) " +
            "        OR entreprise.siren LIKE :search OR :search IS NULL) " +
            " AND entreprise.groupe IN (:groupes) " +
            " AND entreprise.etat=:etat AND (entreprise.region=:region OR :region IS NULL) " +
            " AND (entreprise.departement=:departement OR :departement IS NULL) " +
            " GROUP BY entreprise ")
    List<OrganismeComplementaireWithPointAccueilCountDTO> searchEntreprise(@Param("search") String search,
                                                                           @Param("groupes") List<GroupeEnum> groupes,
                                                                           @Param("region") String region,
                                                                           @Param("departement") String departement,
                                                                           @Param("etat") EtatEnum etat, Pageable pageable);

    @Query(" SELECT COUNT(DISTINCT entreprise) FROM EntrepriseEntity entreprise " +
            " LEFT JOIN EtablissementEntity etablissement ON etablissement.entreprise.siren=entreprise.siren " +
            " WHERE (LOWER(CAST(UNACCENT(entreprise.nom) AS text)) LIKE LOWER(CAST(UNACCENT(CAST(:search AS text)) AS text)) " +
            "        OR entreprise.siren LIKE :search OR :search IS NULL" + "  ) " +
            " AND entreprise.groupe IN (:groupes) " +
            " AND entreprise.etat=:etat AND (entreprise.region=:region OR :region IS NULL) " +
            " AND (entreprise.departement=:departement OR :departement IS NULL) ")
    Long countEntreprise(@Param("search") String search,
                         @Param("groupes") List<GroupeEnum> groupes,
                         @Param("region") String region,
                         @Param("departement") String departement,
                         @Param("etat") EtatEnum etat);

}

