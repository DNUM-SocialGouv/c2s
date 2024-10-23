package fr.gouv.sante.c2s.model.entity;

import fr.gouv.sante.c2s.model.GroupeEnum;
import fr.gouv.sante.c2s.model.converter.GroupesAttributeConverter;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
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
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator="ressource_thematique_seq_generator")
    @SequenceGenerator(name = "ressource_thematique_seq_generator", sequenceName = "ressource_thematique_id_seq", allocationSize=1)
    private Long id;

    private String titre;

    // TEXT
    private String description;

    @Column(name = "groupes")
    private String groupes;

    private Integer ordre;

    private Boolean publique;

    public List<GroupeEnum> getGroupes() {
        if (groupes!=null) {
            return Arrays.asList(groupes.split(SEPARATOR)).stream().map(GroupeEnum::valueOf).toList();
        }
        return null;
    }

    public void setGroupes(List<GroupeEnum> groupes) {
        if (groupes!=null && groupes.size()>0) {
            this.groupes = groupes.stream().map(groupeEnum -> groupeEnum.name()).collect(Collectors.joining(SEPARATOR));
        } else {
            this.groupes = null;
        }
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitre() {
        return titre;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getOrdre() {
        return ordre;
    }

    public void setOrdre(Integer ordre) {
        this.ordre = ordre;
    }

    public Boolean getPublique() {
        return publique;
    }

    public void setPublique(Boolean publique) {
        this.publique = publique;
    }
}
