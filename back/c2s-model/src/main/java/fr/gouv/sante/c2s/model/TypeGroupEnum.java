package fr.gouv.sante.c2s.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum TypeGroupEnum {
    ENREGISTRE( "","enregistré"),
    OC("OC","OC"),
    CAISSE("CAISSE","Caisse");
    private final String libelle;
    private final String value;
}
