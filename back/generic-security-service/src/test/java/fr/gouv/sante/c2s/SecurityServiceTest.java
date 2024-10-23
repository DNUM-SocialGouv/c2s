package fr.gouv.sante.c2s;

import fr.gouv.sante.c2s.security.SecurityService;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import java.io.File;

import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertEquals;

/**
 * Unit test for simple App using JUnit Jupiter (JUnit 5).
 */

public class SecurityServiceTest
{

    private static SecurityService securityService;

    @BeforeAll
    public static void onSetup() {
        securityService = new SecurityService();
    }

    @Test
    void testGetChecksumSha1() {
        // Create some file and add its path here
        File file = new File("./pom.xml");
        String checksum = securityService.getChecksumSha1(file);
        assertNotNull(checksum);
    }

    @Test
    void testGetUniqueId() {
        String id1 = securityService.getUniqueId();
        String id2 = securityService.getUniqueId();
        assertNotEquals(id1, id2);
    }

    @Test
    void testStripXSS1() {
        String input = "<script>alert('xss')</script>";
        String stripped = securityService.stripXSS(input);
        System.out.println("Stripped "+stripped);
        assertEquals("", stripped);
    }

    @Test
    void testStripXSS2() {
        String input = "Test<script>alert('xss')</script>";
        String stripped = securityService.stripXSS(input);
        assertEquals("Test", stripped);
    }

    @Test
    void testStripXSS3() {
        String input = "<h2>Bonjour</h2> tout <h3>le</h3> monde";
        String stripped = securityService.stripXSS(input);
        assertEquals("Bonjour tout le monde", stripped);
    }

    @Test
    void testCleanFileName() {
        String fileName = "someReallyReallyLongFileNameThatExceedsTheMaximumLengthAllowedAndSomeReallyReallyLongFileNameThatExceedsTheMaximumLengthAllowedByTheCleanFileNameFunctionWithAdditionalContentToTest.txt";
        String cleaned = securityService.cleanFilename(fileName);
        assertTrue(cleaned.length() <= 40);
    }
}
