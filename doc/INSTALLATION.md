# Configurer le projet C2S sur un poste de développeur

## Pre-requis

- Installer homebrew
- Installer node
- Installer git
- Intaller yarn
- Installer [openjdk 17](https://formulae.brew.sh/formula/openjdk@17) `brew install openjdk@17`
- Installer maven 3 `brew install maven`

## PGAdmin

- Installer pg server avec homeBrew : `brew install postgresql@15`
- Install PGAdmin
- Lancer le pg server avec homeBrew : `brew services start postgresql@15`
- `brew services info postgresql@15`
- Configurer la connexion au serveur dans PgAdmin avec votre user
- Créez une base nomée `espace_authentifie`

## Back

- Cloner le repo **c2s-back**

- Ajouter l’application.properties :

```bash
spring.datasource.url=jdbc:postgresql://localhost:5432/espace_authentifie?currentSchema=oc
spring.datasource.username=postgres
spring.datasource.password=root

keycloak.baseUrl=http://localhost:8080
keycloak.realm=c2s-realm
keycloak.clientId=c2s-oc
keycloak.bearer-only=true
keycloak.principal-attribute=c2s_user_back
keycloak.principal-attribute-password=admin
keycloak.base.clientId=c2s-backend-oidc
keycloak.base.clientSecret=to-configure
```

- Configurer Intelij

- `mvn clean package`

## Keycloak

- Télécharger le package

- Clone le repo **c2s-theme-keycloak**

- Clone le repertoire du thème dans le dossier thème de votre installation keycloak

- Configurer keycloak

```bash
# Basic settings for running in production. Change accordingly before deploying the server.

# Database
# The database vendor.
db=postgres

# The username of the database user.
# Nom d'utilisateur pour la connexion à la base de données
db-username=user

# The password of the database user.
# Mot de passe pour la connexion à la base de données
db-password=root

# The full database JDBC URL. If not provided, a default URL is set based on the selected database vendor.
# URL de connexion à la b
# The full database JDBC URL. If not provided, a default URL is set based on the selected database vendor.
# Eg: db-url=jdbc:postgresql://localhost:5432/espace_authentifie?keycloak
# In this example, we are utilizing
# 1. PostgreSQL on the localhost at port 5432,
# 2. with the 'espace_connecte' database name
# 3. and 'keycloak' as the schema.
# These parameters are configurable to suit specific requirements.
db-url=jdbc:postgresql://localhost:5432/espace_authentifie?keycloak

# Hostname for the Keycloak server.

hostname-url=http://localhost:8080
hostname-admin-url=http://localhost:8080
http-enabled=true
# Theme
spi-theme-static-max-age=-1
spi-theme-cache-themes=false
spi-theme-cache-templates=false
```
