package fr.gouv.sante.c2s;

import fr.gouv.sante.c2s.keycloak.AdminService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.keycloak.admin.client.resource.*;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;

import java.util.Collections;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AdminServiceTest {

    private RealmResource realmResource;
    private AdminService adminService;
    private UsersResource usersResource;
    private RolesResource rolesResource;

    @BeforeEach
    void setUp() {
        realmResource = mock(RealmResource.class);
        usersResource = mock(UsersResource.class);
        rolesResource = mock(RolesResource.class);
        adminService = new AdminService(realmResource);
        when(realmResource.users()).thenReturn(usersResource);
        when(realmResource.roles()).thenReturn(rolesResource);
    }

    @Test
    void testGetUserByEmail() {
        UserRepresentation userRepresentation = new UserRepresentation();
        userRepresentation.setEmail("test@example.com");

        when(realmResource.users().searchByEmail("test@example.com", true))
                .thenReturn(Collections.singletonList(userRepresentation));

        UserRepresentation result = adminService.getUserByEmail("test@example.com");
        assertNotNull(result);
        assertEquals("test@example.com", result.getEmail());
    }

    @Test
    void testUpdateUser() {
        UserRepresentation userRepresentation = new UserRepresentation();
        userRepresentation.setEmail("test@example.com");
        userRepresentation.setId(UUID.randomUUID().toString());

        when(realmResource.users().searchByEmail("test@example.com", true))
                .thenReturn(Collections.singletonList(userRepresentation));

        UserResource userResource = mock(UserResource.class);
        when(realmResource.users().get(userRepresentation.getId())).thenReturn(userResource);

        adminService.updateUser("test@example.com", "NewNom", "NewPrenom");

        verify(userResource).update(any(UserRepresentation.class));
    }

    @Test
    void testDisableUser() {
        UserRepresentation userRepresentation = new UserRepresentation();
        userRepresentation.setEmail("test@example.com");
        userRepresentation.setId(UUID.randomUUID().toString());

        when(realmResource.users().searchByEmail("test@example.com", true))
                .thenReturn(Collections.singletonList(userRepresentation));

        UserResource userResource = mock(UserResource.class);
        when(realmResource.users().get(userRepresentation.getId())).thenReturn(userResource);

        adminService.disableUser("test@example.com");
        assertFalse(userRepresentation.isEnabled());
        verify(userResource).update(any(UserRepresentation.class));
    }

    @Test
    void testEnableUser() {
        UserRepresentation userRepresentation = new UserRepresentation();
        userRepresentation.setEmail("test@example.com");
        userRepresentation.setId(UUID.randomUUID().toString());

        when(realmResource.users().searchByEmail("test@example.com", true))
                .thenReturn(Collections.singletonList(userRepresentation));

        UserResource userResource = mock(UserResource.class);
        when(realmResource.users().get(userRepresentation.getId())).thenReturn(userResource);

        adminService.enableUser("test@example.com");
        assertTrue(userRepresentation.isEnabled());
        verify(userResource).update(any(UserRepresentation.class));
    }

    @Test
    void testResetPassword() {
        UserRepresentation userRepresentation = new UserRepresentation();
        userRepresentation.setEmail("test@example.com");
        userRepresentation.setId(UUID.randomUUID().toString());

        when(realmResource.users().searchByEmail("test@example.com", true))
                .thenReturn(Collections.singletonList(userRepresentation));

        UserResource userResource = mock(UserResource.class);
        when(realmResource.users().get(userRepresentation.getId())).thenReturn(userResource);

        boolean result = adminService.resetPassword("test@example.com", "newPassword");
        assertTrue(result);
        verify(userResource).resetPassword(any(CredentialRepresentation.class));
    }

    @Test
    void testDeleteUserByEmail() {
        UserRepresentation userRepresentation = new UserRepresentation();
        userRepresentation.setEmail("test@example.com");
        userRepresentation.setId(UUID.randomUUID().toString());

        when(realmResource.users().searchByEmail("test@example.com", true))
                .thenReturn(Collections.singletonList(userRepresentation));

        UserResource userResource = mock(UserResource.class);
        when(realmResource.users().get(userRepresentation.getId())).thenReturn(userResource);

        boolean result = adminService.deleteUserByEmail("test@example.com");
        assertTrue(result);
        verify(realmResource.users()).delete(userRepresentation.getId());
    }

    @Test
    void testDoMigration() {
        RoleResource roleResource = mock(RoleResource.class);
        when(realmResource.roles().get(anyString())).thenReturn(roleResource);

        RoleRepresentation roleRepresentation = new RoleRepresentation();
        when(roleResource.toRepresentation()).thenReturn(roleRepresentation);

        boolean result = adminService.doMigration();
        assertTrue(result);
        verify(roleResource, atLeast(3)).remove();
    }
}