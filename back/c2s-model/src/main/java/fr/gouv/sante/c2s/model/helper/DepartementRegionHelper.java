package fr.gouv.sante.c2s.model.helper;

import fr.gouv.sante.c2s.model.entity.MembreEntity;
import fr.gouv.sante.c2s.model.entity.EntrepriseEntity;
import fr.gouv.sante.c2s.model.entity.EtablissementEntity;

import java.util.HashMap;
import java.util.Map;

public class DepartementRegionHelper {

    static class RegionDepartment {
        String region;
        String department;

        RegionDepartment(String region, String department) {
            this.region = region;
            this.department = department;
        }
    }

    public static void set(EntrepriseEntity oc) {
        String departement = oc.getCodePostal().substring(0, 2);
        RegionDepartment regionDepartment = MAP.get(departement);
        if (regionDepartment==null) {
            departement = oc.getCodePostal().substring(0, 3);
            regionDepartment = MAP.get(departement);
        }
        oc.setDepartement(regionDepartment.department);
        oc.setRegion(regionDepartment.region);
    }

    public static void set(EtablissementEntity pointAccueil) {
        String departement = pointAccueil.getCodePostal().substring(0, 2);
        RegionDepartment regionDepartment = MAP.get(departement);
        if (regionDepartment==null) {
            departement = pointAccueil.getCodePostal().substring(0, 3);
            regionDepartment = MAP.get(departement);
        }
        pointAccueil.setDepartement(regionDepartment.department);
        pointAccueil.setRegion(regionDepartment.region);
    }
    public static void set(MembreEntity membre) {
        String departement = membre.getCodePostal().substring(0, 2);
        RegionDepartment regionDepartment = MAP.get(departement);
        if (regionDepartment==null) {
            departement = membre.getCodePostal().substring(0, 3);
            regionDepartment = MAP.get(departement);
        }
        membre.setDepartement(regionDepartment.department);
        membre.setRegion(regionDepartment.region);
    }

    public static String getRegion(String codePostal) {
        String departement = codePostal.substring(0, 2);
        RegionDepartment regionDepartment = MAP.get(departement);
        if (regionDepartment == null) {
            departement = codePostal.substring(0, 3);
            regionDepartment = MAP.get(departement);
        }
        return regionDepartment.region;
    }

    public static String getDepartement(String codePostal) {
        String departement = codePostal.substring(0, 2);
        RegionDepartment regionDepartment = MAP.get(departement);
        if (regionDepartment == null) {
            departement = codePostal.substring(0, 3);
            regionDepartment = MAP.get(departement);
        }
        return regionDepartment.department;
    }

    private static final Map<String, RegionDepartment> MAP = new HashMap<>();

