package fr.gouv.sante.c2s;
import fr.gouv.sante.c2s.security.SecurityService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.AfterEach;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class ChecksumTest {

    private List<File> temporaryFiles;
    private SecurityService securityService;

    @BeforeEach
    public void setUp() {
        temporaryFiles = new ArrayList<>();
        securityService = new SecurityService();
    }

    @AfterEach
    public void tearDown() {
        for (File file : temporaryFiles) {
            file.delete();
        }
        temporaryFiles.clear();
    }


    @Test
    public void testGetChecksumSha1() throws IOException {
        for (int i = 0; i < 1000; i++) {
            File tempFile = createTempFile("testFile" + i, "content" + i);
            String expectedChecksum = calculateExpectedChecksum("content" + i);
            String actualChecksum = securityService.getChecksumSha1(tempFile);
            assertEquals(actualChecksum.length(), 40);
            assertEquals(expectedChecksum, actualChecksum);
        }
    }

    private File createTempFile(String fileName, String content) throws IOException {
        File tempFile = File.createTempFile(fileName, ".txt");
        try (FileWriter writer = new FileWriter(tempFile)) {
            writer.write(content);
        }
        temporaryFiles.add(tempFile);
        return tempFile;
    }

    private String calculateExpectedChecksum(String content) {
        try {
            byte[] hash = MessageDigest.getInstance("SHA-1").digest(content.getBytes()); // NOSONAR
            String hex = new BigInteger(1, hash).toString(16);
            // Assurer une longueur de 40 caractères en préfixant avec des zéros si nécessaire
            while (hex.length() < 40) {
                hex = "0" + hex;
            }
            return hex;
        } catch (NoSuchAlgorithmException nsae) {
            throw new RuntimeException(nsae);
        }
    }
}