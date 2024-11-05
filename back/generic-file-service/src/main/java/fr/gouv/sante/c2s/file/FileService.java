package fr.gouv.sante.c2s.file;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.PropertySources;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;

import java.io.*;
import java.text.Normalizer;
import java.util.Arrays;

import java.util.List;

import java.util.function.Predicate;
import java.util.stream.Stream;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

@Service
@PropertySources({
        @PropertySource(value = "classpath:file.properties", ignoreResourceNotFound = true),
        @PropertySource(value = "file:/etc/c2s.properties", ignoreResourceNotFound = true),
        @PropertySource(value = "file:/opt/c2s/application.properties", ignoreResourceNotFound = true),
})
@Slf4j
public class FileService {

    @Value("${c2s.working.directory}")
    private String workingDirectory;

    @Value("${c2s.max.file.size.mo}")
    private Integer maxFileSizeMegaOctet;

    @Value("${c2s.valid.extension}")
    private String[] validExtensions;

    public boolean copy(File file, String destination) {
        File fileOut = new File(destination + File.separator + file.getName());
        try {
            FileCopyUtils.copy(file, fileOut);
            return true;
        } catch (IOException e) {
            log.error(e.getMessage());
            return false;
        }
    }

    public boolean copy(File file, File fileOut) {
        try {
            FileCopyUtils.copy(file, fileOut);
            return true;
        } catch (IOException e) {
            log.error(e.getMessage());
            return false;
        }
    }

    public String getTempDir() {
        return System.getProperty("java.io.tmpdir");
    }

    public File getTempFile(String fileName) {
        String tempDir = getTempDir();
        File file = new File(tempDir + File.separatorChar + fileName);
        return file;
    }

    public File getWorkingDir() {
        return new File(workingDirectory);
    }

    public File getWorkingFile(String fileName, String subDirectory) {
        File workingDirectory = getWorkingDir();
        File newDirectory = new File(workingDirectory.getAbsolutePath() + File.separatorChar + subDirectory);
        newDirectory.mkdirs();
        return new File(newDirectory.getAbsolutePath() + File.separatorChar + fileName);
    }

    public FileOperation saveInputStream(String originalFileName, String cleanFileName, File file, InputStream inputStream) throws IOException {
        FileOperation operation = new FileOperation();
        operation.setSize((long) inputStream.available());
        String[] values = splitOnLastDot(originalFileName);
        if (invalidExtension(values[1])) {
            operation.setError("L'extension n'est pas valide");
        } else if (invalidSize(inputStream)) {
            operation.setError("Le taille du fichier est supérieur à la taille autorisée");
        } else {
            OutputStream outputStream = new FileOutputStream(file);
            FileCopyUtils.copy(inputStream, outputStream);
        }
        operation.setFileName(values[0]);
        operation.setExtension(values[1]);
        operation.setDirectory(file.getParentFile().getAbsolutePath());
        return operation;
    }

    public File createZipFile(String zipFileName, File ... files) throws IOException {
        if (!zipFileName.endsWith(".zip")) {
            zipFileName += ".zip";
        }
        final File zipFile = getTempFile(zipFileName);
        final FileOutputStream fos = new FileOutputStream(zipFile);
        ZipOutputStream zipOut = new ZipOutputStream(fos);
        for(File f : files) {
            addFileToZip(f, zipOut);
        }
        zipOut.close();
        fos.close();

        return zipFile;
    }

    public void deleteTempFiles(Predicate<File> nameFilter, Predicate<File> timeFilter) {
        File tmpDirectory = new File(getTempDir());
        Stream<File> filesStream = Arrays.stream(tmpDirectory.listFiles());
        if (nameFilter!=null) {
            filesStream = filesStream.filter(nameFilter);
        }
        if (timeFilter!=null) {
            filesStream = filesStream.filter(timeFilter);
        }
        filesStream.forEach(File::delete);
    }

    public File searchOneTempFile(Predicate<File> nameFilter) {
        File tmpDirectory = new File(getTempDir());
        List<File> files = Arrays.stream(tmpDirectory.listFiles()).filter(nameFilter).toList();
        if (files.size()==1) {
            return files.get(0);
        } else if (files.isEmpty()) {
            return null;
        } else {
            throw new IllegalStateException("Nombre de fichier correspondants dans [tmpDirectory] > 1");
        }
    }


    private void addFileToZip(File file, ZipOutputStream zipOut) throws IOException {
        try (FileInputStream fis = new FileInputStream(file)) {
            ZipEntry zipEntry = new ZipEntry(file.getName());
            zipOut.putNextEntry(zipEntry);

            byte[] bytes = new byte[1024];
            int length;
            while ((length = fis.read(bytes)) >= 0) {
                zipOut.write(bytes, 0, length);
            }
        }
    }

    private static String[] splitOnLastDot(String originalFilename) {
        String filename = Normalizer.normalize(originalFilename, Normalizer.Form.NFKD);

        String[] parts = filename.split("[.]");

        String extension = parts[parts.length - 1];

        String name = parts[0];
        int i = 0;
        while (i++ < parts.length - 2) {
            name += "." + parts[i];
        }

        return new String[]{name, extension};
    }

    private boolean invalidExtension(String extension) {
        Arrays.stream(validExtensions).forEach(it -> System.out.println("i "+it+" "+extension+" "+it.equals(extension)));
        System.err.println(validExtensions[0]);
        return Arrays.stream(validExtensions).noneMatch(it -> it.equalsIgnoreCase(extension));
    }

    private boolean invalidSize(InputStream inputStream) throws IOException {
        return inputStream.available() > 1024 * 1000 * maxFileSizeMegaOctet;
    }

}
