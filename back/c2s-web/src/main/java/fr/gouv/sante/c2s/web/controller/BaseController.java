package fr.gouv.sante.c2s.web.controller;

import fr.gouv.sante.c2s.model.*;
import jakarta.validation.*;
import org.springframework.http.MediaType;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

public class BaseController {

    protected <T> void validate(T object) {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();
        Set<ConstraintViolation<T>> violations = validator.validate(object);
        if (!violations.isEmpty()) {
            throw new ConstraintViolationException(violations);
        }
    }

    protected String getContentTypeFromExtension(String extension) {
        switch (extension.toLowerCase()) {
            case "pdf": return MediaType.APPLICATION_PDF_VALUE;
            case "jpg":
            case "jpeg": return MediaType.IMAGE_JPEG_VALUE;
            case "xls":
            case "xlsx": return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            case "csv": return "text/csv";
            default: return MediaType.APPLICATION_OCTET_STREAM_VALUE;
        }
    }

    protected Map<String, String> getGroupesAsPartenaires() {
        Map<String, String> map = new HashMap<>();
        map.put(GroupeEnum.ORGANISME_COMPLEMENTAIRE.name(), "Organisme complémentaire");
        map.put(GroupeEnum.CAISSE.name(), "Caisse");
        return map;
    }

    protected Map<String, String> getTrioGroupes() {
        Map<String,String> groupes = new HashMap<>();
        groupes.put(GroupeEnum.ORGANISME_COMPLEMENTAIRE.name(), "Organisme complémentaire");
        groupes.put(GroupeEnum.CAISSE.name(), "Caisse");
        groupes.put(GroupeEnum.PUBLIC.name(), "Public");
        return groupes;
    }
}
