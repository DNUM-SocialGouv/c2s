package fr.gouv.sante.c2s.keycloak;

import fr.gouv.sante.c2s.model.GroupeEnum;
import jakarta.ws.rs.core.Response;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.RoleResource;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

public class AdminService {

    private RealmResource realmResource;

    public AdminService(RealmResource realmResource) {
        this.realmResource = realmResource;
    }

    public UserRepresentation getUserByEmail(String email) {
        List<UserRepresentation> userRepresentations = realmResource.users().searchByEmail(email, true);
        if (userRepresentations.size()==1) {
            return userRepresentations.get(0);
        }
        return null;
    }

    public UserRepresentation createUser(String email, String nom, String prenom, GroupeEnum groupe) {

        UserRepresentation representation = new UserRepresentation();
        representation.setEmail(email);
        representation.setFirstName(prenom);
        representation.setLastName(nom);
        representation.setEnabled(false);
        representation.setUsername(email);
        representation.setEmailVerified(true);

        // credentials
        CredentialRepresentation credentialRepresentation = new CredentialRepresentation();
        credentialRepresentation.setTemporary(true);
        credentialRepresentation.setType(CredentialRepresentation.PASSWORD);
        credentialRepresentation.setValue(UUID.randomUUID().toString());
        representation.setCredentials(Collections.singletonList(credentialRepresentation));

        // creation
        try (Response response = realmResource.users().create(representation)) {

            if (response.getStatus() == 201) {

                List<UserRepresentation> userRepresentations = realmResource.users().searchByEmail(email, true);

                // role
                if (userRepresentations.size() == 1) {
                    String id = userRepresentations.get(0).getId();
                    UserResource user = realmResource.users().get(id);
                    RoleRepresentation role = realmResource.roles().get(groupe.name()).toRepresentation();
                    user.roles().realmLevel().add(Arrays.asList(role));
                }

                if (response.hasEntity()) {
                    return (UserRepresentation) response.getEntity();
                }
            }
        }
        return null;
    }

    public void updateUser(String email, String nom, String prenom) {
        List<UserRepresentation> users = realmResource.users().searchByEmail(email,true);
        if (users!=null && users.size()==1) {
            UserRepresentation userRepresentation = users.get(0);
            userRepresentation.setFirstName(prenom);
            userRepresentation.setLastName(nom);
            realmResource.users().get(userRepresentation.getId()).update(userRepresentation);
        }
    }

    public void disableUser(String email) {
        List<UserRepresentation> users = realmResource.users().searchByEmail(email,true);
        if (users!=null && users.size()==1) {
            UserRepresentation userRepresentation = users.get(0);
            userRepresentation.setEnabled(false);
            realmResource.users().get(userRepresentation.getId()).update(userRepresentation);
        }
    }

    public void enableUser(String email) {
        List<UserRepresentation> users = realmResource.users().searchByEmail(email,true);
        if (users!=null && users.size()==1) {
            UserRepresentation userRepresentation = users.get(0);
            userRepresentation.setEnabled(true);
            realmResource.users().get(userRepresentation.getId()).update(userRepresentation);
        }
    }

    public boolean resetPassword(String email, String password) {
        UserRepresentation user = getUserByEmail(email);
        if (user!=null) {
            CredentialRepresentation credential = new CredentialRepresentation();
            credential.setType(CredentialRepresentation.PASSWORD);
            credential.setValue(password);
            credential.setTemporary(false);
            realmResource.users().get(user.getId()).resetPassword(credential);
            return true;
        }
        return false;
    }

    public boolean deleteUserByEmail(String email) {
        UserRepresentation user = getUserByEmail(email);
        if (user!=null) {
            realmResource.users().delete(user.getId());
            return true;
        }
        return false;
    }

    public boolean doMigration() {

        RoleResource roleResource = realmResource.roles().get("oc");

        if (roleResource==null)
            return false;

        roleResource.remove();

        RoleResource roleResource1 = realmResource.roles().get("caisse");
        if (roleResource1!=null)
            roleResource1.remove();

        RoleResource roleResource2 = realmResource.roles().get("moderateur");
        if (roleResource2!=null)
            roleResource2.remove();

        RoleRepresentation roleCaisse = new RoleRepresentation();
        roleCaisse.setName(GroupeEnum.CAISSE.name());
        roleCaisse.setClientRole(false);
        roleCaisse.setComposite(false);
        roleCaisse.setDescription("Caisse d'assurance maladie");
        realmResource.roles().create(roleCaisse);

        RoleRepresentation roleOc = new RoleRepresentation();
        roleOc.setName(GroupeEnum.ORGANISME_COMPLEMENTAIRE.name());
        roleOc.setClientRole(false);
        roleOc.setComposite(false);
        roleOc.setDescription("Organisme complémentaire");
        realmResource.roles().create(roleOc);

        RoleRepresentation roleModerateur = new RoleRepresentation();
        roleModerateur.setName(GroupeEnum.MODERATEUR.name());
        roleModerateur.setClientRole(false);
        roleModerateur.setComposite(false);
        roleModerateur.setDescription("Modérateur");
        realmResource.roles().create(roleModerateur);

        List<UserRepresentation> users = realmResource.users().searchByEmail("c2s_user_moderateur@c2s.com", true);
        if (users!=null && users.size()==1) {
            UserRepresentation userRepresentation = users.get(0);
            UserResource user = realmResource.users().get(userRepresentation.getId());
            RoleRepresentation role = realmResource.roles().get(GroupeEnum.MODERATEUR.name()).toRepresentation();
            user.roles().realmLevel().add(Arrays.asList(role));
        }

        users = realmResource.users().searchByEmail("c2s_user_oc@c2s.com", true);
        if (users!=null && users.size()==1) {
            UserRepresentation userRepresentation = users.get(0);
            UserResource user = realmResource.users().get(userRepresentation.getId());
            RoleRepresentation role = realmResource.roles().get(GroupeEnum.ORGANISME_COMPLEMENTAIRE.name()).toRepresentation();
            user.roles().realmLevel().add(Arrays.asList(role));
        }

        return true;
    }

}
