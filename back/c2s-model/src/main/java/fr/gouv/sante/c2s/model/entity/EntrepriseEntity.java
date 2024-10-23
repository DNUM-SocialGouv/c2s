package fr.gouv.sante.c2s.model.entity;

import fr.gouv.sante.c2s.model.EtatEnum;
import fr.gouv.sante.c2s.model.GroupeEnum;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Data
@Table(name = "entreprise")
@SuperBuilder
@NoArgsConstructor
public class EntrepriseEntity extends AbstractEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "entreprise_id_seq_gen")
    @SequenceGenerator(name = "entreprise_id_seq_gen", sequenceName = "entreprise_id_seq", allocationSize = 1)
    @Column(name = "id")
    private Long id;

    @Column(name = "siren")
    private String siren;

    private String nom;

    private String adresse;

    @Column(name = "code_postal")
    private String codePostal;

    private String ville;

    private String habilite;

    private String arrete;

    @Column(name = "site_web")
    private String siteWeb;

    @Enumerated(EnumType.STRING)
    private EtatEnum etat;

    private String type;
    private String departement;
    private String region;
    private String telephone;
    private String email;

    @Column(name = "etablissement_id")
    private Long etablissementId;

    @Enumerated(EnumType.STRING)
    private GroupeEnum groupe;

}

