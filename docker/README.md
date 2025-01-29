# Environnement dockerisé de C2s
L'objectif de cette plateforme dockerisée est d'avoir la possibilité de déployer et de tester localement sur un environnement "quasi" ISO Prod.

Quelques avantages de cette approche :
- Avoir la possibilité de lancer la stack de dev en 1 commande, même pour un nouveau arrivant
- Pouvoir lancer des tests d'intégration localement

## Environnement/Setup

### Environnement de développement 

- Docker 
- Linux/Mac OS

Parce que ce projet manipule les volumes docker, il ne fonctionne pas proprement sur une machine windows, même avec **WSL**. 

### Docker compose

Il y a deux fichiers pour docker compose: 
- **docker-compose.yaml** pour faire du développement local avec **yarn** et **nodejs**
- **docker-compose-nginx.yaml** pour tester le déploiement sur un environnement prod (nginx, CEGEDIM)

### Démarrage 

La stack peut être lancée depuis la racine du projet :

1. Démarrage de la stack en mode Dev Local:
```shell
docker compose up -d
```
1. Démarrage de la stack en mode ISO PROD:
```shell
docker compose -f docker-compose-nginx.yaml up -d
```
Tout comme dans l'environnement de PROD, le front est déployé sur nginx. Le fichier de configuration **[docker/front/default.conf](front/default.conf)**, est monté dans un volume au démarrage du conteneur.

De préférence, ce fichier doit être similaire à celui qui est utilisé par Cegedim en PROD.

2. Résultat des builds

```shell
docker images | grep c2s
```

```shell
c2s-back                    eclipse        b24beacb9bd8   3 hours ago    265MB
c2s-front                   latest          aaa2c204d517   6 days ago     56.6MB
```
3. Liste des conteneurs créés
```shell
docker ps --format "table {{.ID}}\t{{.Image}}\t{{.Ports}}\t{{.Names}}"
```
```shell
CONTAINER ID   IMAGE                              PORTS                                          NAMES
bc646f3da370   c2s-front:latest                   0.0.0.0:80->80/tcp                             c2s-front
3a884b6025c6   dpage/pgadmin4:2024-10-19-2        443/tcp, 0.0.0.0:5050->80/tcp                  c2s-pgadmin
b13b704cd63d   quay.io/keycloak/keycloak:24.0.2   0.0.0.0:8080->8080/tcp, 8443/tcp               c2s-keycloak
26ae416c3b94   c2s-back:eclipse                   0.0.0.0:8081->8081/tcp                         c2s-back
f14da016e923   postgres:15                        0.0.0.0:5432->5432/tcp                         c2s-postgres
```
- L'espace Organismes complémentaires : http://localhost/mon-espace/oc
- L'espace modérateur : http://localhost/mon-espace/admin/membres
```editorconfig
utilisateurs: c2s_user_back, c2s_user_oc, c2s_user_caisse, c2s_user_moderateur
password: password
```

4. Arrêt des conteneurs :
```shell
docker compose stop
```

5. Suppression des conteneurs :
```shell
docker compose down
```

## Le Back
Les paramètres par défaut du back se trouvent dans le fichier back/spring-boot-jar-builder/src/main/resources/dev/application.properties.

Ces paramètres peuvent être overridés par ceux du fichier docker/back/application.properties.

```properties
spring.datasource.url=jdbc:postgresql://postgres:5432/oc_espace
spring.datasource.username=postgres
spring.datasource.password=password
# ...
cors.origins=http://localhost, http://localhost:8080
reset.url=http://localhost/
# ...
keycloak.baseUrl=http://localhost:8080
keycloak.realm=c2s-realm
keycloak.clientId=c2s-oc
keycloak.bearer-only=true
keycloak.principal-attribute=c2s_user_back
keycloak.principal-attribute-password=password
```

## Le Front

En mode ISO PROD (docker-compose-nginx.yaml), le front est déployé sur nginx (fichiers statics).

En mode DEV LOCAL, il est déployé sur nodejs avec yarn et vitejs.

## Postgres

Au démarrage, il crée (avec le user _**POSTGRES_USER**_/_**POSTGRES_PASSWORD**_) la base de données oc-espace (ENV POSTGRES_DB), et un schéma keycloak (voir le fichier **_docker/postgres/sql/create_schema.sql_**). 

```yaml
    #...
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: ${POSTGRES_DB_NAME}
      PGDATA: ${POSTGRES_DATA_DIR}
    volumes:
      - "postgres-data:${POSTGRES_DATA_DIR}"
      - ./docker/postgres/sql/create_schema.sql:/docker-entrypoint-initdb.d/create_schema.sql
    #...
```

Quand on arrête ou supprime les conteneurs les données de la base sont sauvegardées dans un volume. Pour nettoyer complètement le volume, il faut lancer la commande suivante qui supprimer les conteneurs et les données :
```shell
docker compose down -v
```

## Keycloak
L'URL de Keycloak http://localhost:8080/

Pour tester un utilisateur. 
```shell
curl \ 
  -d "client_id=c2s-oc" \ 
  -d "username=c2s_user_back" \
  -d "password=xxx-xxx-xxx" \
  -d "grant_type=password" \
  "http://localhost:8080/realms/c2s-realm/protocol/openid-connect/token"  
```

