package fr.gouv.sante.c2s.export;

public class ExportConstants {


    public static final class Common {
        public static final String PREFIX_FILE = "sauv_export_datas";

        // détermine le nombre de minutes pendant lequel l'export est valable (et en cache)
        public static final Integer MAX_MINUTES_EXPORT_VALID = 30;
    }

    public static final class Oc {

        public static final String EXPORT_FILE_NAME = "a2_liste_oc_loc";
        public static final Integer LIST_NB_COLUMN = 8;
        public static final String FILE_DESCRIPTION = "Export des Organismes conventionnés";
    }

    public static final class Pa {

        public static final String EXPORT_FILE_NAME = "a2_liste_pa_lpa";
        public static final Integer LIST_NB_COLUMN = 12;
        public static final String FILE_DESCRIPTION = "Export des Points d'accueils";
    }

    public static final class General {
        public static final String EXPORT_FILE_NAME = "check";
        public static final String AUTHOR = "DNUM";
        public static final String OWNER = "Fonds CMU - PARIS - complementaire-sante-solidaire.gouv.fr";
        public static final String SCRIPT_VERSION = "2.0";
        public static final String SCRIPT_CREATION_DATE = "2024-04-04";

    }


}
