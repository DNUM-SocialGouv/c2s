package fr.gouv.sante.c2s.security;

import org.jsoup.Jsoup;
import org.jsoup.safety.Safelist;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.math.BigInteger;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@Service
public class SecurityService {

    public String getChecksumSha1(File file) {
        Path filePath = Path.of(file.getAbsolutePath());
        try {
            byte[] data = Files.readAllBytes(Paths.get(filePath.toUri()));
            byte[] hash = MessageDigest.getInstance("SHA-1").digest(data); // NOSONAR

            String hex = new BigInteger(1, hash).toString(16);
            // Assurer une longueur de 40 caractères en préfixant avec des zéros si nécessaire
            while (hex.length() < 40) {
                hex = "0" + hex;
            }

            //System.out.println("BI "+new BigInteger(1, hash));
            //System.out.println("LE "+new BigInteger(1, data).toString(16).length());
            //System.out.println("ST "+new BigInteger(1, hash).toString(16));
            return hex;
        } catch (NoSuchAlgorithmException | IOException nsae) {
            throw new RuntimeException(nsae);
        }
    }

    public String getUniqueId() {
        return String.valueOf(System.nanoTime());
    }

    /**
     * <p>
     * Strips any potential XSS threats out of the value.</p>
     * <p>See <a
     * href="http://codehustler.org/blog/jersey-cross-site-scripting-xss-filter-for-java-web-apps/">Jersey
     * Cross-Site Scripting XSS Filter for Java Web Apps</a> for more details on
     * this method.</p>
     *
     * @param str The {@code String} to be evaluated for HTML tags.
     * @return a {@code String} that has HTML tags removed.
     */
    public String stripXSS(String str) {
        if (str==null)
            return str;
        String cleaned = Jsoup.clean(str, Safelist.none());
        if (cleaned==null || cleaned.equals("")) {
            return "";
        }
        return cleaned;
    }

    public String cleanFilename(String filename) {
        if (filename.length()>126) {
            filename = filename.substring(0, 40);
        }
        return URLEncoder.encode(filename, StandardCharsets.UTF_8);
    }

}
