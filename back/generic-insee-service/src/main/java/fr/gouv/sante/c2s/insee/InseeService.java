package fr.gouv.sante.c2s.insee;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Service
public class InseeService {

    @Value("${siren.api.key}")
    private String sirenApiKey;

    public String getDenomination(String siren) throws InseeException {

        try {

            HttpClient client = HttpClient.newHttpClient();
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
            ie.getMessage();
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
}
