package fr.gouv.sante.c2s.model;

public enum TypeMembreEnum {

    GESTION, STATISTIQUES, DECLARATION_TSA;

    public static String getLabel(TypeMembreEnum type) {
        switch (type) {
            case GESTION -> {
                return "Gestion";
            }
            case STATISTIQUES -> {
                return "Statistiques";
            }
            case DECLARATION_TSA -> {
                return "Declaration TSA";
            }
            default -> throw new IllegalArgumentException("Type : "+type);
        }
    }
}
