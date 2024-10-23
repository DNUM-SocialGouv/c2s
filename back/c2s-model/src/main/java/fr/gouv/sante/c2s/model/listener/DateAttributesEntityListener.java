package fr.gouv.sante.c2s.model.listener;

import fr.gouv.sante.c2s.model.entity.AbstractEntity;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;

import java.time.LocalDateTime;

public class DateAttributesEntityListener {

    @PrePersist
    void onCreate(Object entity) {
        if (entity instanceof AbstractEntity) {
            AbstractEntity ent = (AbstractEntity) entity;
            ent.setDateCrea(LocalDateTime.now());
        }
    }

    @PreUpdate
    void onUpdate(Object entity) {
        if (entity instanceof AbstractEntity) {
            AbstractEntity ent = (AbstractEntity) entity;
            ent.setDateMaj(LocalDateTime.now());
        }
    }

}
