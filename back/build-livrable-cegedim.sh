#!/bin/bash

# prérequis
source ~/.nvm/nvm.sh
nvm use 20

# Le script prend le numéro de version comme argument
# Exemple d'utilisation du script : ./build-livrable-cegedim.sh 1.3.1

version=$1

echo "Version : $version"
if [ -z "$version" ]
then
    echo "Le numéro de version est attendu comme argument, exemple : 1.2.1" >&2
    exit 1
fi

c2sLivraisonFolder="../c2s-livraison"

echo "Répertoire contenant les livrables générés pour Cegedim : $c2sLivraisonFolder"

# Vérifiez si le dossier existe déjà
if [ ! -d "$c2sLivraisonFolder" ]
then
    # Créez le dossier s'il n'existe pas
    mkdir -p "$c2sLivraisonFolder"
fi

currentC2sLivraisonFolder="$c2sLivraisonFolder/c2s-oc-$version"

echo "Répertoire pour cette version : $currentC2sLivraisonFolder"

if [ ! -d "$currentC2sLivraisonFolder" ]
then
    mkdir -p "$currentC2sLivraisonFolder"
fi

rm -rf "$currentC2sLivraisonFolder/*"

# génération du livrable du backend, le fichier JAR
mvn clean package -Pcegedim
mv "spring-boot-jar-builder/target/c2s-cegedim.jar" "$currentC2sLivraisonFolder/c2s-$version.jar"

# génération du livrable du front
cd ../c2s-front
yarn
yarn build
cd dist
zip -r "../$currentC2sLivraisonFolder/c2s-oc-front-$version.zip" *
cd ../../c2s-livraison

zip -r c2s-oc-$version.zip c2s-oc-$version


#echo $c2sLivraisonFolder
#echo $currentC2sLivraisonFolder

#zip -r $c2sLivraisonFolder/c2s-oc-$version.zip $currentC2sLivraisonFolder/

echo -e "Le livrable a été créé"
