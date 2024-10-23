package fr.gouv.sante.c2s.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Data
@Table(name = "daily_statistique")
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class DailyStatistiqueEntity extends AbstractEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "daily_statistique_id_seq_gen")
    @SequenceGenerator(name = "daily_statistique_id_seq_gen", sequenceName = "daily_statistique_id_seq", allocationSize = 1)
    @Column(name = "id")
    private Integer id;

    @Column(name = "count_membre_organisme_complementaire_actif")
    private Long countMembreOrganismeComplementaireActif;

    @Column(name = "count_membre_caisse_actif")
    private Long countMembreCaisseActif;

    @Column(name = "count_moderateur_actif")
    private Long countModerateurActif;

    @Column(name = "count_organisme_complementaire_actif")
    private Long countOrganismeComplementaireActif;

    @Column(name = "count_caisse_actif")
    private Long countCaisseActif;

    @Column(name = "count_point_accueil_actif")
    private Long countPointAccueilActif;

}