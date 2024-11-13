package fr.gouv.sante.c2s.model.exception;

import java.util.HashMap;
import java.util.Map;

public class ManualConstraintViolationException extends RuntimeException {

    private static final String DEFAULT_EXCEPTION_KEY = "error";

    private String key;
    private String value;

    public ManualConstraintViolationException(String value) {
        this.key = DEFAULT_EXCEPTION_KEY;
        this.value = value;
    }
    public ManualConstraintViolationException(String key, String value) {
        this.key = key;
        this.value = value;
    }

    public Map<String, String> getError() {
        Map<String, String> map = new HashMap<String, String>();
        map.put(this.key, this.value);
        return map;
    }
}