### Thème personalisé

Le thème se trouve dans le repertoire **docker/keycloak/theme** et est monté un volume du conteneur keycloak.

```yaml
    volumes:
      - ...
      - ./docker/keycloak/theme:/opt/keycloak/themes/c2stheme
```

### Import/Export
Une fois qu'on a effectué des changements manuels sur le realm, on peut les exporter localement, pour pouvoir automatiser les imports plus tard.

Export dans docker
```shell
docker exec -it c2s-keycloak /opt/keycloak/bin/kc.sh export --dir /opt/keycloak/data/import --users realm_file --realm c2s-realm
```
Le nom du fichier généré : c2s-realm-realm.json

Import sur le host dans ./import/c2s-realm.json
```shell
docker cp c2s-keycloak:/opt/keycloak/data/import/c2s-realm-realm.json ./import/c2s-realm.json
```

Pour remplacer la config **keycloak** de docker-compose par celle du host, il faut:
1. Exporter la config du host:
```
/opt/keycloak/bin/kc.sh export --dir /home/import --users realm_file --realm c2s-realm
```
-- dir:  prend en parametre un repertoire arbitraire.
2. Copier le fichier généré dans le projet **docker compose**
```
cp /home/import/c2s-realm-realm.json <projet-c2s>/docker/keycloak/realm/c2s-realm.json
```
3. Supprimer et redémarrer les conteneurs
```
docker-compose down -v
docker-compose up -d
```

## Développement local 
L'environnement de développement local (le front ou le back) est actuellement dockerisé, tout changement effectué sur le code de l'application doit être visible directement dans le conteneur docker sans qu'on ait besoin d'un redémarrage.
### Le Front
Pour dockeriser l'environnement de dev du front, on va utiliser les deux fichiers suivants: 
 - front/Dockerfile-dev
 - docker-compose.yaml

Pour lancer l'environnement dockerisé : 
```shell
docker compose up -d
```
Le front monte deux volumes :
```yaml
    volumes:
      - ./front:/usr/app
      - node-modules-data:/usr/app/node_modules
```
- ./**front**: le code source du front
- **node-modules-data**: volume pour les dépendances de node. Le contenu de ce dossier doit être différent de celui du repertoire node_modules du projet front, pour éviter des problèmes de compatibilités de librairies (Linux, MacOS, Windows). Avoir ce volume permet également d'éviter de télécharger les dépendances node à chaque fois qu'on lance yarn ou npm. 


### Le Back
Pour lancer l'environnement dockerisé :
```shell
docker compose up -d
```

#### Configuration
Sur le back on utilise le module **spring-boot-devtools** de Spring pour faire du hot reload.
```xml
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <version>${spring.boot.version}</version>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>
```
On a aussi besoin du plugin **spring-boot-maven** pour pouvoir lancer le projet avec maven.

```xml
    <plugin>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-maven-plugin</artifactId>
        <configuration>
            <skip>false</skip>
        </configuration>
        <executions>
            <execution>
                <goals>
                    <goal>repackage</goal>
                </goals>
            </execution>
        </executions>
    </plugin>
```

Contrairement au front, on utilise pas un Dockerfile sur le back. Le code source java, le fichier de propreties, et les dépendances maven sont montés à travers ces trois volumes:
```yaml
    volumes:
      - ./docker/back/application.properties:/etc/c2s-dev/application.properties
      - ./back:/usr/src/mymaven:rw
      - maven-repo-data:/root/.m2
```
-  ./**docker/back/application.properties**: pour overrider les properties par défaut  
- ./**back**: le code source du back
- **maven-repo-data**: volume pour les dépendances maven. Le contenu de ce dossier doit être different de celui du repertoire **$HOME/.m2** qui est présent sur le host, pour éviter des problèmes de compatibilités de librairies. Avoir ce volume permet également d'eviter de télécharger les dépendances à chaque fois qu'on lance maven.

On lance le projet spring-boot-launcher depuis la racine du projet back avec la commande suivante: 

```shell
  ...
    command: >
      mvn -pl spring-boot-launcher -am spring-boot:run
  ...
```

#### Comment marche spring-boot-devtools ?
**Devtools** surveille le classpath du projet back (les fichiers .class des repertoires /targets ou les ressources). Une fois qu'il a détecté un chagement il redémarre l'application. La premiere partie du travail vient de l'IDE qui doit repercuter les changemnts du code dans le classpath.

Pour plus de details: 
- Voir [documentaion Spring](https://docs.spring.io/spring-boot/reference/using/devtools.html#using.devtools.restart)
- Voir [Discussion Stackoverflow](https://stackoverflow.com/questions/33869606/intellij-15-springboot-devtools-livereload-not-working)

On peut également forcer un hot reload après un changement du code en lançant la commande maven suivante depuis le repertoire racine du projet back. 

```shell
mvn install -DskipTests
```

## TODO: 
Todo, Todo, Todo, ...

### Backup/Restauration de la base de données Postgres

### Versionnage des images front et back

### CI/CD