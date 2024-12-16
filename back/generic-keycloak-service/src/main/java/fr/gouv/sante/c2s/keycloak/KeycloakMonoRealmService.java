package fr.gouv.sante.c2s.keycloak;

import jakarta.annotation.PostConstruct;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.keycloak.admin.client.resource.RealmResource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.PropertySources;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@PropertySources({
        @PropertySource(value = "classpath:keycloak.properties", ignoreResourceNotFound = true),
        @PropertySource(value = "application.yml", ignoreResourceNotFound = true),
        @PropertySource(value = "application.properties", ignoreResourceNotFound = true)
})
public class KeycloakMonoRealmService {

    @Value("${keycloak.baseUrl}")
    private String serverUrl;
    @Value("${keycloak.internal.baseUrl}")
    private String internalServerUrl;
    @Value("${keycloak.realm}")
    private String realm;
    @Value("${keycloak.principal-attribute}")
    private String username;
    @Value("${keycloak.principal-attribute-password}")
    private String password;
    @Value("${keycloak.clientId}")
    private String clientId;

    @Value("${keycloak.base.clientId}")
    private String baseClientId;

    @Value("${keycloak.base.clientSecret}")
    private String baseClientSecret;

    @Getter
    private BaseService baseService;
    @Getter
    private AdminService adminService;

    private Keycloak keycloak;

    @PostConstruct
    public void init() {

        String realServerUrl = internalServerUrl==null || internalServerUrl.trim().isEmpty() ? serverUrl : internalServerUrl;

        this.keycloak = KeycloakBuilder.builder()
                .serverUrl(realServerUrl)
                .realm(realm)
                .username(username)
                .password(password)
                .clientId(clientId)
                .build();
        this.baseService = new BaseService(realServerUrl, baseClientId, baseClientSecret, realm);
        this.adminService = new AdminService(keycloak.realm(realm));
    }

    public RealmResource getRealm() {
        return keycloak.realm(realm);
    }

}
