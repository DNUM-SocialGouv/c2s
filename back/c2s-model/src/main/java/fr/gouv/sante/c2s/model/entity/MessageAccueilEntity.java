package fr.gouv.sante.c2s.model.entity;

import fr.gouv.sante.c2s.model.GroupeEnum;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Table(name = "message_accueil")
@Entity
@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class MessageAccueilEntity extends AbstractEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator="message_accueil_seq_generator")
    @SequenceGenerator(name = "message_accueil_seq_generator", sequenceName = "message_accueil_id_seq", allocationSize=1)
    @Column(name = "id")
    private Long id;

    private String contenu;

    @Enumerated(EnumType.STRING)
    private GroupeEnum groupe;

}
