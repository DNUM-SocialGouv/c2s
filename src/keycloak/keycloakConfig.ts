export const kcConfig = {
    url: "http://localhost:8080", // tu le change par ton vrai serveur keycloak url
    realm: "c2s-realm", // tu le change par le nom de ton realm sur keyloak (on utilise pas le realm master)
    clientId:"c2s-client", // le nom de client qui va utiliser le serveur keycloak ( tu le donne un nom que tu veux )
    onLoad: 'check-sso' // ne touche pas à ça nécessaire pour demander l'authentification à chaque rechargement de page
}