package fr.gouv.sante.c2s.model;

public enum GroupeEnum {

    CAISSE, ORGANISME_COMPLEMENTAIRE, MODERATEUR, PUBLIC;

    public static String getLabel(GroupeEnum groupe) {
        switch (groupe) {
            case ORGANISME_COMPLEMENTAIRE -> {
                return "Organisme complémentaire";
            }
            case CAISSE -> {
                return "Caisse";
            }
            case MODERATEUR -> {
                return "Modérateur";
            }
            case PUBLIC -> {
                return "Publique";
            }
        }
        throw new IllegalArgumentException("Groupe : "+groupe);
    }
}
