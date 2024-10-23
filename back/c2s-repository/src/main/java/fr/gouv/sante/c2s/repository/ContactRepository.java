package fr.gouv.sante.c2s.repository;

import fr.gouv.sante.c2s.model.entity.ContactEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactRepository extends JpaRepository<ContactEntity, Long> {
    ContactEntity findContactByEmail(String locSiren);
}
