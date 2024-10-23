package fr.gouv.sante.c2s.insee;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Service
public class InseeService {

    @Autowired
    InseeTokenMailService inseeTokenMailService;

    public String getDenomination(String siren) throws InseeException {

        try {

            String token = inseeTokenMailService.getToken();
            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("https://api.insee.fr/entreprises/sirene/V3.11/siren/" + siren)) // Updated to V3.11
                    .header("Authorization", "Bearer " + token)
                    .GET()
                    .build();

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            JsonObject responseBody = JsonParser.parseString(response.body()).getAsJsonObject();

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
            throw e;
        } catch (InterruptedException ie) {
            Thread.currentThread().interrupt();
            throw new InseeException("Erreur le processus de récuration d'informations INSEE a été interrompu.");
        } catch (IOException e) {
            throw new InseeException("Erreur lors de la récupération des données.");
        } catch (Exception e) {
            throw new InseeException("Erreur serveur inattendue.");
        }
    }
}
