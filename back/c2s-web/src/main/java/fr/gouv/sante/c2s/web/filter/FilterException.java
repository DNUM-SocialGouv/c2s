package fr.gouv.sante.c2s.web.filter;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FilterException {

    private String method;
    private String uri;
    private FilterExceptionTypeEnum type;

}
