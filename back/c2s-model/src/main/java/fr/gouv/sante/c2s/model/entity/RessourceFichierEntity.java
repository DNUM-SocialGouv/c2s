package fr.gouv.sante.c2s.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Table(name = "ressource_fichier")
@Entity
@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class RessourceFichierEntity extends AbstractEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator="ressource_fichier_seq_generator")
    @SequenceGenerator(name = "ressource_fichier_seq_generator", sequenceName = "ressource_fichier_id_seq", allocationSize=1)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "ressource_thematique_id", referencedColumnName = "id")
    private RessourceThematiqueEntity ressourceThematique;

    private String repertoire;

    private String nom;

    private String uuid;

    private Long taille;

    private String extension;

}
