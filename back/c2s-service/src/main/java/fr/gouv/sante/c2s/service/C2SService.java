package fr.gouv.sante.c2s.service;

import fr.gouv.sante.c2s.model.exception.ManualConstraintViolationException;

public class C2SService {

    protected void throwManualException(String key, String value) {
        throw new ManualConstraintViolationException(key, value);
    }
}
