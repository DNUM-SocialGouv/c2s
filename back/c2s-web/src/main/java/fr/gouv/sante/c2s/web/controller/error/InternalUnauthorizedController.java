package fr.gouv.sante.c2s.web.controller.error;

import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@io.swagger.v3.oas.annotations.Hidden
@RestController
public class InternalUnauthorizedController {

    @RequestMapping(value = "/unauthorized", method = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT, RequestMethod.HEAD}) // NOSONAR
    public ResponseEntity sendUnauthorized() {
        return ResponseEntity.status(HttpStatusCode.valueOf(401)).contentLength(0).build();
    }

}
