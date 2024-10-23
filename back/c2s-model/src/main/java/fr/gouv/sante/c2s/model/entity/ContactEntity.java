package fr.gouv.sante.c2s.model.entity;

import fr.gouv.sante.c2s.model.EtatEnum;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Data
@Table(name = "contact")
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class ContactEntity extends AbstractEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "siren", referencedColumnName = "siren", insertable = false, updatable = false)
    private EntrepriseEntity entrepriseEntity;

    private String nom;

    private String prenom;

    private String adresse1;

    private String adresse2;

    private String adresse3;

    @Column(name = "code_postal")
    private String codePostal;

    private String ville;

    private String departement;

    private String region;

    private String cedex;

    private String telephone;

    private String email;

    private String service;

    private String fonction;

    private EtatEnum etat;

}
