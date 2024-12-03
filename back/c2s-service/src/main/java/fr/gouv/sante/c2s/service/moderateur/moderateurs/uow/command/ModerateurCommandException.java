package fr.gouv.sante.c2s.service.moderateur.moderateurs.uow.command;

import fr.gouv.sante.c2s.model.exception.ManualConstraintViolationException;

public class ModerateurCommandException extends ManualConstraintViolationException {

    public ModerateurCommandException(String value) {
        super(value);
    }

    public ModerateurCommandException(String key, String value) {
        super(key, value);
    }

}
