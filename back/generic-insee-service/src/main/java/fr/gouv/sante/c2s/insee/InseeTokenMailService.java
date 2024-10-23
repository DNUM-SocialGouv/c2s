package fr.gouv.sante.c2s.insee;

import java.util.Base64;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
class InseeTokenMailService {
    private String accessToken = null;
    private long expiryTime = 0;

    @Value("${siren.keyconsumer}")
    private  String consumerKey;
    @Value("${siren.secretconsumer}")
    private String consumerSecret;
    @Value("${siren.tokenurl}")
    private String tokenUrl;

    public synchronized String getToken() throws Exception {
        if (accessToken == null || System.currentTimeMillis() > expiryTime) {
            accessToken = fetchNewToken();
            expiryTime = System.currentTimeMillis() + (1000 * 60 * 60); // Supposons que le token expire après 1 heure
        }
        return accessToken;
    }

    private String fetchNewToken() throws Exception {
        String encodedCredentials = Base64.getEncoder().encodeToString((consumerKey + ":" + consumerSecret).getBytes());
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(tokenUrl))
                    .header("Content-Type", "application/x-www-form-urlencoded")
                    .header("Authorization", "Basic " + encodedCredentials)
                    .POST(HttpRequest.BodyPublishers.ofString("grant_type=client_credentials"))
                    .build();
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        String rawResponse = response.body();
        ObjectMapper mapper = new ObjectMapper();
        return mapper.readTree(rawResponse).get("access_token").asText();
    }
}
