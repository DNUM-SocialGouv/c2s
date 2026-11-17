package fr.gouv.sante.c2s.insee;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.cert.X509Certificate;
import java.util.Optional;

@Slf4j
@Service
public class InseeService {

    @Value("${siren.api.key}")
    private String sirenApiKey;

    @Value("${enable.http.ssl.verification:true}")
    private boolean enableHttpSslVerification;

    public String getDenomination(String siren) throws InseeException {
        try {
            HttpClient client;

            if (!enableHttpSslVerification) {
                Optional<SSLContext> sslContextOptional = createTrustAllSSLContext();
                if (sslContextOptional.isPresent()) {
                    client = HttpClient.newBuilder()
                            .sslContext(sslContextOptional.get())
                            .build();
                } else {
                    log.warn("Impossible de créer un SSLContext sans vérification SSL, utilisation du HttpClient par défaut");
                    client = HttpClient.newHttpClient();
                }
            } else {
                client = HttpClient.newHttpClient();
            }

            //HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("https://api.insee.fr/api-sirene/3.11/siren/" + siren)) // Updated to V3.11
                    .header("X-INSEE-Api-Key-Integration", sirenApiKey)
                    .headers("accept", "application/json")
                    .GET()
                    .build();

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            String responseBodyAsString = response.body();
            JsonObject responseBody = JsonParser.parseString(responseBodyAsString).getAsJsonObject();

            if (response.statusCode() == 200) {
                String denomination = responseBody
                        .get("uniteLegale").getAsJsonObject()
                        .get("periodesUniteLegale").getAsJsonArray().get(0).getAsJsonObject()
                        .get("denominationUniteLegale").getAsString();
                return denomination;
            } else {
                String errorMessage = responseBody
                        .get("header").getAsJsonObject()
                        .get("message").getAsString();
                throw new InseeException(errorMessage);
            }
        } catch (InseeException e) {
            e.printStackTrace();
            throw e;
        } catch (InterruptedException ie) {
            ie.printStackTrace();
            Thread.currentThread().interrupt();
            throw new InseeException("Erreur le processus de récuration d'informations INSEE a été interrompu.");
        } catch (IOException e) {
            e.printStackTrace();
            throw new InseeException("Erreur lors de la récupération des données.");
        } catch (Exception e) {
            e.printStackTrace();
            throw new InseeException("Erreur serveur inattendue.");
        }
    }

    private Optional<SSLContext> createTrustAllSSLContext() {
        try {
            TrustManager[] trustAllCerts = createTrustAllManagers();
            SSLContext sslContext = SSLContext.getInstance("TLS");
            sslContext.init(null, trustAllCerts, new SecureRandom());
            return Optional.of(sslContext);
        } catch (NoSuchAlgorithmException | KeyManagementException e) {
            log.error("Erreur lors de la création du SSLContext sans vérification SSL", e);
            return Optional.empty();
        }
    }

    private TrustManager[] createTrustAllManagers() {
        return new TrustManager[]{
                new X509TrustManager() {
                    @Override
                    public X509Certificate[] getAcceptedIssuers() {
                        return new X509Certificate[0];
                    }

                    @Override
                    public void checkClientTrusted(X509Certificate[] certs, String authType) {
                        // Trust all - uniquement pour environnement de développement
                    }

                    @Override
                    public void checkServerTrusted(X509Certificate[] certs, String authType) {
                        // Trust all - uniquement pour environnement de développement
                    }
                }
        };
    }
}
