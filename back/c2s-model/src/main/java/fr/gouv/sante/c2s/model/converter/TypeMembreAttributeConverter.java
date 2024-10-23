package fr.gouv.sante.c2s.model.converter;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import fr.gouv.sante.c2s.model.TypeMembreEnum;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Converter
public class TypeMembreAttributeConverter implements AttributeConverter<TypeMembreEnum[], String> {

    private static final Gson gson = new GsonBuilder().create();

    @Override
    public String convertToDatabaseColumn(TypeMembreEnum[] attribute) {
        try {
            return gson.toJson(attribute);
        } catch (Exception e) {
            log.error(e.getMessage());
            return null;
        }
    }

    @Override
    public TypeMembreEnum[] convertToEntityAttribute(String dbData) {
        try {
            Class<TypeMembreEnum[]> c = TypeMembreEnum[].class;
            return gson.fromJson(dbData, c);
        } catch (Exception e) {
            log.error(e.getMessage());
            return new TypeMembreEnum[]{};
        }
    }

}
