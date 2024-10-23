package fr.gouv.sante.c2s.csv;

import com.opencsv.CSVReader;
import com.opencsv.CSVWriterBuilder;
import com.opencsv.ICSVWriter;
import com.opencsv.exceptions.CsvValidationException;

import java.io.*;
import java.nio.charset.Charset;
import java.util.concurrent.atomic.AtomicReference;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.stream.Stream;

public class CsvService {

    protected ICSVWriter getWriter(File file) throws Exception {
        ICSVWriter writer = new CSVWriterBuilder(new FileWriter(file))
                .withSeparator(CsvWriterConfig.DEFAULT_SEPARATOR)
                .withQuoteChar(CsvWriterConfig.DEFAULT_QUOTE_CHARACTER)
                .withEscapeChar(CsvWriterConfig.DEFAULT_ESCAPE_CHARACTER)
                .withLineEnd(CsvWriterConfig.DEFAULT_LINE_END)
                .build();
        return writer;
    }

    protected ICSVWriter getWriter(File file, Charset charset) throws Exception {
        ICSVWriter writer = new CSVWriterBuilder(new FileWriter(file, charset))
                .withSeparator(CsvWriterConfig.DEFAULT_SEPARATOR)
                .withQuoteChar(CsvWriterConfig.DEFAULT_QUOTE_CHARACTER)
                .withEscapeChar(CsvWriterConfig.DEFAULT_ESCAPE_CHARACTER)
                .withLineEnd(CsvWriterConfig.DEFAULT_LINE_END)
                .build();
        return writer;
    }

    protected ICSVWriter getWriter(File file, CsvWriterConfig config) throws Exception {
        if (config!=null) {
            return new CSVWriterBuilder(new FileWriter(file))
                    .withSeparator(config.separatorChar)
                    .withQuoteChar(config.quoteChar)
                    .withEscapeChar(config.escapeChar)
                    .withLineEnd(config.lineEnd)
                    .build();
        } else {
            return getWriter(file);
        }
    }


    protected ICSVWriter getWriter(File file, Charset charset, CsvWriterConfig config) throws Exception {
        if (config!=null) {
            return new CSVWriterBuilder(new FileWriter(file, charset))
                    .withSeparator(config.separatorChar)
                    .withQuoteChar(config.quoteChar)
                    .withEscapeChar(config.escapeChar)
                    .withLineEnd(config.lineEnd)
                    .build();
        } else {
            return getWriter(file, charset);
        }
    }

    protected CSVReader getReader(String content) {
        return new CSVReader(new StringReader(content));
    }

    public <T> Long createCsv(String filePath, String[] optionalHeaders, Stream<T> stream, Function<T, String[]> lineMapper) throws Exception {
        Long count;
        try (ICSVWriter writer = getWriter(new File(filePath))) {
            count = createCsv(writer, optionalHeaders, stream, lineMapper);
        }
        return count;
    }


    public <T> Long createCsv(String filePath, Charset charset, String[] optionalHeaders, Stream<T> stream, Function<T, String[]> lineMapper) throws Exception {
        Long count;
        try (ICSVWriter writer = getWriter(new File(filePath), charset)) {
            count = createCsv(writer, optionalHeaders, stream, lineMapper);
        }
        return count;
    }

    public <T> Long createCsv(File file, String[] optionalHeaders, Stream<T> stream, Function<T, String[]> lineMapper) throws Exception {
        Long count;
        try (ICSVWriter writer = getWriter(file)) {
            count = createCsv(writer, optionalHeaders, stream, lineMapper);
        }
        return count;
    }

    public <T> Long createCsv(File file, Charset charset, String[] optionalHeaders, Stream<T> stream, Function<T, String[]> lineMapper) throws Exception {
        Long count;
        try (ICSVWriter writer = getWriter(file, charset)) {
            count = createCsv(writer, optionalHeaders, stream, lineMapper);
        }
        return count;
    }

    public <T> Long createCsv(String filePath, CsvWriterConfig config, String[] optionalHeaders, Stream<T> stream, Function<T, String[]> lineMapper) throws Exception {
        Long count;
        try (ICSVWriter writer = getWriter(new File(filePath), config)) {
            count = createCsv(writer, optionalHeaders, stream, lineMapper);
        }
        return count;
    }

    public <T> Long createCsv(String filePath, Charset charset, CsvWriterConfig config, String[] optionalHeaders, Stream<T> stream, Function<T, String[]> lineMapper) throws Exception {
        Long count;
        try (ICSVWriter writer = getWriter(new File(filePath), charset, config)) {
            count = createCsv(writer, optionalHeaders, stream, lineMapper);
        }
        return count;
    }

    public <T> Long createCsv(File file, CsvWriterConfig config, String[] optionalHeaders, Stream<T> stream, Function<T, String[]> lineMapper) throws Exception {
        Long count;
        try (ICSVWriter writer = getWriter(file, config)) {
            count = createCsv(writer, optionalHeaders, stream, lineMapper);
        }
        return count;
    }

    public <T> Long createCsv(File file, Charset charset, CsvWriterConfig config, String[] optionalHeaders, Stream<T> stream, Function<T, String[]> lineMapper) throws Exception {
        Long count;
        try (ICSVWriter writer = getWriter(file, charset, config)) {
            count = createCsv(writer, optionalHeaders, stream, lineMapper);
        }
        return count;
    }

    private <T> Long createCsv(ICSVWriter writer, String[] optionalHeaders, Stream<T> stream, Function<T, String[]> lineMapper) {
        if (optionalHeaders!=null) {
            writer.writeNext(optionalHeaders);
        }
        AtomicReference<Long> count = new AtomicReference<>(optionalHeaders!=null ? 1L : 0L);
        stream.forEach(t -> {
            writer.writeNext(lineMapper.apply(t));
            count.getAndSet(count.get() + 1);
        });
        return count.get();
    }

    public <T> Long readCsv(String content, int startLine, Consumer<String[]> consumer) throws IOException, CsvValidationException {
        CSVReader reader = getReader(content);
        reader.skip(startLine);
        String[] next = null;
        while ((next = reader.readNext()) != null) {
            consumer.accept(next);
        }
        return reader.getLinesRead();
    }
}
