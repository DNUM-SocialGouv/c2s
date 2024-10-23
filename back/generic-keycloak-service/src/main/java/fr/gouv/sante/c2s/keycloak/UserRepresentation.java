package fr.gouv.sante.c2s.keycloak;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class UserRepresentation {

    private String sub;


    private boolean emailVerified;
    private String name;
    private String preferredUsername;
    private String givenName;
    private String familyName;
    private String email;


}