    static {
        MAP.put("01", new RegionDepartment("Auvergne-Rhône-Alpes", "Ain"));
        MAP.put("02", new RegionDepartment("Hauts-de-France", "Aisne"));
        MAP.put("03", new RegionDepartment("Auvergne-Rhône-Alpes", "Allier"));
        MAP.put("04", new RegionDepartment("Provence-Alpes-Côte d'Azur", "Alpes-de-Haute-Provence"));
        MAP.put("05", new RegionDepartment("Provence-Alpes-Côte d'Azur", "Hautes-Alpes"));
        MAP.put("06", new RegionDepartment("Provence-Alpes-Côte d'Azur", "Alpes-Maritimes"));
        MAP.put("07", new RegionDepartment("Auvergne-Rhône-Alpes", "Ardèche"));
        MAP.put("08", new RegionDepartment("Grand Est", "Ardennes"));
        MAP.put("09", new RegionDepartment("Occitanie", "Ariège"));
        MAP.put("10", new RegionDepartment("Grand Est", "Aube"));
        MAP.put("11", new RegionDepartment("Occitanie", "Aude"));
        MAP.put("12", new RegionDepartment("Occitanie", "Aveyron"));
        MAP.put("13", new RegionDepartment("Provence-Alpes-Côte d'Azur", "Bouches-du-Rhône"));
        MAP.put("14", new RegionDepartment("Normandie", "Calvados"));
        MAP.put("15", new RegionDepartment("Auvergne-Rhône-Alpes", "Cantal"));
        MAP.put("16", new RegionDepartment("Nouvelle-Aquitaine", "Charente"));
        MAP.put("17", new RegionDepartment("Nouvelle-Aquitaine", "Charente-Maritime"));
        MAP.put("18", new RegionDepartment("Centre-Val de Loire", "Cher"));
        MAP.put("19", new RegionDepartment("Nouvelle-Aquitaine", "Corrèze"));
        MAP.put("200", new RegionDepartment("Corse", "Corse-du-Sud"));
        MAP.put("201", new RegionDepartment("Corse", "Corse-du-Sud"));
        MAP.put("202", new RegionDepartment("Corse", "Haute-Corse"));
        MAP.put("206", new RegionDepartment("Corse", "Haute-Corse"));
        MAP.put("21", new RegionDepartment("Bourgogne-Franche-Comté", "Côte-d'Or"));
        MAP.put("22", new RegionDepartment("Bretagne", "Côtes-d'Armor"));
        MAP.put("23", new RegionDepartment("Nouvelle-Aquitaine", "Creuse"));
        MAP.put("24", new RegionDepartment("Nouvelle-Aquitaine", "Dordogne"));
        MAP.put("25", new RegionDepartment("Bourgogne-Franche-Comté", "Doubs"));
        MAP.put("26", new RegionDepartment("Auvergne-Rhône-Alpes", "Drôme"));
        MAP.put("27", new RegionDepartment("Normandie", "Eure"));
        MAP.put("28", new RegionDepartment("Centre-Val de Loire", "Eure-et-Loir"));
        MAP.put("29", new RegionDepartment("Bretagne", "Finistère"));
        MAP.put("30", new RegionDepartment("Occitanie", "Gard"));
        MAP.put("31", new RegionDepartment("Occitanie", "Haute-Garonne"));
        MAP.put("32", new RegionDepartment("Occitanie", "Gers"));
        MAP.put("33", new RegionDepartment("Nouvelle-Aquitaine", "Gironde"));
        MAP.put("34", new RegionDepartment("Occitanie", "Hérault"));
        MAP.put("35", new RegionDepartment("Bretagne", "Ille-et-Vilaine"));
        MAP.put("36", new RegionDepartment("Centre-Val de Loire", "Indre"));
        MAP.put("37", new RegionDepartment("Centre-Val de Loire", "Indre-et-Loire"));
        MAP.put("38", new RegionDepartment("Auvergne-Rhône-Alpes", "Isère"));
        MAP.put("39", new RegionDepartment("Bourgogne-Franche-Comté", "Jura"));
        MAP.put("40", new RegionDepartment("Nouvelle-Aquitaine", "Landes"));
        MAP.put("41", new RegionDepartment("Centre-Val de Loire", "Loir-et-Cher"));
        MAP.put("42", new RegionDepartment("Auvergne-Rhône-Alpes", "Loire"));
        MAP.put("43", new RegionDepartment("Auvergne-Rhône-Alpes", "Haute-Loire"));
        MAP.put("44", new RegionDepartment("Pays de la Loire", "Loire-Atlantique"));
        MAP.put("45", new RegionDepartment("Centre-Val de Loire", "Loiret"));
        MAP.put("46", new RegionDepartment("Occitanie", "Lot"));
        MAP.put("47", new RegionDepartment("Nouvelle-Aquitaine", "Lot-et-Garonne"));
        MAP.put("48", new RegionDepartment("Occitanie", "Lozère"));
        MAP.put("49", new RegionDepartment("Pays de la Loire", "Maine-et-Loire"));
        MAP.put("50", new RegionDepartment("Normandie", "Manche"));
        MAP.put("51", new RegionDepartment("Grand Est", "Marne"));
        MAP.put("52", new RegionDepartment("Grand Est", "Haute-Marne"));
        MAP.put("53", new RegionDepartment("Pays de la Loire", "Mayenne"));
        MAP.put("54", new RegionDepartment("Grand Est", "Meurthe-et-Moselle"));
        MAP.put("55", new RegionDepartment("Grand Est", "Meuse"));
        MAP.put("56", new RegionDepartment("Bretagne", "Morbihan"));
        MAP.put("57", new RegionDepartment("Grand Est", "Moselle"));
        MAP.put("58", new RegionDepartment("Bourgogne-Franche-Comté", "Nièvre"));
        MAP.put("59", new RegionDepartment("Hauts-de-France", "Nord"));
        MAP.put("60", new RegionDepartment("Hauts-de-France", "Oise"));
        MAP.put("61", new RegionDepartment("Normandie", "Orne"));
        MAP.put("62", new RegionDepartment("Hauts-de-France", "Pas-de-Calais"));
        MAP.put("63", new RegionDepartment("Auvergne-Rhône-Alpes", "Puy-de-Dôme"));
        MAP.put("64", new RegionDepartment("Nouvelle-Aquitaine", "Pyrénées-Atlantiques"));
        MAP.put("65", new RegionDepartment("Occitanie", "Hautes-Pyrénées"));
        MAP.put("66", new RegionDepartment("Occitanie", "Pyrénées-Orientales"));
        MAP.put("67", new RegionDepartment("Grand Est", "Bas-Rhin"));
        MAP.put("68", new RegionDepartment("Grand Est", "Haut-Rhin"));
        MAP.put("69", new RegionDepartment("Auvergne-Rhône-Alpes", "Rhône"));
        MAP.put("70", new RegionDepartment("Bourgogne-Franche-Comté", "Haute-Saône"));
        MAP.put("71", new RegionDepartment("Bourgogne-Franche-Comté", "Saône-et-Loire"));
        MAP.put("72", new RegionDepartment("Pays de la Loire", "Sarthe"));
        MAP.put("73", new RegionDepartment("Auvergne-Rhône-Alpes", "Savoie"));
        MAP.put("74", new RegionDepartment("Auvergne-Rhône-Alpes", "Haute-Savoie"));
        MAP.put("75", new RegionDepartment("Île-de-France", "Paris"));
        MAP.put("76", new RegionDepartment("Normandie", "Seine-Maritime"));
        MAP.put("77", new RegionDepartment("Île-de-France", "Seine-et-Marne"));
        MAP.put("78", new RegionDepartment("Île-de-France", "Yvelines"));
        MAP.put("79", new RegionDepartment("Nouvelle-Aquitaine", "Deux-Sèvres"));
        MAP.put("80", new RegionDepartment("Hauts-de-France", "Somme"));
        MAP.put("81", new RegionDepartment("Occitanie", "Tarn"));
        MAP.put("82", new RegionDepartment("Occitanie", "Tarn-et-Garonne"));
        MAP.put("83", new RegionDepartment("Provence-Alpes-Côte d'Azur", "Var"));
        MAP.put("84", new RegionDepartment("Provence-Alpes-Côte d'Azur", "Vaucluse"));
        MAP.put("85", new RegionDepartment("Pays de la Loire", "Vendée"));
        MAP.put("86", new RegionDepartment("Nouvelle-Aquitaine", "Vienne"));
        MAP.put("87", new RegionDepartment("Nouvelle-Aquitaine", "Haute-Vienne"));
        MAP.put("88", new RegionDepartment("Grand Est", "Vosges"));
        MAP.put("89", new RegionDepartment("Bourgogne-Franche-Comté", "Yonne"));
        MAP.put("90", new RegionDepartment("Bourgogne-Franche-Comté", "Territoire de Belfort"));
        MAP.put("91", new RegionDepartment("Île-de-France", "Essonne"));
        MAP.put("92", new RegionDepartment("Île-de-France", "Hauts-de-Seine"));
        MAP.put("93", new RegionDepartment("Île-de-France", "Seine-Saint-Denis"));
        MAP.put("94", new RegionDepartment("Île-de-France", "Val-de-Marne"));
        MAP.put("95", new RegionDepartment("Île-de-France", "Val-d'Oise"));
        MAP.put("971", new RegionDepartment("Guadeloupe", "Guadeloupe"));
        MAP.put("972", new RegionDepartment("Martinique", "Martinique"));
        MAP.put("973", new RegionDepartment("Guyane", "Guyane"));
        MAP.put("974", new RegionDepartment("La Réunion", "La Réunion"));
        MAP.put("976", new RegionDepartment("Mayotte", "Mayotte"));
    }

}
