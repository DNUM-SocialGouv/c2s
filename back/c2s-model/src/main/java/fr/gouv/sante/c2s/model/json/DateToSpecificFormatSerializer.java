package fr.gouv.sante.c2s.model.json;

import com.fasterxml.jackson.databind.util.StdConverter;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

@Slf4j
public class DateToSpecificFormatSerializer extends StdConverter<Date, String> {

    @Override
    public String convert(Date date) {
        //log.info("Writing date: " + date);
        LocalDateTime localDateTime = date.toInstant()
                .atZone(ZoneId.of("Europe/Paris"))
                .toLocalDateTime();
        return localDateTime+"+00:00";
    }

}