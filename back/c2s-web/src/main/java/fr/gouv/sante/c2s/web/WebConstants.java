package fr.gouv.sante.c2s.web;

public class WebConstants {

    // role / controle d'accès
    public static final String OC_PREFIX_URL = "oc";
    public static final String CAISSE_PREFIX_URL = "caisse";
    public static final String MODERATEUR_PREFIX_URL = "moderateur";
    public static final String PUBLIC_PREFIX_URL = "public";
    public static final String PARTENAIRE_PREFIX_URL = "partenaire"; // OC || CAISSE
    public static final String PRIVATE_PREFIX_URL = "private"; // accès authentifié ( OC || CAISSE || MODERATEUR )

    // objets
    public static final String THEMATIQUE_NAME_URL = "thematiques";
    public static final String FICHIER_NAME_URL = "fichiers";
    public static final String MESSAGE_ACCUEIL_NAME_URL = "messages";
    public static final String MEMBRE_NAME_URL = "membres";
    public static final String RESSOURCE_NAME_URL = "ressources";
    public static final String POINT_ACCUEIL_NAME_URL = "points-accueil";
    public static final String ETABLISSEMENT_NAME_URL = "etablissements";
    public static final String ENTREPRISE_NAME_URL = "entreprises";
    public static final String EQUIPE_NAME_URL = "equipes";
    public static final String HISTORIQUE_NAME_URL = "operations";
    public static final String MODERATEUR_NAME_URL = "moderateurs";

}
