package fr.gouv.sante.c2s.xlsx;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbookFactory;

import java.io.File;
import java.io.FileOutputStream;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;
import java.util.function.Function;
import java.util.stream.Stream;

public class XlsxMonoSheetWriter {

    private String sheetName;
    private int[] columnWidths;
    private String[] columnNames;

    public XlsxMonoSheetWriter(String sheetName, int[] columnWidths, String[] columnNames) throws Exception {
        this.sheetName = sheetName;
        this.columnWidths = columnWidths;
        this.columnNames = columnNames;
    }

    public <T> Long createXlsx(File file, Stream<T> stream, Function<T, String[]> lineMapper) throws Exception {

        AtomicLong count = new AtomicLong(0);

        // document && outputstream
        try (Workbook workbook = new XSSFWorkbookFactory().create(); FileOutputStream outputStream = new FileOutputStream(file)) {

            // styles
            CellStyle headerStyle = workbook.createCellStyle();
            headerStyle.setAlignment(HorizontalAlignment.CENTER);
            headerStyle.setVerticalAlignment(VerticalAlignment.CENTER);
            Font headerFont = workbook.createFont();
            headerFont.setBold(true);
            headerStyle.setFont(headerFont);

            CellStyle style = workbook.createCellStyle();
            headerStyle.setVerticalAlignment(VerticalAlignment.TOP);

            // feuille
            XSSFSheet sheet = (XSSFSheet) (sheetName == null ? workbook.createSheet() : workbook.createSheet(sheetName));

            // largeur des colonnes
            if (columnWidths != null) {
                for (int i = 0; i < columnWidths.length; i++) {
                    sheet.setColumnWidth(i, columnWidths[i]);
                }
            }

            // entêtes des colonnes
            if (columnNames != null) {
                sheet.createRow(0);
                for (int i = 0; i < columnNames.length; i++) {
                    Cell cell = sheet.getRow(0).createCell(i);
                    cell.setCellValue(columnNames[i]);
                    cell.setCellStyle(headerStyle);
                }
            }

            AtomicInteger rowStart = new AtomicInteger(sheet.getLastRowNum() + 1);
            System.out.println(rowStart.get());

            stream.forEach(t -> {
                Row row = sheet.getRow(rowStart.get());
                if (row == null) {
                    row = sheet.createRow(rowStart.get());
                }
                String[] lineData = lineMapper.apply(t);
                for (int i = 0; i < lineData.length; i++) {
                    Cell cell = row.createCell(i);
                    cell.setCellValue(lineData[i]);
                    cell.setCellStyle(style);
                }
                count.incrementAndGet();
                rowStart.incrementAndGet();
            });

            workbook.write(outputStream);
        } // Les ressources sont fermées automatiquement ici

        return count.get();
    }

}
