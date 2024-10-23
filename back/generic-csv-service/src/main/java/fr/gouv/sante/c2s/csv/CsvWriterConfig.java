package fr.gouv.sante.c2s.csv;

import com.opencsv.CSVWriter;
import lombok.Builder;

@Builder
public class CsvWriterConfig {

    // default
    public static final char DEFAULT_QUOTE_CHARACTER = CSVWriter.DEFAULT_QUOTE_CHARACTER;
    public static final char DEFAULT_SEPARATOR = CSVWriter.DEFAULT_SEPARATOR;
    public static final char DEFAULT_ESCAPE_CHARACTER = CSVWriter.DEFAULT_ESCAPE_CHARACTER;
    public static final String DEFAULT_LINE_END = CSVWriter.DEFAULT_LINE_END;


    public static final char NO_QUOTE_CHARACTER = CSVWriter.NO_QUOTE_CHARACTER;
    public static final char NO_ESCAPE_CHARACTER = CSVWriter.NO_ESCAPE_CHARACTER;
    public static final String RFC4180_LINE_END = CSVWriter.RFC4180_LINE_END;

    char separatorChar = CSVWriter.DEFAULT_SEPARATOR;
    char quoteChar = CSVWriter.DEFAULT_QUOTE_CHARACTER;
    char escapeChar = CSVWriter.DEFAULT_ESCAPE_CHARACTER;
    String lineEnd = CSVWriter.DEFAULT_LINE_END;

}
