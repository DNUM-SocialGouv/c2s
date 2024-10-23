package fr.gouv.sante.c2s.model.entity;

import fr.gouv.sante.c2s.model.EtatEnum;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Data
@Table(name = "etablissement")
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class EtablissementEntity extends AbstractEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "etablissement_id_seq_gen")
    @SequenceGenerator(name = "etablissement_id_seq_gen", sequenceName = "etablissement_id_seq", allocationSize = 1)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "siren", referencedColumnName = "siren")
    private EntrepriseEntity entreprise;

    private String nom;

    private String adresse1;

    private String adresse2;

    private String adresse3;

    @Column(name = "code_postal")
    private String codePostal;

    private String ville;

    private String cedex;

    private String telephone;

    private String email;

    @Enumerated(EnumType.STRING)
    private EtatEnum etat;

    private String region;

    private String departement;
}
