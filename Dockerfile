# Utilisez une image Node.js comme base
FROM node:14-alpine

# Téléchargez l'archive Yarn et extrayez-la
RUN apk add --no-cache curl bash \
    && curl -o- -L https://yarnpkg.com/install.sh | bash

# Ajoutez le binaire Yarn au PATH
ENV PATH="/root/.yarn/bin:${PATH}"

# Définissez le répertoire de travail
WORKDIR /home/c2s-user/c2s_oc_front

# Copiez les fichiers du projet dans le conteneur
COPY . .

# Installez les dépendances en utilisant Yarn
RUN yarn install

# Construisez l'application
RUN yarn build

# Commande pour démarrer l'application
CMD ["yarn", "start"]