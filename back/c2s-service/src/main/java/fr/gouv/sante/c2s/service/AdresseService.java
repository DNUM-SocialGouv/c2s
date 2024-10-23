package fr.gouv.sante.c2s.service;

import fr.gouv.sante.c2s.model.dto.AdresseInfoDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import com.fasterxml.jackson.databind.JsonNode;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@Slf4j
public class AdresseService {

    private static final String API_ADRESSE = "https://api-adresse.data.gouv.fr";

    public List<AdresseInfoDTO> fetchAdresseInfo(String query) {
        try {
            RestTemplate restTemplate = new RestTemplate();

            UriComponentsBuilder uriBuilder = UriComponentsBuilder
                    .fromUriString("/search")
                    .queryParam("q", query)
                    .queryParam("type", "housenumber")
                    .queryParam("autocomplete", "1");

            String url = uriBuilder.toUriString();

            ResponseEntity<JsonNode> response = restTemplate.getForEntity(API_ADRESSE + url, JsonNode.class);

            if (response.getStatusCodeValue()>400 && response.getStatusCodeValue()<500) {
                log.error("Failed to fetch address data: Status Code {}", response.getStatusCode());
                throw new RuntimeException("Failed to fetch address data: Status Code {}" + response.getStatusCode());
            }

            List<AdresseInfoDTO> adresseInfoList = new ArrayList<>();
            JsonNode features = Objects.requireNonNull(response.getBody()).path("features");

            if (features!=null && features.isArray() && !features.isEmpty()) {
                for (JsonNode node : features) {
                    AdresseInfoDTO adresseInfo = convertJsonNodeToAdresseInfo(node);
                    adresseInfoList.add(adresseInfo);
                }
            }

            return adresseInfoList;

        } catch (HttpClientErrorException | HttpServerErrorException e) {
            log.error("Error fetching address information: ", e);
        }

        return List.of();
    }

    private AdresseInfoDTO convertJsonNodeToAdresseInfo(JsonNode jsonNode) {
        JsonNode properties = jsonNode.path("properties");
        return new AdresseInfoDTO(
                properties.path("label").asText(""),
                properties.path("context").asText(""),
                properties.path("postcode").asText(""),
                properties.path("city").asText(""),
                properties.path("name").asText("")
        );
    }

}
