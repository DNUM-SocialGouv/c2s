package fr.gouv.sante.c2s.model.helper;

import java.util.HashMap;
import java.util.Map;

public class HistoricModificationHelper {

    private Map<String, String> modifications;

    public HistoricModificationHelper() {
        this.modifications = new HashMap<>();
    }

    public void checkField(String field, String previous, String next) {
        if (previous!=null && !previous.equals(next)) {
            modifications.put(field, previous+" -> "+next);
        } else if (previous==null && next!=null) {
            modifications.put(field, "null -> "+next);
        }
    }

    public void checkField(String field, Boolean previous, Boolean next) {
        if (previous!=null && next!=null && !previous ==next) {
            modifications.put(field, previous+" -> "+next);
        } else if (previous==null && next!=null) {
            modifications.put(field, "null -> "+next);
        }
    }

    public String getResult() {
        if (modifications.isEmpty()) {
            return "Enregistrement mais pas de modification réellement";
        } else if (modifications.size()==1) {
            return "Une modification : "+modifications.keySet().toArray()[0]+" ("+modifications.values().toArray()[0]+")";
        } else {
            StringBuilder sb = new StringBuilder(modifications.size()+" modifications :\n");
            modifications.keySet().forEach(key -> sb.append("\t"+fieldTranslator(key)+": "+modifications.get(key)+"\n"));
            return sb.toString();
        }
    }

    // exceptions de traduction
    private String fieldTranslator(String field) {
        if (field.equals("isPointAccueil")) {
            return "Est aussi un point d'accueil";
        } else if (field.equals("codepostal") || field.equals("codePostal")) {
            return "Code postal";
        }
        return field;
    }
}
