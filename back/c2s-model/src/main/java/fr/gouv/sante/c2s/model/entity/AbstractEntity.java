package fr.gouv.sante.c2s.model.entity;

import fr.gouv.sante.c2s.model.listener.DateAttributesEntityListener;
import jakarta.persistence.*;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.io.Serializable;
import java.time.LocalDateTime;

@SuperBuilder
@EntityListeners(DateAttributesEntityListener.class)
@MappedSuperclass
public class AbstractEntity implements Serializable {

    @CreatedDate
    @Column(name = "date_crea", updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    protected LocalDateTime dateCrea;

    @LastModifiedDate
    @Column(name = "date_maj", insertable = false)
    @Temporal(TemporalType.TIMESTAMP)
    protected LocalDateTime dateMaj;

    public AbstractEntity() {

    }

    public LocalDateTime getDateCrea() {
        return dateCrea;
    }

    public void setDateCrea(LocalDateTime dateCrea) {
        this.dateCrea = dateCrea;
    }

    public LocalDateTime getDateMaj() {
        return dateMaj;
    }

    public void setDateMaj(LocalDateTime dateMaj) {
        this.dateMaj = dateMaj;
    }
}
