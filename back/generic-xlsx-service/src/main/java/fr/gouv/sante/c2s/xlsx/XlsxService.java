package fr.gouv.sante.c2s.xlsx;

import java.io.File;
import java.util.function.Function;
import java.util.stream.Stream;

public class XlsxService {

    public <T> Long createXlsx(File file, String optionalSheetName, int[] optionalColumnWidths, String[] optionalColumnNames, Stream<T> stream, Function<T, String[]> lineMapper) throws Exception {
        XlsxMonoSheetWriter writer = new XlsxMonoSheetWriter(optionalSheetName, optionalColumnWidths, optionalColumnNames);
        return writer.createXlsx(file, stream, lineMapper);
    }

}