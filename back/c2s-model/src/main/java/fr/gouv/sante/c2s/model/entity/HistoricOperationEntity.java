package fr.gouv.sante.c2s.model.entity;

import fr.gouv.sante.c2s.model.ActionTypeEnum;
import fr.gouv.sante.c2s.model.GroupeEnum;
import fr.gouv.sante.c2s.model.SectionEnum;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data
@Table(name = "history_operation")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class HistoricOperationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "historic_operation_id_seq_gen")
    @SequenceGenerator(name = "historic_operation_id_seq_gen", sequenceName = "historic_operation_id_seq", allocationSize = 1)
    @Column(name = "id")
    private Long id;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(updatable = false)
    private Date operationDate;

    @Enumerated(EnumType.STRING)
    private SectionEnum section;

    @Enumerated(EnumType.STRING)
    private GroupeEnum groupe;

    @Column(name = "membre_informations")
    private String membreInformations;

    @Column(name = "action_type")
    @Enumerated(EnumType.STRING)
    private ActionTypeEnum actionType;

    @Column(name = "action_label")
    private String actionLabel;

    @Column(name = "membre_id")
    private Long membreId;

}
