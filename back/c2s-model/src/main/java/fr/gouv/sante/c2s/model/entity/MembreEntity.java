package fr.gouv.sante.c2s.model.entity;

import fr.gouv.sante.c2s.model.GroupeEnum;
import fr.gouv.sante.c2s.model.StatutMembreEnum;
import fr.gouv.sante.c2s.model.TypeMembreEnum;
import fr.gouv.sante.c2s.model.converter.TypeMembreAttributeConverter;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Table(name = "membre")
@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MembreEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "membre_id_seq_gen")
    @SequenceGenerator(name = "membre_id_seq_gen", sequenceName = "membre_id_seq", allocationSize = 1)
    @Column(name = "id")
    private Long id;
    private LocalDateTime dateMaj;
    private LocalDateTime dateInscription;
    private String createur;
    private String modificateur;
    private String nom;
    private String prenom;
    private String telephone;
    @Column(name = "email")
    private String email;
    private String fonction;
    private String societe;
    private String societeSiret;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "siren", referencedColumnName = "siren", updatable = false)
    private EntrepriseEntity entreprise;

    @Enumerated(EnumType.STRING)
    private GroupeEnum groupe;

    @Enumerated(EnumType.STRING)
    private StatutMembreEnum statut;

    private String adresse;
    private String codePostal;
    private String departement;
    private String region;

    private String rgpdOrigine;
    private String rgpdConsentement;
    private LocalDateTime rgpdDate;

    @Column(name = "date_last_login")
    private LocalDateTime lastLoginDate;

    @Convert(converter = TypeMembreAttributeConverter.class)
    @Column(name = "types", length = 500)
    private TypeMembreEnum[] types;


}
