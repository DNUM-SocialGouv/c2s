## Introduction
Le projet C2S à pour objectif de faciliter la visibilité des complémentaires santé.
Il est articuler avec un CMS Drupal qui permets au grand publique de récupérer des informations.
Depuis ce Front Drupal il y a un point d'entrée vers l'espace partenaire : 

- qui permets de gérer les organismes complémentaires et les caisses d'assurance maladie pour un modérateur
- qui permets à un organisme complémentaire de gérer son siège, ses points d'accueil et ses contacts
- qui permets à une caisse de gérer son siège

L'espace partenaire est constitué d'un front React et un Back Java Spring Boot.
Les parties authentifiées de Drupal et de l'espace partenaire sont protégées par Keycloak.

## Détails sur le back
Le projet est géré par Maven.\
Les sous-modules préfixés "c2s-" sont spécifiques au projet.\
Les sous-modules préfixés "dependency-" sont des dépendances à un système extérieur.\
Les sous-modules préfixés "generic-" sont des modules techniques réutilisables dans un autre contexte.\
Les sous-modules préfixés "devtool-" sont des modules utilitaires pour le développement.\
Les sous-modules préfixés "spring-" sont des modules orientés Spring qui permettent de gérer l'exécution du projet ou la construction du livrable.

Voici un descriptif de chacun des modules Maven : 

c2s-job-wrapper : contient les taches asynchrones (job) du projet \
c2s-model : définit le model du projet (entity, dto)\
c2s-repository : contient les classes Repository et un mapper (entity -> Dto)\
c2s-service : contient la couche service \
c2s-web : contient les filtres, controleurs et tout ce qui touche aux sessions et à la configuration web 

dependency-cnam-export : contient les classes nécessaires pour réaliser l'export dédié à la CNAM 

devtool-fake-smtp : wrapper de FakeSMTP pour le développement 

generic-csv-service : module pour la génération de fichiers CSV\
generic-file-service : module qui s'occupe des accès au système de fichier\
generic-json-service : module utilitaire autour de JSON\
generic-keycloak-service : module qui permets de gérer le lien avec Keycloak\
generic-mail-service : wrapper de Javamail \
generic-security-service : contient des méthodes utilitaires pour la sécurité\
generic-sftp-service : n'est plus utilisé dans le projet. Initialement le transfert SFTP vers la CNAM avait été inclus dans l'application

spring-boot-jar-builder : construction du JAR exécutable\
spring-boot-launcher : permets de lancer le projet en mode développement 

## Build de production
Sous Windows pour livrer la version 1.2.3 :
> powershell\
> .\build-livrable-cegedim.ps1 -version 1.2.3

Sous Linux pour livrer la version 4.5.6 : 
> ./build-livrable-cegedim.sh 4.5.6

## En développement
Pour travailler sur le développement du projet, on exécute la classe C2SDevApplication.\
Un répertoire "emails-recus" est automatiquement créé au meme niveau que les sous-modules.\
Il contient au format texte les emails envoyés par l'application.

## Nomenclature 
Dans le projet il y a 3 types d'acteurs : "caisse", "organisme complémentaire", "modérateur".

Au démarrage du projet la base de données a été récupérée telle quelle avec comme conséquences la 
récupération des termes de l'ancienne version de l'application. Les termes "oc" et "lpa" / "palpa" 
étaient utilisés pour respectivement "organisme complémentaire" et "point accueil".
Après avoir recollé les morceaux sur la portée des termes et leur utilisation, les termes 
ont évolué aussi bien en base de données qu'en objet.

Plusieurs noms sont utilisés mais avec cette logique :

D'un point de vue compte utilisateur qui se connecte à l'application, nous avons 3 types :
- ORGANISME_COMPLEMENTAIRE (oc)
- CAISSE
- MODERATEUR

C'est 3 types de comptes sont tous dans la même table : membre.

Un compte oc est relié à une entreprise (organisme complémentaire) qui elle même est reliée 
à des établissements (points d'accueil).

Les caisses ne sont pas encore totalement implémentées dans l'application mais nous allons 
essayer de les faire rentrer dans ce modèle (entreprise, établissement) notamment avec 
le formulaire d'inscription.

Il y a aussi la notion de partenaire dans le code.
Un partenaire, c'est un organisme complémentaire ou une caisse.


## CI/CD
TODO
