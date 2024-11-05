package fr.gouv.sante.c2s.model.entity;

import fr.gouv.sante.c2s.model.GroupeEnum;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Table(name = "ressource_thematique")
@Entity
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class RessourceThematiqueEntity extends AbstractEntity {

    private static final String SEPARATOR = ",";

    @Id
    @Getter
    @Setter
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator="ressource_thematique_seq_generator")
    @SequenceGenerator(name = "ressource_thematique_seq_generator", sequenceName = "ressource_thematique_id_seq", allocationSize=1)
    private Long id;

    @Getter
    @Setter
    private String titre;

    // TEXT
    @Getter
    @Setter
    private String description;

    @Column(name = "groupes")
    private String groupes;

    @Getter
    @Setter
    private Integer ordre;

    @Getter
    @Setter
    private Boolean publique;

    public List<GroupeEnum> getGroupes() {
        if (groupes!=null) {
            return Arrays.stream(groupes.split(SEPARATOR)).map(GroupeEnum::valueOf).toList();
        }
        return null;
    }

    public void setGroupes(List<GroupeEnum> groupes) {
        if (groupes!=null && !groupes.isEmpty()) {
            this.groupes = groupes.stream().map(Enum::name).collect(Collectors.joining(SEPARATOR));
        } else {
            this.groupes = null;
        }
    }

}
